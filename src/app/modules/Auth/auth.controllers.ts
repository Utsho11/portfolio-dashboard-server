import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully!",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Access token retrieved successfully!",
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const result = await AuthServices.getMeFromDB(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully!",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
  getMe,
};
