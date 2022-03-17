import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: "설명이 아직 없습니다. 추가해 주세요.",
        },
        image: {
            type: String,
            required: false,
            default: "https://cdn0.iconfinder.com/data/icons/education-2-27/32/user_staff_person_man_profile_boss_circle-512.png",
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = model("User", UserSchema);

export { UserModel };
