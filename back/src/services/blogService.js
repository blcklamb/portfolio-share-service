import { Blog } from "../db";
import { v4 as uuidv4 } from "uuid";

class blogService {
  static async addBlog({ user_id, service, url }) {
    // 중복 확인
    const preBlog = await this.getBlogs({ user_id });

    for (let i = 0; i < preBlog.length; i++) {
      if (preBlog[i]?.service === service && preBlog[i]?.url === url) {
        const errorMessage = "이미 입력한 블로그입니다.";
        return { errorMessage };
      }
    }

    // 블로그 생성
    const newBlog = { id: uuidv4(), user_id, service, url };
    const createdNewBlog = await Blog.create(newBlog);

    // 블로그 생성 실패한 경우
    if (createdNewBlog.errorMessage) {
      const errorMessage = "블로그 저장에 실패하였습니다.";
      return { errorMessage };
    }

    return createdNewBlog;
  }

  static async getBlog({ id }) {
    // 블로그 조회
    const foundBlog = await Blog.findById({ id });
    
    // 블로그 조회 실패한 경우
    if (!foundBlog) {
      const errorMessage = "존재하지 않는 블로그 항목 입니다.";
      return { errorMessage };
    }

    return foundBlog;
  }

  static async getBlogs({ user_id }) {
    // 블로그 조회
    const foundBlogs = await Blog.findByUserId({ user_id });
    return foundBlogs;
  }

  static async setBlog({ id, user_id, service, url }) {
    // 존재하는 정보인지 확인
    const foundBlog = await this.getBlog({ id });

    if(foundBlog.errorMessage) {
        return foundBlog.errorMessage;
    }

    // 블로그 수정
    const updatedBlog = await Blog.update({ id, user_id, service, url });

    // 블로그 수정 실패시 에러메세지
    if (!updatedBlog) {
      const errorMessage = "블로그 수정에 실패했습니다.";
      return { errorMessage };
    }

    // 블로그 수정 성공시 에러메세지 제거
    updatedBlog.errorMessage = null;

    return updatedBlog;
  }

  static async deleteBlog({ id }) {
    // 존재하는 정보인지 확인
    const foundBlog = await this.getBlog({ id });

    if(!foundBlog) {
        const errorMessage = "이미 존재하지 않은 블로그 항목 입니다.";
        return { errorMessage };
    }

    // 블로그 삭제
    const deletedBlog = await Blog.delete({ id });
    
    // 블로그 삭제 실패시 에러메시지
    if (deletedBlog.deletedCount === 0) {
      const errorMessage = "블로그 삭제에 실패했습니다.";
      return { errorMessage };
    }

    // 블로그 삭제 성공시 에러메시지 제거
    deletedBlog.errorMessage = null;
    
    return deletedBlog;
  }
}

export { blogService };
