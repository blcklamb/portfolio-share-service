import { Blog } from "../db";
import { v4 as uuidv4 } from "uuid";

class blogService {
  static async addBlog({ user_id, service, url }) {
    // 중복 확인
    const preBlog = await Blog.findByUserId({ user_id });
    for (let i = 0; i < preBlog.length; i++) {
      if (preBlog[i]?.service === service && preBlog[i]?.url === url) {
        const errorMessage = "이미 입력한 블로그입니다.";
        return { errorMessage };
      }
    }
    // 저장
    const newBlog = { id: uuidv4(), user_id, service, url };
    const createdNewBlog = await Blog.create(newBlog);
    createdNewBlog.errorMessage = null;

    return createdNewBlog;
  }

  static async getBlogs({ user_id }) {
    const foundBlogs = await Blog.findByUserId({ user_id });
    return foundBlogs;
  }

  static async getBlog({ id }) {
    const foundBlog = await Blog.findById({ id });
    return foundBlog;
  }

  static async setBlog({ id, user_id, service, url }) {
      const option = { origi}
    const foundBlog = await Blog.findById({ id }, {user_id, service, url}, option);
    return foundBlog;
  }
}

export { blogService };
