import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        email: {
            type: Schema.Types.String,
            required: true,
            immutable: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
            trim: true,
            default: "설명을 입력해 주세요.",
        },
        image: {
            type: String,
            required: false,
            default: "https://cdn0.iconfinder.com/data/icons/education-2-27/32/user_staff_person_man_profile_boss_circle-512.png",
        },
        likes: {
            type: Array,
        },
        socialLogin: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true },
);

const UserModel = model("User", UserSchema);

export { UserModel };
