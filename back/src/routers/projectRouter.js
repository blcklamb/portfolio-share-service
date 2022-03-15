const express = require("express");
const router = express.Router();
import Project from "../db/schemas/project";

router.post("/project/create", async (req, res, next) => {
    try {
        const { user_id, title, description, from_date, to_date } = req.body;
        const project = await Project.create({
            user_id,
            title,
            description,
            from_date,
            to_date,
        });
        return res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
