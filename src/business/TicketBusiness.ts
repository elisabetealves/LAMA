import { UserTicket, InputTicket, InputUserTicket  } from './../model/Ticket';
import { ShowDatabase } from './../data/ShowDatabase';
import { TicketData } from './../data/TicketData';
import { BaseError } from "../error/BaseError"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { Ticket } from '../model/Ticket';

export class TicketBusiness {
    constructor(
        private ticketData: TicketData,
        private showData:ShowDatabase
    ) { }
    async createTicket(ticket: InputTicket) {
        try {
            const { token, name, value, show_id, quantity } = ticket;

            if (!token) { throw new BaseError(403, `Authorization token is required`) }
            const authenticator = new Authenticator()
            const tokenData = authenticator.getData(token)
            if (!tokenData) {throw new BaseError(404, `User not found!`)}
            if (tokenData.role !== "ADMIN") { throw new BaseError(403, `Only administrators can add a ticket`) }

            if (!name || !value || !show_id || !quantity) { throw new BaseError(422, `Invalid fields`) };
            const showExists = await this.showData.getShowById(show_id);
            if(!showExists) {
                throw new BaseError(404, `Show was not found!`)
            }
            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const newTicket = new Ticket(
                id,
                name,
                value,
                show_id,
                quantity
            )
            await this.ticketData.create(newTicket);

            return newTicket;
        } catch (error: any) {
            throw new BaseError(error.statusCode, error.message);
        }
    }

    async buyTicket(data:InputUserTicket) {
        try {
            const { token, show_id, quantity } = data;

            if (!token) { throw new BaseError(403, `Authorization token is required`) }
            const authenticator = new Authenticator()
            const tokenData = authenticator.getData(token)
            if (!tokenData) {throw new BaseError(404, `User not found!`)}
            const user_id = tokenData.id;

            if (!show_id || !quantity) { throw new BaseError(422, `Invalid fields`) };
            const ticketExists = await this.ticketData.get(show_id);
            if(!ticketExists) {
                throw new BaseError(404, `Tickets from this show weren't found!`)
            }
            if (ticketExists<quantity) {
                throw new BaseError(401, `You're trying to purchase more tickets than those available!`)
            }
            
            await this.ticketData.updateQuantity(show_id, quantity);

            const newPurchase = new UserTicket(
                show_id,
                quantity,
                user_id
            )

            await this.ticketData.buy(newPurchase);
            
            return newPurchase;
        } catch (error: any) {
            throw new BaseError(error.statusCode, error.message);
        }
   }

}