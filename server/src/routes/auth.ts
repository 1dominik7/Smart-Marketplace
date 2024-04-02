import { Router } from "express";
import {
  createNewUser,
  generateForgetPassLink,
  generateVerificationLink,
  grantAccessToken,
  grantValid,
  sendProfile,
  sendPublicProfile,
  signIn,
  signOut,
  updateAvatar,
  updatePassword,
  updateProfile,
  verifyEmail,
} from "src/controllers/auth";
import { isAuth, isValidPassResetToken } from "src/middleware/auth";
import fileParser from "src/middleware/fileParser";
import validate from "src/middleware/validator";
import { newUserSchema, verifyTokenSchema } from "src/utils/validationSchema";

const authRouter = Router();

authRouter.post("/sign-up", validate(newUserSchema), createNewUser);
authRouter.post("/verify", validate(verifyTokenSchema), verifyEmail);
authRouter.get("/verify-token", isAuth, generateVerificationLink);
authRouter.post("/sign-in", signIn);
authRouter.get("/profile", isAuth, sendProfile);
authRouter.post("/refresh-token", grantAccessToken);
authRouter.post("/sign-out", isAuth, signOut);
authRouter.post("/forget-pass", generateForgetPassLink);
authRouter.post(
  "/verify-pass-reset-token",
  validate(verifyTokenSchema),
  isValidPassResetToken,
  grantValid
);
authRouter.post(
  "/reset-pass",
  validate(verifyTokenSchema),
  isValidPassResetToken,
  updatePassword
);
authRouter.patch(
  "/update-profile",
  isAuth,
  updateProfile
);
authRouter.patch(
  "/update-avatar",
  isAuth,
  fileParser,
  updateAvatar
);
authRouter.get(
  "/profile/:id",
  isAuth,
  sendPublicProfile
);

export default authRouter;
