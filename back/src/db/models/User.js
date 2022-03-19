import { UserModel } from "../schemas/User";

class User {
    static async create({ newUser }) {
        const createdNewUser = await UserModel.create(newUser);
        return createdNewUser;
    }

    static async findOne({ email }) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    static async findById({ user_id }) {
        const user = await UserModel.findOne({ id: user_id });
        return user;
    }

    static async findAll({ perPage, page }) {
        const users = await UserModel.find({})
            .sort({ created: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage);
        return users;
    }

    static async update({ user_id, fieldToUpdate, newValue }) {
        const filter = { id: user_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
        return updatedUser;
    }

    static async resetPassword({ id, password }) {
        const updatedPassword = await UserModel.findOneAndUpdate({ id, password });
        return updatedPassword;
    }

    static async countDocuments() {
        const usersCount = await UserModel.countDocuments({});
        return usersCount;
    }
}

export { User };
