import express from "express"
import { PhotoBusiness } from "../business/PhotoBusiness";
import { PhotoController } from "../controller/PhotoController";
import { PhotoData } from "../data/PhotoData"
import { TicketData } from "../data/TicketData";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const photoRouter = express.Router();

const photoBusiness = new PhotoBusiness(
   new HashManager(),
   new IdGenerator(),
   new Authenticator(),
   new PhotoData(),
   new TicketData()
   )
const photoController = new PhotoController(photoBusiness)

photoRouter.post("/add", photoController.photo)