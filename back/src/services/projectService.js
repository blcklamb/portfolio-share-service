import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
    static async addProject({ user_id, title, description, from_date, to_date }) {
        // const project = await Project.exists({ title });
        // if (project) {
        //     const errorMessage = "이 제목은 현재 사용중입니다. 다른 제목을 입력해 주세요.";
        //     return { errorMessage };
        // }
        const id = uuidv4();
        const newProject = { id, user_id, title, description, from_date, to_date };

        const createdNewProject = await Project.create({ newProject });
        createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

        return createdNewProject;
    }

    static async getProject({ id }) {
        const project = await Project.findById({ id });

        if (!project) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        return project;
    }

    // static async getUsers() {
    //     const users = await User.findAll();
    //     return users;
    // }

    static async updateProject({ id }, toUpdate) {
        const project = await Project.findById({ id });

        if (!project) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const updateProject = await Project.update({ id }, toUpdate);

        return updateProject;
    }
}

export { projectService };
