import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { blogService } from "../services/blogService";

const blogRouter = Router();

blogRouter.post("/blog/create", login_required, async (req, res, next) => {
  try {
    // 받은 데이터
    const { user_id, service, url } = req.body;

    // 블로그 생성
    const newBlog = await blogService.addBlog({ user_id, service, url });

    // 블로그 생성 실패한 경우
    if (newBlog.errorMessage) {
      throw new Error(newBlog.errorMessage);
    }

    // 새 블로그 반환
    res.status(200).json(newBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/bloglist/:user_id?", login_required, async (req, res, next) => {
    try {
      // 받은 데이터
      const { user_id } = req.params;

      // 블로그 조회
      const foundBlogs = await blogService.getBlogs({ user_id });

      // 블로그 조회 실패한 경우
      if (foundBlogs.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      // 블로그 조회 성공한 경우
      res.status(200).json(foundBlogs);
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.get("/blogs/:id?", login_required, async (req, res, next) => {
  try {
    // 받은 데이터
    const { id } = req.params;

    // 블로그 조회
    const foundBlog = await blogService.getBlog({ id });

    // 블로그 조회 실패한 경우
    if (foundBlog.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    // 블로그 조회 성공한 경우
    res.status(200).json(foundBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/blogs/:id?", login_required, async (req, res, next) => {
  try {
    // 받은 데이터
    const { id } = req.params;
    const { user_id, service, url } = req.body;

    // 블로그 수정
    const updatedBlog = await blogService.setBlog({
      id,
      user_id,
      service,
      url,
    });

    // 블로그 수정 실패한 경우
    if (updatedBlog.errorMessage) {
      throw new Error(updatedBlog.errorMessage);
    }

    // 블로그 수정 성공한 경우
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/blogs/:id?", login_required, async (req, res, next) => {
  try {
    // 받은 데이터
    const { id } = req.params;

    // 블로그 삭제
    const deletedBlog = await blogService.deleteBlog({ id });

    // 블로그 삭제 실패한 경우
    if (deletedBlog.errorMessage) {
      throw new Error(deletedBlog.errorMessage);
    }

    // 블로그 삭제 성공한 경우
    res.status(200).json(deletedBlog);
  } catch (error) {
    next(error);
  }
});

export { blogRouter };
