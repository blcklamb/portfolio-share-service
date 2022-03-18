import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardAuthService } from "../services/awardService";

const awardAuthRouter = Router();
awardAuthRouter.use(login_required);

awardAuthRouter.post("/award/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;

    // 위 데이터를 유저 db에 추가하기
    const newAward = await awardAuthService.addAward({
      user_id,
      title,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardAuthRouter.get('/awards/:id', async function (req, res, next) {
  try { 
    const awardId = req.params.id;
    const award = await awardAuthService.getAward({ awardId });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }
    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
})

awardAuthRouter.get('/awardlist/:user_id', async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const awards = await awardAuthService.getAwards({ user_id });

    if (awards.errorMessage) {
      throw new Error(awards.errorMessage);
    }
    res.status(200).send(awards)
  } catch (error) {
    next(error);
  }
})

awardAuthRouter.put("/awards/:id", async function (req, res, next) {
  try {
    const awardId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    
    const updatedAward = await awardAuthService.setAward({ awardId, title, description});

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }
    res.status(200).send(updatedAward)
  } catch (error) {
    next(error);
  }
})

awardAuthRouter.delete("/awards/:id", async function (req, res, next) {
  try {
    const awardId = req.params.id;
    const currentUser = req.currentUserId;
    const award = await awardAuthService.getAward({ awardId });

    if (String(currentUser) !== String(award.user_id)) {
      throw new Error("접근 권한이 없습니다.")
    }

    const deletedAward = await awardAuthService.deleteAward({ awardId });

    if (deletedAward.errorMessage) {
      throw new Error(deletedAward.errorMessage);
    }

    res.status(200).send("성공적으로 수상 이력이 삭제되었습니다.")
  } catch (error) {
    next(error);
  }
})

export { awardAuthRouter };
