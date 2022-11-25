import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";


export const userRouter = express.Router();

const userBusiness = new UserBusiness(
   new UserDatabase(),
  new IdGenerator(),
  new HashManager(),
  new Authenticator()
);
const userController = new UserController(userBusiness);

userRouter.post("/signup", userController.createUser);
userRouter.post("/login", userController.login);