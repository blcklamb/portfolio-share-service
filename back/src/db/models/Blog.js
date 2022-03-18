import { BlogModel } from "../schemas/Blog";

class Blog {
  static async create(newBlog) {
    const createdBlog = await BlogModel.create(newBlog);
    return createdBlog;
  }

  static async findByUserId({ user_id }) {
    const foundBlogs = await BlogModel.find({ user_id: user_id });
    return foundBlogs;
  }

  static async findById({ id }) {
    const foundBlog = await BlogModel.findOne({ id });
    return foundBlog;
  }

  static async update() {
    const option = { returnOriginal: false };
    const updatedBlog = await BlogModel.findOneAndUpdate();
    return updatedBlog;
  }
}

export { Blog };
