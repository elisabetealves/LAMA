import { TicketData } from './../data/TicketData';
import { PhotoData } from "../data/PhotoData";
import { BaseError } from "../error/BaseError";
import { Photo, PhotoInputDTO } from "./../model/Photo";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

export class PhotoBusiness{
    constructor(
        private hashGenerator: HashManager,
        private idGenerator: IdGenerator,
        private tokenGenerator: Authenticator,
        private photoData: PhotoData,
        private ticketData: TicketData
      ) {}
      public async photo(input: PhotoInputDTO){
    try {
        const {photo, token, event_id } = input
        if (!event_id) {
          throw new BaseError(422,"Invalid event_id");
        }
        const ticketExists = await this.ticketData.get(event_id);
        if (!ticketExists) {
          throw new BaseError (404, `Show was not found!`)
        }

        if (!photo) {
            throw new BaseError(422,"Invalid event_id");
          }
        const tokenData = this.tokenGenerator.getData(token)
        if (!tokenData) {
            throw new BaseError(403,"Invalid token");
        }


         const id = this.idGenerator.generate();
        // const event_id = tokenData.id;
       
      const newPhoto = new Photo(
        id,
        photo,
        event_id
      );
      await this.photoData.createPost(newPhoto);
      return newPhoto;
      }catch (error:any) {
        throw new BaseError(error.statusCode, error.message);
    }
}}