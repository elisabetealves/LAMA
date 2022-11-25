export enum weekDay {
   sexta = "sexta",
   sabado = "sabado",
   domingo = "domingo",
 }
 
 export class Show {
   constructor(
     private band_id: string,
     private week_day: weekDay,
     private start_time: number,
     private end_time: number
   ) {}
 
   public getId() {
     return this.band_id;
   }
 
   public getWeek_day = (): weekDay => this.week_day;
 
   public getStart_time() {
     return this.start_time;
   }
   
   public getEnd_time() {
     return this.end_time;
   }
 
   static toShowModel(show: any): Show {
     return new Show(
       show.band_id,
       show.week_day,
       show.start_time,
       show.end_time
     );
   }
 }
 
 export interface ShowInputDTO {
   band_id: string;
   week_day: string;
   start_time: number;
   end_time: number;
 }
 
 export type showDayInputDTO = {
   token: string;
   week_day: string;
 };

 