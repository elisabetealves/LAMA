import { Request, Response } from "express";
import { PhotoBusiness } from "../business/PhotoBusiness";
import { PhotoInputDTO } from "../model/Photo";

export class PhotoController{
    constructor(private photoBusiness: PhotoBusiness) {}
  photo = async (req: Request, res: Response) => {
    try {
      const {photo, event_id} = req.body;
      const token = req.headers.authorization as string;
          const input : PhotoInputDTO = {
            photo,
            token,
            event_id
          }
      const createPhoto = await this.photoBusiness.photo(input)
          res.status(201).send({createPhoto});
        } catch (error: any) {
          const { statusCode, message } = error;
          res.status(statusCode || 400).send({ message });
        }
  }
}