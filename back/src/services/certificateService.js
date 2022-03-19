import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class certificateService {
    static async addCertificate({ user_id, title, description, when_date }) {
        // 같은 제목의 certificate가 있으면 errorMessage 생성
        // const certificate = await Certificate.exists({ title });
        // if (certificate) {
        //     const errorMessage = "이 제목은 현재 사용중입니다. 다른 제목을 입력해 주세요.";
        //     return { errorMessage };
        // }

        const id = uuidv4();
        const newCertificate = { id, user_id, title, description, when_date };

        const createdNewCertificate = await Certificate.create({ newCertificate });
        createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

        return createdNewCertificate;
    }

    static async getCertificate({ id }) {
        const certificate = await Certificate.findById({ id });

        if (!certificate) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        return certificate;
    }

    static async getCertificateAll({ user_id }) {
        const certificates = await Certificate.findAll({ user_id });
        return certificates;
    }

    static async updateCertificate({ id }, { toUpdate }) {
        const certificate = await this.getCertificate({ id });

        if (!certificate) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        console.log({ id }, { toUpdate });
        const updateCertificate = await Certificate.update({ id }, { toUpdate });

        return updateCertificate;
    }

    static async deleteCertificate({ id }) {
        const certificate = await this.getCertificate({ id });

        if (!certificate) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const updateCertificate = await Certificate.delete({ id });

        return updateCertificate;
    }
}

export { certificateService };
