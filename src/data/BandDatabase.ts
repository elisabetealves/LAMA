import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "TABELA_BANDAS";

  public createBand = async (
    id: string,
    name: string,
    music_genre: string,
    responsible: string,
  ): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre,
          responsible  
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getBandByName(name:string){
    try{
        const [result] = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({name})
        
        return result

    }catch(error:any){
        throw new Error(error.sqlMessage || error.message)
    }
}

async selectBandById(id:string){
    try{
        const [result] = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({id})

        return result
    }catch (error:any){
        throw new Error(error.sqlMessage || error.message)
    }
}
}