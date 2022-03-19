import { ProjectModel } from "../schemas/Project";

class Project {
    static async create({ newProject }) {
        const createdProject = await ProjectModel.create(newProject);
        return createdProject;
    }

    static async findById({ id }) {
        const project = await ProjectModel.findOne({ id });
        return project;
    }

    static async findAll({ user_id }) {
        const projects = await ProjectModel.find({ user_id });
        return projects;
    }

    static async update({ id }, { toUpdate }) {
        const updatedProject = await ProjectModel.findOneAndUpdate({ id }, toUpdate, { new: true });
        return updatedProject;
    }

    static async delete({ id }) {
        const updatedProject = await ProjectModel.findOneAndDelete({ id });
        return updatedProject;
    }
}

export { Project };
