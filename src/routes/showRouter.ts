import express from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowController } from "../controller/ShowController";
import { ShowDatabase } from "../data/ShowDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export const showRouter = express.Router();

const showBusiness = new ShowBusiness(
   new ShowDatabase(),
   new Authenticator(),
   new IdGenerator()
);
const showController = new ShowController(showBusiness);

showRouter.post("/create", showController.scheduleShow);
showRouter.get("/getshow", showController.getShowDay);