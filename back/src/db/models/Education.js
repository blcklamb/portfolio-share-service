import { EducationModel } from "../schemas/education";
import { v4 as uuidv4 } from 'uuid';

class Education {
  static async create({ newEducation }) {
    const newUuid = uuidv4();
    const createdNewEducation = await EducationModel.create({...newEducation, id: newUuid, user: newEducation.user_id, });
    return createdNewEducation;
  }

  static async findById({ user_id }) {
    const foundNewEducation = await EducationModel.find({ user: user_id });
    return foundNewEducation;
  }
}

export { Education };
