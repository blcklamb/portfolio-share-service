import is from "@sindresorhus/is";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import { Router } from "express";
import { uploadImage } from "../middlewares/uploadImage";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

import generatePassword from "../middlewares/generatePassword";
import sendMail from "../middlewares/sendMail";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", uploadImage.single("image"), async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }
        // req (request) 에서 데이터 가져오기
        const { name, email, password, description } = req.body;
        const { file } = req;

        // 위 데이터를 유저 db에 추가하기
        const newUser = await userAuthService.addUser({
            name,
            email,
            password,
            description,
            image: !file ? undefined : file.location,
        });
        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }

        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const email = req.body.email;
        const password = req.body.password;

        // 위 데이터를 이용하여 유저 db에서 유저 찾기
        const user = await userAuthService.getUser({ email, password });
        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }

        return res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get("/userlist", login_required, async function (req, res, next) {
    try {
        /* Pagination */
        const perPage = Number(req.query.perPage || 12);
        const page = Number(req.query.page || 1);

        const [usersCount, users] = await Promise.all([
            // 전체 사용자 수를 얻음
            userAuthService.getUsersCount(),
            // 전체 사용자 목록을 얻음
            userAuthService.getUsers({ perPage, page }),
        ]);

        return res.status(200).json({ users, page, perPage, usersCount });
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get("/user/current", login_required, async function (req, res, next) {
    try {
        // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
        const user_id = req.currentUserId;

        const currentUserInfo = await userAuthService.getUserById({ user_id });
        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        return res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.put("/user/current", login_required, uploadImage.single("image"), async function (req, res, next) {
    try {
        // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
        const user_id = req.currentUserId;
        const currentUserInfo = await userAuthService.getUserById({ user_id });
        // req.body에서 업데이트할 사용자 정보를 받아옴. req.file은 uploadImage middleware에서 정의.
        const name = req.body.name ?? null;
        const password = req.body.password ?? null;
        const description = req.body.description ?? null;
        const { file } = req;
        const toUpdate = {
            name, //
            password,
            description,
            // req.file이 없을 시 즉, 사진이 변경되지 않았을 시 기존의 사진을 사용. 사진 삭제 기능은 추가 개발 예정.
            image: !file ? currentUserInfo.image : file.location,
        };

        // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedUser = await userAuthService.setUser({ user_id, toUpdate });
        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get("/users/:id", async function (req, res, next) {
    try {
        const { id } = req.params;

        const currentUserInfo = await userAuthService.getUserById({ user_id: id });
        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        return res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.post("/reset-password", async (req, res, next) => {
    try {
        const { name, email } = req.body;
        // name은 중복의 여지가 있기 때문에, email로 유저 정보를 받아온 뒤 name으로 재확인
        const user = await userAuthService.getUserByEmail({ email });
        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }
        if (name !== user.name) {
            // 이 부분 저보다 개선된 에러메시지를 써주실 수 있으면 바꿔주세요 ㅠ
            throw new Error("사용자의 이름과 이메일 정보가 대응되지 않습니다.");
        }

        const newPassword = generatePassword(); // 8자리 숫자 랜덤 비밀번호 생성
        await userAuthService.setPassword(
            { user_id: user.id }, //
            { password: await bcrypt.hash(newPassword, 10) },
        );

        await sendMail(
            email, // sendMail(to, subject, text)
            "[Portfolio Share Service] 임시 비밀번호가 발급되었습니다",
            `회원님의 임시 비밀번호는 [${newPassword}] 입니다.\n로그인 후 비밀번호를 변경해주세요.`,
        );

        return res.json({ result: "success" });
    } catch (error) {
        next(error);
    }
});

userAuthRouter.post("/change-password", login_required, async (req, res, next) => {
    try {
        // req.headers의 Authorization 토큰에서 받아온 currentUserId 값을 user_id로 정의
        // req.currentUserId는 login-required middleware에서 정의하고 있음
        const user_id = req.currentUserId;
        // user_id를 통해 받아온 사용자 정보를 user에 정의, getUserById UserModel.findOne({ user_id })
        const user = await userAuthService.getUserById({ user_id });
        const { oldpassword, password, passwordConfirm } = req.body;

        if (!(await bcrypt.compare(oldpassword, user.password))) {
            throw new Error("기존 비밀번호가 틀렸습니다.");
        }
        if (password !== passwordConfirm) {
            throw new Error("비밀번호 확인이 일치하지 않습니다.");
        }

        await userAuthService.setPassword({ user_id }, { password: await bcrypt.hash(password, 10) });

        return res.status(201).json({ result: "success" });
    } catch (err) {
        next(err);
    }
});

import { UserModel } from "../db/schemas/User";
userAuthRouter.post("/api/users/:id", login_required, async (req, res, next) => {
    // 좋아요를 누르는 user
    const user_id = req.currentUserId;
    // 좋아요를 받는 project
    const { id } = req.params;

    // user_id로 불러온 유저 데이터의 id를 사용해 나름(?) 인증 고도화. 필요 없으면 삭제하겠음.
    const user = await userAuthService.getUserById({ user_id });
    if (!user) {
        return res.sendStatus(404);
    }

    // UserModel의 likes 목록에 현재 로그인 되어있는 유저의 id가 있는 정보만 likedUser에 정의.
    // likedUser의 length가  0이면 likes 배열에 현재 로그인 되어있는 유저의 id를 추가함. 반대도 동작.
    const likedUser = await UserModel.find({ likes: { $in: [user.id] } });
    if (likedUser.length === 0) {
        await UserModel.findOneAndUpdate({ user_id: id }, { $push: { likes: user.id } }, { new: true });
        console.log("Like");
    } else {
        await UserModel.findOneAndUpdate({ user_id: id }, { $pull: { likes: user.id } }, { new: true });
        console.log("Unlike");
    }

    return res.sendStatus(200);
});

userAuthRouter.get("/login/github", async (req, res) => {
    const base = "https://github.com/login/oauth/authorize";
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_ID,
        scope: "read:user",
    }).toString();
    const url = `${base}?${params}`;
    return res.redirect(url);
});

userAuthRouter.get("/login/github/callback", async (req, res) => {
    // GitHub access_token 요청
    const base = "https://github.com/login/oauth/access_token";
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: req.query.code,
    }).toString();
    const url = `${base}?${params}`;
    const token = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    }).then((res) => res.json());

    // 만약 access_token이 정상적으로 발급 되었다면, GitHub API 서버에서 data를 받아옴
    // Cannot access 'token' before initialization 에러 떄문에 불필요해도 따로 정의함
    const { access_token } = token;
    if (access_token) {
        const api = "https://api.github.com";
        const data = await fetch(`${api}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        }).then((res) => res.json());

        let user = await userAuthService.getUserByEmail({ email: data.email });
        // getUserByEmail은 해당 이메일의 가입 내역이 없을떄 만 errorMessage를 반환함
        if (user.errorMessage) {
            user = await userAuthService.addSocialUser({
                name: data.name,
                email: data.email,
                description: data.bio,
                image: data.avatar_url,
            });
        }

        const { id, email, name, description, image } = user;
        return res.status(200).json({
            token: jwt.sign({ user_id: user.id }, process.env.JWT_SECRET_KEY),
            id,
            email,
            name,
            description,
            image,
        });
    } else {
        return res.redirect("/login");
    }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, (req, res) => {
    return res.status(200).send(`안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`);
});

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

userAuthRouter.post("/login/google", async(req, res, next) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
        });

        const { name, email, picture } = ticket.getPayload();    

        const user = await userAuthService.socialLogin({ 
            email, name, image: picture
        });

        console.log(user);
        res.status(201).json(user);
    } catch(error) {
        next(error);
    }
})

export { userAuthRouter };
