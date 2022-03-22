import { UserModel } from "../schemas/User";

class User {
    static create({ newUser }) {
        return UserModel.create(newUser);
    }

    static findOne({ email }) {
        return UserModel.findOne({ email });
    }

    static findById({ user_id }) {
        return UserModel.findOne({ id: user_id });
    }

    static findAll({ perPage, page }) {
        return UserModel.find({})
            .sort({ created: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage);
    }

    static async update({ user_id, fieldToUpdate, newValue }) {
        const filter = { id: user_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
        return updatedUser;
    }

    static async updateByEmail(email, { name, image }) {
        const filter = { email: email };
        const update = { name: name, image: image };
        const option = { returnOriginal: false };

        const upsertedUser = await UserModel.findOneAndUpdate(filter, update, option);
        return upsertedUser;
    }

    static findOneAndUpdate({ user_id }, { password }) {
        return UserModel.findOneAndUpdate({ id: user_id }, { password });
    }

    static countDocuments() {
        return UserModel.countDocuments({});
    }

}

export { User };
