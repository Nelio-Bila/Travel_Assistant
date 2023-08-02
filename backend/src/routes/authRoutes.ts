import { Router } from "express";
import { body } from "express-validator";
import { login, getAuth, register } from "../controllers/authController";
import {RefreshTokenUserController} from "../refreshTokenUser/RefreshTokenUserController"
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
      .withMessage("Introduza um email válido")
      .custom(async (value, { req }) => {
        const prisma = new PrismaClient();
        const userDoc = await prisma.user.findFirst({
          where: { email: value },
        });
        if (userDoc) {
          return Promise.reject("Este email já esta em uso no sistema");
        }
      }),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("A palavra-passe deve ter 6 caracteres no minimo"),
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
