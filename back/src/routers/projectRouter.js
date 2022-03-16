import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

projectRouter.post("/project/create", login_required, async (req, res, next) => {
    try {
        const { currentUserId } = req;
        const { title, description, from_date, to_date } = req.body;
        const newProject = await projectService.addProject({
            user_id: currentUserId,
            title,
            description,
            from_date,
            to_date,
        });

        if (newProject.errorMessage) {
            throw new Error(newProject.errorMessage);
        }

        return res.status(200).json(newProject);
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

        return res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/projectlist/:user_id", async function (req, res, next) {
    try {
        const { user_id } = req.params;
        const projects = await projectService.getProjectAll({ user_id });

        if (projects.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        return res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

projectRouter.put("/projects/:id", login_required, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { currentUserId } = req;
        const { title, description, from_date, to_date } = req.body;
        const toUpdate = { title, description, from_date, to_date };

        // req.currentUserId의 값과 project.user_id의 값을 비교해 관리자 인증
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

export { projectRouter };
