import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BaseError } from "../error/BaseError";

export class UserBusiness {
    constructor(
        private userData: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
    ) { }
    createUser = async (input: UserInputDTO) => {
        const { name, password, email, role } = input

        if (!name || !email || !password || !role) {
            throw new BaseError(422, "Invalid fields")

        }

        if (email.indexOf("@") === -1) {
            throw new BaseError(422, "Invalid email");
        }

        if (password.length < 6) {
            throw new BaseError(422, "Invalid password")
        }

        if (role !== "NORMAL" && role !== "ADMIN") {
            throw new BaseError(422, "Invalid user role")
        }

        const registeredUser = await this.userData.getUserByEmail(email)
        if (registeredUser) {
            throw new BaseError(422, "E-mail already registered")
        }

        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(password);

        await this.userData.signup(id, name, email, hashPassword, role);

        const accessToken = this.authenticator.generateToken({ id, role });

        return accessToken;
    }

    getUserByEmail = async (user: LoginInputDTO) => {

        const { email, password } = user
        if (!email || !password) {
            throw new BaseError(422, "'email' and 'password' are required")
        }

        if (email.indexOf("@") === -1) {
            throw new BaseError(422, "Invalid email");
        }

        if (password.length < 6) {
            throw new BaseError(422, "Invalid password");
        }

        const userFromDB = await this.userData.getUserByEmail(user.email)

        if (!userFromDB) {
            throw new BaseError(401, "User not found")
        }

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        if (!hashCompare) {
            throw new BaseError(401, "Incorrect password")
        }

        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        return accessToken;
    }
}