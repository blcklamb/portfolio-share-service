import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userAuthService {
    static async addUser({ name, email, password, description, image }) {
        // 이메일 중복 확인
        const user = await User.findOne({ email });
        if (user) {
            const errorMessage = "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
            return { errorMessage };
        }

        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(password, 10);

        // id 는 유니크 값 부여
        const id = uuidv4();
        const newUser = {
            id,
            name,
            email,
            password: hashedPassword,
            description,
            image,
            socialLogin: false,
        };

        // db에 저장
        const createdNewUser = await User.create({ newUser });

        return createdNewUser;
    }

    static async getUser({ email, password }) {
        // 이메일 db에 존재 여부 확인
        const user = await User.findOne({ email });
        if (!user) {
            const errorMessage = "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 비밀번호 일치 여부 확인
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            const errorMessage = "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 로그인 성공 -> JWT 웹 토큰 생성
        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET_KEY);

        // 반환할 loginuser 객체를 위한 변수 설정
        const { id, name, description, image } = user;

        const loginUser = {
            token,
            id,
            email,
            name,
            description,
            image,
            errorMessage: null,
        };

        return loginUser;
    }

    static async getUsers({ perPage, page }) {
        const users = await User.findAll({ perPage, page });
        return users;
    }

    static async getUsersCount() {
        const usersCount = await User.countDocuments({});
        return usersCount;
    }

    static async setUser({ user_id, toUpdate }) {
        // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
        let user = await User.findById({ user_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.name) {
            const fieldToUpdate = "name";
            const newValue = toUpdate.name;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }
        if (toUpdate.email) {
            const fieldToUpdate = "email";
            const newValue = toUpdate.email;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }
        if (toUpdate.password) {
            const fieldToUpdate = "password";
            const newValue = toUpdate.password;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }
        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }
        if (toUpdate.image) {
            const fieldToUpdate = "image";
            const newValue = toUpdate.image;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }
        if (toUpdate.likes) {
            const fieldToUpdate = "likes";
            const newValue = toUpdate.likes;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }

        return user;
    }
    
    static async socialLogin({ email, name, image }) {
        // 기존 회원가입 정보 확인
        const preData = await this.getUserByEmail({ email });

        // 새로운 사용자인 경우
        if(preData.errorMessage) {
            const newUser = { id: uuidv4(), name, email, image };
            const createdUser = await User.create({ newUser });
            return createdUser;
        }

        // 기존에 저장된 사용자인 경우
        const updatedUser = await User.updateByEmail(email, { name, image });
        return updatedUser;    
    }

    static async getUserById({ user_id }) {
        // getUser는 로그인 시, getUserInfo는 유저 정보 조희시
        const user = await User.findById({ user_id });
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            const errorMessage = `해당 유저는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.`;
            return { errorMessage };
        }
        return user;
    }

    static async getUserByEmail({ email }) {
        // 이메일 중복 확인
        const user = await User.findOne({ email });
        if (!user) {
            const errorMessage = "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return user;
    }

    static setPassword({ user_id }, { password }) {
        // password 이외 데이터 변경의 경우 setUser로 처리
        return User.findOneAndUpdate({ user_id }, { password });
    }

    static async addSocialUser({ name, email, description, image }) {
        // id 는 유니크 값 부여
        const id = uuidv4();
        const newUser = {
            id,
            name,
            email,
            description,
            image,
            socialLogin: true,
        };

        // db에 저장
        const createdNewUser = await User.create({ newUser });

        return createdNewUser;
    }
}

export { userAuthService };
