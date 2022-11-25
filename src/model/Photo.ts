export class Photo {
   constructor(
       private id:string,
       private photo:string,
       private event_id:string
   ) {}

   getId = ():string => {
       return this.id
   }
   getPhoto = ():string => {
       return this.photo
   }
   getEventId = ():string => {
       return this.event_id
   }
 
   static toUserModel(data: any): Photo {
       return new Photo(data.id, data.photo, data.event_id);
     }
}

export type PhotoInputDTO = {
   photo: string,
   token: string,
   event_id: string
}