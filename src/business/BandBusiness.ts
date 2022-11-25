import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BandDatabase } from "../data/BandDatabase";
import { BandInputDTO } from "../model/Band";
import { BaseError } from "../error/BaseError";

export class BandBusiness {
    constructor(
        private bandData: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }
    createBand = async (band: BandInputDTO, token:string) => {       
        
        const { name, music_genre, responsible } = band
        if (!name || !music_genre || !responsible) {
            throw new BaseError(422, "Invalid fields")

        }
        const registeredBand = await this.bandData.getBandByName(band.name)
        if (registeredBand) {
            throw new BaseError(422, "Band already registered")
        }
        const id = this.idGenerator.generate();     

        const verifyToken = this.authenticator.getData( token );
        if (verifyToken.role !== "ADMIN") {
            throw new BaseError(401, "Only admins can register bands")
        }
        
        return await this.bandData.createBand(id, name, music_genre, responsible);
    }

    async getBandById(id:string, token:string){

        if (!token) {
            throw new BaseError(401,'Not authorized')
        }
        

        if (!id) {
            throw new BaseError(406,'Fill in the fields, please')
        }

        const band = await this.bandData.selectBandById(id)

        if (!band) {
            throw new BaseError(404,'Post not found!')
        }

        return band
    }
}