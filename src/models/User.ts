import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface UserSchema extends Document {
    email: string;
    password: string;
    nickname: string;
}

export interface UserMethods {
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserSchema, Model<UserSchema>, UserMethods>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128,
    },
    nickname: String,
});

userSchema.pre("save", function encryptPassword(next) {
    if (!this.isModified(this.password) && !this.isNew) {
        return next();
    }

    return bcrypt.hash(this.password, bcrypt.genSaltSync(10), (err, hash) => {
        if (err) {
            return next(err);
        }

        this.password = hash;
    });
});

userSchema.method("comparePassword", function comparePassword(password: string) {
    try {
        return bcrypt.compare(password, this.password);
    } catch (error) {
        return false;
    }
});

export default mongoose.model("user", userSchema);
