import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {

    constructor(
        private userBusiness: UserBusiness
    ) { }
    createUser = async (req: Request, res: Response) => {
        try {

            const { name, email, password, role } = req.body

            const input: UserInputDTO = {
                name,
                email,
                password,
                role
            }

            const token = await this.userBusiness.createUser(input);

            res.status(200).send({ message: "User registered successfully", token });

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no signup")
        }

        await BaseDatabase.destroyConnection();
    }

    login = async (req: Request, res: Response) => {

        try {

            const { email, password } = req.body

            const input: LoginInputDTO = {
                email,
                password
            }

            const token = await this.userBusiness.getUserByEmail(input);

            res.status(200).send({ message: "User logged in successfully", token });

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no login")
        }

        await BaseDatabase.destroyConnection();
    }

}
