import { Router } from "express";
import { body } from "express-validator";
import { login, getAuth, register } from "../controllers/authController";
import {RefreshTokenUserController} from "../RefreshTokenUser/RefreshTokenUserController"
import { PrismaClient } from "@prisma/client";

const router = Router();
const refreshTokenUserController = new RefreshTokenUserController();

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Introduza um email válido"),
    body("password").trim(),
  ],
  login
);

router.post(
  "/register",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid E-mail")
      .custom(async (value, { req }) => {
        const prisma = new PrismaClient();
        const userDoc = await prisma.user.findFirst({
          where: { email: value },
        });
        if (userDoc) {
          return Promise.reject("This email already has any account associated");
        }
      }),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must have 6 characters minimum"),
  ],
  register
);

router.post(
  "/user",
  [
    body("token").trim()
  ],
  getAuth
);

router.post("/refresh_token", refreshTokenUserController.handle)

export default router;
