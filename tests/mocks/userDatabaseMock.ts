import { User } from "../../src/model/User";
import { adminUserMock, userMock } from "./userMock";

export class UserDatabaseMock {

    public async signUp(user: User): Promise<void> {

    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        switch (email) {
            case "user1@gmail.com":
                return userMock
            case "user2@gmail.com":
                return adminUserMock
            default:
                return undefined
        }
    }

    public async getUserById(id: string): Promise<User | undefined> {
        switch (id) {
            case "id_user_1":
                return userMock
            case "id_user_2":
                return adminUserMock
            default:
                return undefined
        }
    }

    public async getAllUsers(): Promise<User[]> {
        return [
            userMock, adminUserMock
        ]
    }
}