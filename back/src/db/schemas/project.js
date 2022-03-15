const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    from_date: {
        type: Date,
        required: true,
    },
    to_date: {
        type: Date,
        required: true,
    },
});

const Project = model("Project", ProjectSchema);

module.exports = Project;
