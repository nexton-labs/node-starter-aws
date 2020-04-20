import { User } from "../entities/User";
import { getManager } from "typeorm";
import { injectable } from "inversify";

@injectable()
export default abstract class IRepository {
  protected getUserRepository() {
    return getManager().getRepository(User);
  }
}
