import { User, UserRole } from "../../src/model/User";

export const userMock = new User(
    "id_user_1",
    "user1",
    "user1@gmail.com",
    "user1password",
    UserRole.NORMAL
)

export const adminUserMock = new User(
    "id_user_2",
    "user2",
    "user2@gmail.com",
    "user2password",
    UserRole.ADMIN
) 