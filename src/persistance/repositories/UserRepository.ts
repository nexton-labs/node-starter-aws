import { ProvideSingleton } from "../../ioc";
import IRepository from "./IRepository";
import { IUserDto } from "../../services/dto";
import { User } from "../entities/User";

@ProvideSingleton(UserRepository)
export class UserRepository extends IRepository {
  public async findOne(id: string): Promise<User> {
    return await this.getUserRepository().findOne(id);
  }

  public async save(user: User): Promise<User> {
    return await this.getUserRepository().save(user);
  }

  public async create(user: IUserDto): Promise<User> {
    return await this.getUserRepository().create(user);
  }

  public async update(id: string, entity: IUserDto) {
    return await this.getUserRepository().update(id, entity);
  }

  public async delete(id: string): Promise<string> {
    let result = await this.getUserRepository().delete(id);
    return JSON.parse(JSON.stringify(result));
  }

  public async getCount(field: string, filter: string): Promise<number> {
    return await this.getUserRepository()
      .createQueryBuilder("user")
      .where(`${field} like :filter`, { filter: filter })
      .select("DISTINCT(`id`)")
      .getCount();
  }

  public async getMany(
    page: number,
    field: string,
    filter: string,
    sort: "ASC" | "DESC",
    limit: number
  ): Promise<User[]> {
    return await this.getUserRepository()
      .createQueryBuilder("user")
      .skip(page * limit)
      .take(limit)
      .where(`${field} like :filter`, { filter: filter })
      .orderBy(field, sort)
      .getMany();
  }
}
