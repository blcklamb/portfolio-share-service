import { EducationModel } from "../schemas/education";

class Education {
  static async create(newEducation) {
    
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByUserId({ user_id }) {
    const foundEducation = await EducationModel.find({ user_id : user_id });
    return foundEducation;
  }

  static async findById({ id }) {
    const foundEducation = await EducationModel.find({ id: id });
    return foundEducation;
  }

  static async updateEducationById({ id, school, major, position }) {
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate({ id }, { school, major, position}, option);

    return updatedEducation;
  }
}

export { Education };
