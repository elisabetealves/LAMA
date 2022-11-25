import { Authenticator } from "../../src/services/Authenticator";

export class IdGeneratorMock {
    public generate(input: Authenticator): string {
        return "id"
    }
}