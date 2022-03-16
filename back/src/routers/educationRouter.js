import { Router } from "express";
import { educationService } from "../services/educationService";
const educationRouter = Router();

educationRouter.post("/education/create", async (req, res, next) => {
  try {
    const { user_id, school, major, position } = req.body;

    const newEducation = await educationService.addEducation({
      user_id,
      school,
      major,
      position,
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

export { educationRouter };
