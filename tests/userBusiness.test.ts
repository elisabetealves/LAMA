import { UserBusiness } from "../../src/business/UserBusiness";
import { LoginInputDTO, UserInputDTO } from "../../src/model/User";
import { HashGeneratorMock } from "./mocks/hashGeneratorMock";
import { IdGeneratorMock } from "./mocks/idGeneratorMock";
import { TokenGeneratorMock } from "./mocks/tokenGeneratorMock";
import { UserDatabaseMock } from "./mocks/userDatabaseMock";


const userBusinessMock = new UserBusiness(
    new IdGeneratorMock() as any,
    new HashGeneratorMock() as any,
    new TokenGeneratorMock() as any,
    new UserDatabaseMock() as any,
)

const user: UserInputDTO = {
    name: "",
    email: "gabriel@gmail.com",
    password: "123456",
    role: "NORMAL"
}

const user1: UserInputDTO = {
    name: "Luana",
    email: "luanaemail.com",
    password: "123456",
    role: "NORMAL"
}

const user2: UserInputDTO = {
    name: "Luana",
    email: "luana@gmail.com",
    password: "12345",
    role: "NORMAL"
}

const user3: UserInputDTO = {
    name: "Luana",
    email: "luana@gmail.com",
    password: "123456",
    role: "batata"
}

describe("Testando o signup", () => {
    test("Deve retornar erro quando o nome está vazio", async () => {
        try {

            await userBusinessMock.createUser(user)

        } catch (error: any) {
            expect(error.message).toEqual("Invalid fields")
            expect(error.code).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o email é inválido (nao tem arroba)", async () => {
        try {
            await userBusinessMock.createUser(user1)
        } catch (error: any) {
            expect(error.message).toEqual("Invalid email")
            expect(error.code).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando senha inválida", async () => {
        try {
            await userBusinessMock.createUser(user2)
        } catch (error: any) {
            expect(error.message).toEqual("Invalid password")
            expect(error.code).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })


    test("Deve retornar erro quando receber um role que não existente", async () => {
        try {
            await userBusinessMock.createUser(user3)
        } catch (error: any) {
            expect(error.message).toEqual("Invalid user role")
            expect(error.code).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })


    const login1: LoginInputDTO = {
        email: "luana@gmail.com",
        password: ""

    }

    const login2: LoginInputDTO = {
        email: "luana@gmail.com",
        password: "123456"

    }

    const login3: LoginInputDTO = {
        email: "luana@gmail.com",
        password: "1234"

    }

    describe("Testando login", () => {
        test("Deve retornar erro quando o email fornecido não existe", async () => {
            try {
                await userBusinessMock.getUserByEmail(login1)
            } catch (error: any) {
                expect(error.message).toEqual("'email' and 'password' are required")
                expect(error.code).toBe(422)
            } finally {
                expect.assertions(2)
            }
        })

        test("Sucesso no login", async () => {
            try {
                const accessToken = await userBusinessMock.getUserByEmail(login2)
                expect(accessToken).toEqual("token")
            } catch (error) {
                console.log(error);                
            }
        })

        test("Deve retornar erro quando senha inválida", async () => {
            try {
                await userBusinessMock.getUserByEmail(login3)
            } catch (error: any) {
                expect(error.message).toEqual("Invalid password")
                expect(error.code).toBe(422)
            } finally {
                expect.assertions(2)
            }
        })
    })
})