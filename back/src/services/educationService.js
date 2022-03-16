import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class educationService {
  static async addEducation({ user_id, school, major, position }) {
    // 중복 확인
    const education = await Education.findByUserId({ user_id });
    if (education?.school === school && education?.major === major) {
      const errorMessage = "이미 입력한 학력입니다.";
      return { errorMessage };
    }

    // db에 저장
    const newEducation = { user_id, school, major, position };

    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }

  static async findEducationById({ id }) {
    const foundEducation = await Education.findById({ id });
    
    if(!foundEducation.length) {
      const errorMessage = '존재하지 않는 학력입니다.';
      return { errorMessage };
    }

    foundEducation.errorMessage = null;

    return foundEducation;
  }

  static async findEducationsByUserId({ user_id }) {
    const foundEducations = await Education.findByUserId({ user_id });

    if(!foundEducations.length) {
      const errorMessage = '사용자의 학력이 존재하지 않습니다';
      return { errorMessage };
    }

    foundEducations.errorMessage = null;

    return foundEducations;
  }
}

export { educationService };
