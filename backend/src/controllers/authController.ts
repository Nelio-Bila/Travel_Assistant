import { Request, Response,RequestHandler, NextFunction } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { PrismaClient, User } from "@prisma/client";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { ParsedQs } from 'qs';
import HttpException from "../exceptions/HttpException";
import { GenerateRefreshToken } from "../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../provider/GenerateTokenProvider";

const prisma = new PrismaClient();

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    next(new HttpException(401, "A user with this email could not be found"));
    return;
  }
  loadedUser = user;
  const isEqual = await bcrypt.compare(password, (user as User).password);
  if (!isEqual) {
    next(new HttpException(401, "Wrong password"));
    return;
  }

  const generateTokenProvider = new GenerateTokenProvider();
  const token = await generateTokenProvider.execute(loadedUser);

  await prisma.refreshToken.deleteMany({
    where: {
      userId: loadedUser.id,
    },
  });

  const generateRefreshToken = new GenerateRefreshToken();
  const refreshToken = await generateRefreshToken.execute(loadedUser.id);

  

  res.status(200).json({
    token: token,
    refreshToken: refreshToken,
    user: {
      id: (loadedUser as User).id,
      email: (loadedUser as User).email,
    },
  });
};

// export const loginValidation = [
//   body("email").isEmail().withMessage("Please enter a valid email address"),
//   body("password")
//     .trim()
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters long"),
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       next(new HttpException(422, "Invalid input"));
//       return;
//     }
//     next();
//   },
// ];
export const loginValidation: RequestHandlerParams<
  any, // Use 'any' for Params type
  any,
  any,
  ParsedQs,
  Record<string, any>
> = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new HttpException(422, 'Invalid input'));
      return;
    }
    next();
  },
];

export const getAuth: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.body;

    const user = jwt.verify(token, process.env.JWT_SECRET as Secret);

    

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const register: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() });
  }

  const { email, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = prisma.user.create({
        data: {
          email: email,
          password: hashedPw,
        },
      });
      return user;
    })
    .then((savedUser) => {
      res.status(201).json({ message: "Created the User.", user: {email} });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
