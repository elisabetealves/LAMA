import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
  private static TABLE_NAME = "TABELA_SHOWS";

  insertShow = async (id: string, show: Show) => {
    try {
      await this.getConnection()
        .insert({
          id: id,
          band_id: show.getId(),
          week_day: show.getWeek_day(),
          start_time: show.getStart_time(),
          end_time: show.getEnd_time(),
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getAllShow = async () => {
    try {
      const result = await this.getConnection()
        .select("*")
        .into(ShowDatabase.TABLE_NAME);
      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getShowDay = async (week_day: string) => {
    try {
      const result = await this.getConnection()
        .select(
          "TABELA_BANDAS.name",
          "TABELA_BANDAS.music_genre",
          "TABELA_SHOWS.start_time",
          "TABELA_SHOWS.end_time"
        )
        .join("TABELA_SHOWS", "TABELA_BANDAS.id", "TABELA_SHOWS.band_id")
        .where({ week_day })
        .orderBy("start_time")
        .from("TABELA_BANDAS");
      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  getShowById = async(id:string):Promise<Show> => {
    try {
        const [show]:Show[] = await this.getConnection()
        .select(`*`)
        .from(ShowDatabase.TABLE_NAME)
        .where({id});
        return show;
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
}
}