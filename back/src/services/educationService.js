import { Education } from "../db";
import { v4 as uuidv4 } from 'uuid';

class educationService {
  static async addEducation({ user_id, school, major, position }) {
    // 학력 조회 및 중복 확인
    const preEducation = await this.getEducations({ user_id });

    for(let i = 0; i < preEducation.length; i++) {
      if (preEducation[i]?.school === school && preEducation[i]?.major === major && preEducation[i]?.position === position) {
        const errorMessage = "이미 입력한 학력입니다.";
        return { errorMessage };
      }
    }

    // 새 학력
    const newEducation = { id: uuidv4(), user_id, school, major, position };

    // 학력 추가
    const createdNewEducation = await Education.create(newEducation);
    
    // 학력 추가에 성공한 경우 에러메세지 제거
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }

  static async getEducation({ id }) {
    // 학력 조회
    const foundEducation = await Education.findById({ id });
    
    // 학력 조회에 실패한 경우 에러메세지
    if(!foundEducation) {
      const errorMessage = '존재하지 않는 학력입니다.';
      return { errorMessage };
    }

    // 학력 조회에 성공한 경우 에러메세지 제거
    foundEducation.errorMessage = null;

    return foundEducation;
  }

  static async getEducations({ user_id }) {
    // 학력 조회
    const foundEducations = await Education.findByUserId({ user_id });

    return foundEducations;
  }

  static async setEducation({ id, school, major, position }) {
    // 기존 학력 조회
    const foundEducation = await this.getEducation({ id });

    // 존재하지 않는 학력인 경우
    if(foundEducation.errorMessage) {
      return foundEducation;
    }
    // 변경사항이 없는 경우
    if(foundEducation.school === school && foundEducation.major === major && foundEducation.position === position) {
      foundEducation.errorMessage = "학력에 변경 사항이 없습니다.";
      return foundEducation;
    }

    // 학력 수정
    const updatedEducation = await Education.update({ id, school, major, position });

    // 학력 수정에 실패한 경우 에러메세지
    if(!updatedEducation) {
      const errorMessage = '학력 수정에 실패했습니다.';
      return { errorMessage };
    }

    // 학력 수정에 성공한 경우 에러메세지 제거
    updatedEducation.errorMessage = null;

    return updatedEducation;
  }

  static async deleteEducation({ id }) {
    // 학력 찾기
    const foundEducation = await this.getEducation({ id });

    // 학력을 못 찾은 경우
    if(foundEducation.errorMessage) {
      return foundEducation;
    }

    // 학력 삭제
    const deletedEducation = await Education.delete({ id });
    
    // 학력 삭제에 실패한 경우 에러메세지
    if(deletedEducation.deletedCount === 0) {
      const errorMessage = '학력 삭제에 실패했습니다';
      return { errorMessage };
    }

    // 학력 삭제에 성공한 경우 에러메세지 제거
    deletedEducation.errorMessage = null;

    return deletedEducation;
  }
}

export { educationService };
