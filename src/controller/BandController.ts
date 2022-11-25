import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController {

    constructor(
        private bandBusiness: BandBusiness
    ) { }
    createBand = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization!;
            const { name, music_genre, responsible} = req.body
            const input: BandInputDTO = {
                name,
                music_genre,
                responsible,
            }
            
            await this.bandBusiness.createBand(input, token);

            res.status(200).send({ message: `Banda ${name} cadastrada com sucesso` });

        } catch (error) {           
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no cadastro de banda")
        }

        await BaseDatabase.destroyConnection();
    }

    getBandByIdController = async (req:Request, res:Response) =>{
        try{
            const id:string = req.params.id

            const token: string = req.headers.authorization as string

            const result = await this.bandBusiness.getBandById(id,token)

            res.status(201).send({ result })

        }catch(error:any){
            
            res.send({ message: error.sqlMessage || error.message })
        }
    }
}