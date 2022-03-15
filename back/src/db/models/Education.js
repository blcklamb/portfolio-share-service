import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById({ user_id }) {
    const foundNewEducation = await EducationModel.find({ user: user_id }).populate('user');
    return foundNewEducation;
  }
}

export { Education };
