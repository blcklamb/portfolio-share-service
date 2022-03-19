import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";
import { userAuthService } from "../services/userService";
const educationRouter = Router();

educationRouter.post(
  "/education/create",
  login_required,
  async (req, res, next) => {
    try {
      // 받은 데이터
      const { user_id, school, major, position } = req.body;

      // 새 학력 저장
      const newEducation = await educationService.addEducation({
        user_id,
        school,
        major,
        position,
      });

      // 학력 저장 실패한 경우
      if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
      }

      // 저장한 새 학력 반환
      res.status(200).json(newEducation);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.get("/educations/:id?", async (req, res, next) => {
  try {
    // 받은 데이터
    const { id } = req.params;

    // 학력 정보 가져오기
    const foundEducation = await educationService.getEducation({ id });

    // 학력 조회 실패한 경우
    if (foundEducation.errorMessage) {
      throw new Error(foundEducation.errorMessage);
    }

    // 학력 정보 반환
    res.status(200).json(foundEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educationlist/:user_id?", async (req, res, next) => {
  try {
    // 받은 데이터
    const { user_id } = req.params;

    // 학력 가져오기
    const foundEducations = await educationService.getEducations({
      user_id,
    });

    // 학력 조회 실패한 경우
    if (foundEducations.errorMessage) {
      throw new Error(foundEducations.errorMessage);
    }

    // 학력 정보 반환
    res.status(200).json(foundEducations);
  } catch (error) {
    next(error);
  }
});

educationRouter.put(
  "/educations/:id?",
  login_required,
  async (req, res, next) => {
    try {
      // 받은 데이터
      const { id } = req.params;
      const { school, major, position } = req.body;

      // 학력 수정
      const updatedEducation = await educationService.setEducation({
        id,
        school,
        major,
        position,
      });

      // 학력 수정 실패한 경우
      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      // 수정된 학력 정보 반환
      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);


educationRouter.delete(
  "/educations/:id?", 
  login_required,
  async (req, res, next) => {
    try {
      // 받은 데이터
      const { id } = req.params;

      // 학력 삭제
      const deletedEducation = await educationService.deleteEducation({ id });

      // 학력 삭제에 실패한 경우
      if(deletedEducation.errorMessage) {
        throw new Error(deletedEducation.errorMessage);
      }

      // 학력 삭제에 성공한 경우
      const successMessage = `총 ${deletedEducation.deletedCount}개의 메세지를 삭제하였습니다.`;

      res.status(200).json(successMessage);
    } catch (error) { 
      next(error);
    }
  } 
);


export { educationRouter };
