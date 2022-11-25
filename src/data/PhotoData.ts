import { Photo } from "./../model/Photo";
import { BaseDatabase } from "./BaseDatabase";

export class PhotoData extends BaseDatabase{
   private static TABLE_NAME = "TABELAS_PHOTO"

    public async createPost(photo: Photo): Promise<void> {
      try {
        await this.getConnection()
        .insert({
          id: photo.getId(),
          photo: photo.getPhoto(),
          event_id: photo.getEventId()
        })
        .into(PhotoData.TABLE_NAME);
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }
}