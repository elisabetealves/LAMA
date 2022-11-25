import { TicketBusiness } from './../business/TicketBusiness';
import { Request, Response } from "express";

export class TicketController {
  constructor(private ticketBusiness:TicketBusiness) {}
  createTicket = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    const { name, value, show_id, quantity} = req.body;
    const data = {
        token,
        name,
        value,
        show_id,
        quantity
    }
    try {
          const result = await this.ticketBusiness.createTicket(data);
          res.status(201).send(result);
        } catch (error: any) {
          const { statusCode, message } = error;
          res.status(statusCode || 400).send({ message });
        }
  }
  
  purchase = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    const { show_id, quantity} = req.body;
    const data = {
        token,
        show_id,
        quantity
    }
    try {
          const result = await this.ticketBusiness.buyTicket(data);
          res.status(201).send(result);
        } catch (error: any) {
          const { statusCode, message } = error;
          res.status(statusCode || 400).send({ message });
        }
  }
}