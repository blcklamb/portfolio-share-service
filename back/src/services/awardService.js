import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardAuthService {
    static async addAward({ user_id, title, description }) {
        // 중복 확인하기
        const awardlist = await Award.findByUserId({ user_id });

        // db에 저장된 수상 이력과 중복될 경우 에러메세지 반환
        for (let i = 0; i < awardlist.length; i++) {
            if (awardlist[i].title === title && awardlist[i].description === description) {
                const errorMessage = "이미 입력된 수상 이력입니다.";
                return {errorMessage}
            }
        }

        // id 생성하고 생성한 award db에 저장
        const id = uuidv4()
        const newAward = { id, user_id, title, description }

        const createdNewAward = await Award.create({ newAward })
        createdNewAward.errorMessage = null;

        // 결과 반환
        return createdNewAward;
    }

    static async getAward({ awardId }) {
        // id로 수상 이력 조회
        const findAward = await Award.findById({ awardId })

        // 수상 이력을 찾지 못했을 경우 에러메세지
        if (!findAward) {
            const errorMessage =
                "해당 수상 이력이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 결과 반환
        return findAward;
    }

    static async getAwards({ user_id }) {
        // user id로 유저의 수상 이력 조회
        const awards = await Award.findByUserId({ user_id });

        // 수상 이력을 찾지 못했을 경우 에러메세지
        if (!awards) {
            const errorMessage =
                "해당 유저의 수상 이력이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 결과 반환
        return awards;
    }

    static async setAward({ awardId, title, description }) {
        // 수상 이력 중복 확인하기
        const findAward = await this.getAward({ awardId });
        const user_id = findAward.user_id;
        const awardlist = await this.getAwards({ user_id });

        // db에 저장된 수상 이력과 중복될 경우 에러메세지 반환
        for (let i = 0; i < awardlist.length; i++) {
            if (awardlist[i].title == title && awardlist[i].description == description) {
                const errorMessage = "이미 입력된 수상 이력입니다.";
                return { errorMessage };
            }
        }

        // db에 수정된 내용 저장하기
        const updatedAward = await Award.update({ awardId, title, description });

        // 수상 이력 수정에 실패했을 경우 에러메세지
        if (!updatedAward) {
            const errorMessage =
                "수상 이력 수정에 실패하였습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 결과 반환
        return updatedAward;
    }

    static async deleteAward({ awardId }) {
        // 수상 이력 삭제
        const deletedAward = await Award.delete({ awardId });

        // 삭제된 수상 이력의 개수가 0인 경우 에러메세지
        if (deletedAward.deletedCount == 0) {
            const errorMessage =
                "수상 이력 삭제에 실패하였습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage }
        }

        // 결과 반환
        return deletedAward;
    }

}

export { awardAuthService };