/* eslint-disable no-useless-escape */
import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";
import { IUserModel, TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
    },
    role: {
      type: String,
      default: "ADMIN",
    },
    email: {
      type: String,
      required: true,
      //validate email
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: 0,
    },
    mobileNumber: {
      type: String,
    },
    age: {
      type: String,
    },
    location: {
      type: String,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

userSchema.pre("save", async function(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// set '' after saving password
userSchema.post("save", function(doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByEmail = async function(email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function(
  plainTextPassword,
  hashedPassword
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, IUserModel>("User", userSchema);
