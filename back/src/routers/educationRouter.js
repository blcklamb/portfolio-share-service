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

      // 빈 데이터가 있는 경우
      if (!user_id || !school || !major || !position) {
        const errorMessage = '모든 데이터를 정확히 입력해주세요.';
        throw new Error(errorMessage);
      }

      // 사용자가 존재하지 않는 경우
      const foundUser = await userAuthService.getUserInfo({ user_id });
      if(foundUser.errorMessage) {
        throw new Error(foundUser.errorMessage);
      }

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

educationRouter.get("/educations/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // 빈 데이터가 있는 경우
    if (!id) {
      const errorMessage = '모든 데이터를 정확히 입력해주세요.';
      throw new Error(errorMessage);
    }

    // 학력 정보 가져오기
    const foundEducation = await educationService.getEducationById({ id });

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

educationRouter.get("/educationlist/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    
    // 빈 데이터가 있는 경우
    if (!user_id) {
      const errorMessage = '모든 데이터를 정확히 입력해주세요.';
      throw new Error(errorMessage);
    }

    // 학력 가져오기
    const foundEducations = await educationService.getEducationsByUserId({
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
  "/educations/:id",
  login_required,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { school, major, position } = req.body;

      // 빈 데이터가 있는 경우
      if (!id || !school || !major || !position) {
        const errorMessage = '모든 데이터를 정확히 입력해주세요.';
        throw new Error(errorMessage);
      }

      // 학력 수정
      const updatedEducation = await educationService.setEducationById({
        id,
        school,
        major,
        position,
      });

      // 학력 수정 실패한 경우
      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
