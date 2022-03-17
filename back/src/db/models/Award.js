import { AwardModel } from "../schemas/award";

class Award {
    static async create({ newAward }) {
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }

    static async findById({ awardId }) {
        const award = await AwardModel.findOne({ id: awardId });
        return award;
    }

    static async findByUserId({ user_id }) {
        const awards = await AwardModel.find({ user_id });
        return awards;
    }

    static async update({ awardId, title, description }) {
        const option = { returnOriginal: false }

        const updatedAward = await AwardModel.findOneAndUpdate(
            { id: awardId },
            { title, description },
            option
        )
        return updatedAward;
    }
}

export { Award };