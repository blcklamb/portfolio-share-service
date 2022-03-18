import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { blogService } from "../services/blogService";

const blogRouter = Router();

blogRouter.post("/blog/create", login_required, async (req, res, next) => {
  try {
    const { user_id, service, url } = req.body;
    if (!user_id || !service || !url) {
      const errorMessage = "필요한 데이터를 정확히 입력해주세요.";
      throw new Error(errorMessage);
    }

    const newBlog = await blogService.addBlog({ user_id, service, url });

    if (newBlog.errorMessage) {
      throw new Error(newBlog.errorMessage);
    }

    res.status(200).json(newBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.get(
  "/bloglist/:user_id?",
  login_required,
  async (req, res, next) => {
    try {
      const { user_id } = req.params;
      if (!user_id) {
        const errorMessage = "필요한 데이터를 정확히 입력해주세요.";
        throw new Error(errorMessage);
      }

      const foundBlogs = await blogService.getBlogs({ user_id });

      if (foundBlogs.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).json(foundBlogs);
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.get("/blogs/:id?", login_required, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const errorMessage = "필요한 데이터를 정확히 입력해주세요.";
      throw new Error(errorMessage);
    }

    const foundBlog = await blogService.getBlog({ id });

    if (foundBlog.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).json(foundBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/blogs/:id?", login_required, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, service, url } = req.body;

    if (!id || !user_id || !service || !url) {
      const errorMessage = "필요한 데이터를 정확히 입력해주세요.";
      throw new Error(errorMessage);
    }

    const updatedBlog = await blogService.setBlog({ id, user_id, service, url });

    if(updatedBlog.errorMessage) {
        throw new Error(updatedBlog.errorMessage);
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

export { blogRouter };
