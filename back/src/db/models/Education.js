import { EducationModel } from "../schemas/education";
import { v4 as uuidv4 } from 'uuid';

class Education {
  static async create({ newEducation }) {
    const newUuid = uuidv4();
    const createdNewEducation = await EducationModel.create({...newEducation, id: newUuid, user: newEducation.user_id, });
    return createdNewEducation;
  }

  static async findByUserId({ user_id }) {
    const foundEducation = await EducationModel.find({ user: user_id });
    return foundEducation;
  }

  static async findById({ id }) {
    const foundEducation = await EducationModel.find({ id: id });
    return foundEducation;
  }
}

export { Education };
