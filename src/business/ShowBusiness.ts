import { ShowDatabase } from "../data/ShowDatabase";
import { BaseError } from "../error/BaseError";
import { Show, showDayInputDTO, ShowInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
  constructor(
    private showDatabase: ShowDatabase,
    private authenticator: Authenticator,
    private idGenerator: IdGenerator
  ) {}

  // pegar todos os shows
  checkShow = async () => {
    return await this.showDatabase.getAllShow();
  };

  createShow = async (token: string, newShow: ShowInputDTO) => {
    const { band_id, week_day, start_time, end_time } = newShow;
    if (!token || !band_id || !week_day || !start_time || !end_time) {
      throw new BaseError(422, "All fields need to be filled");
    }

    if (
      week_day.toUpperCase() !== "SEXTA" &&
      week_day.toUpperCase() != "SABADO" &&
      week_day.toUpperCase() != "DOMINGO"
    ) {
      throw new BaseError(422, "Choose between Friday, Saturday and Sunday");
    }

    const authorization = this.authenticator.getData(token);
    if (!authorization) {
      throw new BaseError(422, "Invalid Token");
    }

    //verificando horario
    if (start_time < 8 || start_time > 22) {
      throw new BaseError(422, "Invalid start time");
    }
    if (end_time < 9 || end_time > 23) {
      throw new BaseError(422, "Invalid end time");
    }
    if (start_time >= end_time) {
      throw new BaseError(422, "Invalid time");
    }

    // verificar se já tem show no mesmo horario
    const checkShow = await this.checkShow();
    checkShow.map((show) => {
      if (week_day === show.week_day && start_time === show.start_time) {
        throw new BaseError(422, "There is already a show for the same period");
      }
    });

    const id = this.idGenerator.generate();

    const showData = Show.toShowModel(newShow);

    await this.showDatabase.insertShow(id, showData);

    return "Show criado";
  };

  verifyDay = async (day: showDayInputDTO) => {
    const { token, week_day } = day;

    if (!token || !week_day) {
      throw new BaseError(422, "All fields need to be filled");
    }

    const authorization = this.authenticator.getData(token);
    if (!authorization) {
      throw new BaseError(422, "Invalid token");
    }

    const result = await this.showDatabase.getShowDay(week_day);

    return result;
  };
}