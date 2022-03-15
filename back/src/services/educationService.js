import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class educationService {
  static async addEducation({ user_id, school, major, position }) {
    // 중복 확인
    const education = await Education.findById({ user_id });
    if (education.school === school && education.major === major) {
      const errorMessage = "이미 입력한 학력입니다.";
      return { errorMessage };
    }

    const newEducation = { user_id, school, major, position };

    // db에 저장
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }
}

export { educationService };
