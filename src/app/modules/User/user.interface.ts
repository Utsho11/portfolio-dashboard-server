import { Model } from "mongoose";

export type TUser = {
  _id?: string;
  name: string;
  role: string;
  email: string;
  password: string;
  age?: string;
  location?: string;
  mobileNumber?: string;
  profilePhoto?: string;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
