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
}

export { awardAuthService };