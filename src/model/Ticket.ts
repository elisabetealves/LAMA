export class UserTicket {
   constructor(
   private show_id:string,
   private quantity:number,
   private user_id:string){}

   getUserId = ():string => {
       return this.user_id
   }
   getQuantity = ():number => {
       return this.quantity
   }
   getShowId = ():string => {
       return this.show_id
   }
}

export class Ticket {
   constructor(
       private id:string,
       private name:string,
       private value:number,
       private show_id:string,
       private quantity:number
   ) {}

   getId = ():string => {
       return this.id
   }
   getName = ():string => {
       return this.name
   }
   getValue = ():number => {
       return this.value
   }
   getQuantity = ():number => {
       return this.quantity
   }
   getShowId = ():string => {
       return this.show_id
   }
}

export type InputTicket = {
   token:string,
   name:string,
   value:number,
   show_id:string,
   quantity:number
}

export type InputUserTicket = {
   token:string,
   show_id:string,
   quantity:number
}
