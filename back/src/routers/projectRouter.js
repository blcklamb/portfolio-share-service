import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { getUserToken } from "../middlewares/jwt";
import { projectService } from "../services/projectService";

const projectRouter = Router();

projectRouter.post("/project/create", async (req, res, next) => {
    try {
        const { user_id } = getUserToken(req.headers.authorization);
        const { title, description, from_date, to_date } = req.body;
        const newProject = await projectService.addProject({
            user_id,
            title,
            description,
            from_date,
            to_date,
        });
        if (newProject.errorMessage) {
            throw new Error(newProject.errorMessage);
        }
        return res.status(200).json({ user_id, title, description, from_date, to_date });
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/projects/:id", async function (req, res, next) {
    try {
        const { id } = req.params;
        const project = await projectService.getProject({ id });
        if (project.errorMessage) {
            throw new Error(project.errorMessage);
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

// userAuthRouter.get("/userlist", login_required, async function (req, res, next) {
//     try {
//         // 전체 사용자 목록을 얻음
//         const users = await userAuthService.getUsers();
//         res.status(200).send(users);
//     } catch (error) {
//         next(error);
//     }
// });

// userAuthRouter.get("/user/current", login_required, async function (req, res, next) {
//     try {
//         // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
//         const user_id = req.currentUserId;
//         const currentUserInfo = await userAuthService.getUserInfo({
//             user_id,
//         });

//         if (currentUserInfo.errorMessage) {
//             throw new Error(currentUserInfo.errorMessage);
//         }

//         res.status(200).send(currentUserInfo);
//     } catch (error) {
//         next(error);
//     }
// });

projectRouter.put("/projects/:id", login_required, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, from_date, to_date } = req.body;
        const { currentUserId } = req;
        const toUpdate = { title, description, from_date, to_date };

        const project = await projectService.getProject({ id });
        if (String(currentUserId) !== String(project.user_id)) {
            throw new Error("접근할 권한이 없습니다.");
        }
        const updatedProject = await projectService.updateProject({ id }, toUpdate);
        if (updatedProject.errorMessage) {
            throw new Error(updatedProject.errorMessage);
        }

        return res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
});

// userAuthRouter.get("/users/:id", login_required, async function (req, res, next) {
//     try {
//         const user_id = req.params.id;
//         const currentUserInfo = await userAuthService.getUserInfo({ user_id });

//         if (currentUserInfo.errorMessage) {
//             throw new Error(currentUserInfo.errorMessage);
//         }

//         res.status(200).send(currentUserInfo);
//     } catch (error) {
//         next(error);
//     }
// });

// // jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
// userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
//     res.status(200).send(`안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`);
// });

export { projectRouter };
