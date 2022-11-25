import { Ticket, UserTicket } from '../model/Ticket';
import { BaseError } from "../error/BaseError";
import { BaseDatabase } from "./BaseDatabase";


export class TicketData extends BaseDatabase {
    private static TABLE_NAME = "TABELAS_INGRESSOS"

    create = async (ticket: Ticket) => {
        try {
            await this.getConnection()
                .insert({
                    id: ticket.getId(),
                    name: ticket.getName(),
                    value: ticket.getValue(),
                    show_id: ticket.getShowId(),
                    quantity: ticket.getQuantity()
                })
                .into(TicketData.TABLE_NAME);
        } catch (error: any) {
            throw new BaseError(400, error.sqlMessage);
        }
    }

    get = async (show_id:string):Promise<number> => {
        try {
            const [result] = await this.getConnection()
                .select(`quantity`)
                .from(TicketData.TABLE_NAME)
                .where({show_id})
            return result;
        } catch (error: any) {
            throw new BaseError(400, error.sqlMessage);
        }
    }

    getQuantityFromShow = async (show_id:string):Promise<number> => {
        try {
            const [result]:number[] = await this.getConnection()
                .select(`quantity`)
                .from(TicketData.TABLE_NAME)
                .where({show_id})
            return result;
        } catch (error: any) {
            throw new BaseError(400, error.sqlMessage);
        }
    }

    buy = async (userTicket: UserTicket) => {
        try {
            await this.getConnection()
            .insert({
                show_id: userTicket.getShowId(),
                quantity: userTicket.getQuantity(),
                user_id: userTicket.getUserId()
            })
            .into(TicketData.TABLE_NAME);
        } catch (error: any) {
            throw new BaseError(400, error.sqlMessage);
        }
    }

    updateQuantity =async (show_id:string, newValue:number) => {
        try {
            const [findQuantity] = await this.getConnection()
            .select(`quantity`)
            .from(TicketData.TABLE_NAME)
            .where({show_id});
            
            await this.getConnection()
            .update({quantity: findQuantity.quantity - newValue})
            .from(TicketData.TABLE_NAME)
            .where({show_id})
        } catch (error: any) {
            throw new BaseError(400, error.sqlMessage);
        }
    }
} 