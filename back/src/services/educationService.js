import { Education } from "../db";
import { v4 as uuidv4 } from 'uuid';

class educationService {
  static async addEducation({ user_id, school, major, position }) {
    // 중복 확인
    const preEducation = await Education.findByUserId({ user_id });
    for(let i = 0; i < preEducation.length; i++) {
      if (preEducation[i]?.school === school && preEducation[i]?.major === major) {
        const errorMessage = "이미 입력한 학력입니다.";
        return { errorMessage };
      }
    }

    // db에 저장
    const newEducation = { id: uuidv4(), user_id, school, major, position };

    const createdNewEducation = await Education.create(newEducation);
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }

  static async getEducationById({ id }) {
    const foundEducation = await Education.findById({ id });
    
    if(!foundEducation.length) {
      const errorMessage = '존재하지 않는 학력입니다.';
      return { errorMessage };
    }

    foundEducation.errorMessage = null;

    return foundEducation;
  }

  static async getEducationsByUserId({ user_id }) {
    const foundEducations = await Education.findByUserId({ user_id });

    if(!foundEducations.length) {
      const errorMessage = '사용자의 학력이 존재하지 않습니다';
      return { errorMessage };
    }

    foundEducations.errorMessage = null;

    return foundEducations;
  }

  static async setEducationById({ id, school, major, position }) {
    const foundEducation = await this.getEducationById({ id });
    if(foundEducation.errorMessage) {
      return foundEducation;
    }

    const updatedEducation = await Education.update({ id, school, major, position });

    if(!updatedEducation) {
      const errorMessage = '학력 수정에 실패했습니다.';
      return { errorMessage };
    }

    updatedEducation.errorMessage = null;

    return updatedEducation;
  }

  static async deleteEducation({ id }) {
    const foundEducation = await this.getEducationById({ id });
    if(foundEducation.errorMessage) {
      return foundEducation;
    }

    const deletedEducation = await Education.delete({ id });
    
    if(deletedEducation.deletedCount === 0) {
      const errorMessage = '학력 삭제에 실패했습니다';
      return { errorMessage };
    }

    deletedEducation.errorMessage = null;

    return deletedEducation;
  }
}

export { educationService };
