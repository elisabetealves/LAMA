import { BaseDatabase } from "./BaseDatabase";
import { toUserModel, User } from "../model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "TABELAS_USUÁRIOS";

  public signup = async (
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public getUserByEmail = async (email: string): Promise<User | undefined>  => {
    try {

      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email });

        if(result[0]){
          return toUserModel(result[0]);
        }else{
          return undefined
        }
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}
