import is from "@sindresorhus/is";
import bcrypt from "bcrypt";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { uploadImage } from "../middlewares/uploadImage";
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
        // 전체 사용자 목록을 얻음
        const users = await userAuthService.getUsers();
        return res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get("/user/current", login_required, async function (req, res, next) {
    try {
        // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
        const user_id = req.currentUserId;
        const currentUserInfo = await userAuthService.getUserInfo({ user_id });

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
        const currentUserInfo = await userAuthService.getUserInfo({ user_id });
        console.log(currentUserInfo);
        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const name = req.body.name ?? null;
        const password = req.body.password ?? null;
        const description = req.body.description ?? null;
        const { file } = req;

        const toUpdate = {
            name, //
            password,
            description,
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

userAuthRouter.get("/users/:id", login_required, async function (req, res, next) {
    try {
        const user_id = req.params.id;
        const currentUserInfo = await userAuthService.getUserInfo({ user_id });

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
        const user = await userAuthService.getUserByEmail({ email });
        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }
        if (name !== user.name) {
            // 이 부분 저보다 개선된 에러메시지를 써주실 수 있으면 바꿔주세요 ㅠ
            throw new Error("사용자의 이름과 이메일 정보가 대응되지 않습니다.");
        }

        const newPassword = generatePassword();

        await userAuthService.setPassword(
            { user },
            {
                password: await bcrypt.hash(newPassword, 10),
            },
        );

        await sendMail(
            email, //
            "임시 비밀번호가 발급되었습니다",
            `회원님의 임시 비밀번호는 [${newPassword}] 입니다.\n로그인 후 비밀번호를 변경해주세요.`,
        );
        return res.json({ result: "success" });
    } catch (err) {
        next(err);
    }
});

userAuthRouter.post("/change-password", login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const user = await userAuthService.getUserInfo({ user_id });
        const { oldpassword, password, passwordConfirm } = req.body;
        console.log(user);
        if (!(await bcrypt.compare(oldpassword, user.password))) {
            throw new Error("기존 비밀번호가 틀렸습니다.");
        }
        if (password !== passwordConfirm) {
            throw new Error("비밀번호 확인이 일치하지 않습니다.");
        }

        await userAuthService.setPassword({ user_id, password: await bcrypt.hash(password, 10) });
        return res.status(201).json({ result: "success" });
    } catch (err) {
        next(err);
    }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
    return res.status(200).send(`안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`);
});

export { userAuthRouter };
