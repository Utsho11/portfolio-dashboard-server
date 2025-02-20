/* eslint-disable no-console */

import config from "../config";
import { User } from "../modules/User/user.model";

export const seed = async () => {
  try {
    //atfirst check if the admin exist of not
    const admin = await User.findOne({
      role: "ADMIN",
      email: config.admin_email,
    });
    if (!admin) {
      console.log("Seeding started...");

      await User.create({
        name: "Utsho Roy",
        role: "ADMIN",
        email: config.admin_email,
        password: config.admin_password,
        profilePhoto: config.admin_profile_photo,
        mobileNumber: config.admin_mobile_number,
      });
      console.log("Admin created successfully...");
      console.log("Seeding completed...");
    }
  } catch (error) {
    console.log("Error in seeding", error);
  }
};
