import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class awardAuthService {
    static async addAward({ user_id, title, description }) {
        const id = uuidv4()
        const newAward = { id, user_id, title, description }

        const createdNewAward = await Award.create({ newAward })
        createdNewAward.errorMessage = null;

        return createdNewAward;
    }

    static async getAward({ awardId }) {
        const findAward = await Award.findById({ awardId })
        if (!findAward) {
            const errorMessage =
                "해당 수상 이력이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return findAward;
    }

    static async getAwards({ user_id }) {
        const awards = await Award.findByUserId({ user_id });
        if (!awards) {
            const errorMessage =
                "해당 유저의 수상 이력이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return awards;
    }

    static async setAward({ awardId, title, description }) {
        const updatedAward = await Award.update({ awardId, title, description });

        if (!updatedAward) {
            const errorMessage =
                "수상 이력 수정에 실패하였습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return updatedAward;
    }
}

export { awardAuthService };