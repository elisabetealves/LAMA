import express from "express"
import { TicketBusiness } from "../business/TicketBusiness";
import { TicketController } from '../controller/TicketController'
import { ShowDatabase } from "../data/ShowDatabase";
import { TicketData } from "../data/TicketData";

export const ticketRouter = express.Router(); 

const ticketBusiness = new TicketBusiness(
   new TicketData(),
   new ShowDatabase()
);
const ticketController = new TicketController(
   ticketBusiness
)
ticketRouter.post("/create", ticketController.createTicket);
ticketRouter.post("/buyticket", ticketController.purchase);
