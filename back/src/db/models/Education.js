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
    const foundEducation = await EducationModel.findOne({ id: id });
    return foundEducation;
  }

  static async update({ id, school, major, position }) {
    const option = { returnOriginal: false };
    const updatedEducation = await EducationModel.findOneAndUpdate({ id }, { school, major, position}, option);
    return updatedEducation;
  }

  static async delete({ id }) {
    const deletedEducation = await EducationModel.deleteOne({ id: id });
    return deletedEducation;
  }
}

export { Education };
