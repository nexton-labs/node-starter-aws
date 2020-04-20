import { SQLDbConnection } from "../../../config/SQLDbConnection";
import { iocContainer } from "../../../ioc";
import { UserRepository } from "../../../persistance/repositories/UserRepository";
import { expect } from "chai";

describe("UserRepository tests", () => {
  let repository;
  let userId;

  before(async () => {
    iocContainer.get<SQLDbConnection>(SQLDbConnection).initializeDbConnection();
    await sleep(1000);
    repository = new UserRepository();
  });

  it("should create and save", async () => {
    const createResult = await repository.create({
      email: "test@mail.com",
      name: "name",
      phone: "1234",
      skype: "test.skype"
    });
    const result = await repository.save(createResult);
    expect(result).to.have.property("id");
    expect(result).to.have.property("email");
    expect(result).to.have.property("name");
    expect(result).to.have.property("phone");
    expect(result).to.have.property("skype");
    userId = result.id;
  });

  it("should find by one by id", async () => {
    await repository.findOne(userId);
  });

  it("should update", async () => {
    const result = await repository.update(userId, { skype: "skype.test" });
    expect(result != null).eq(true);
  });

  it("should get count", async () => {
    const result = await repository.getCount("email", "test@mail.com");
    expect(result != null).eq(true);
  });

  it("should get many", async () => {
    const result = await repository.getMany(1, "user.name", "name", "ASC", 1);
    expect(result != null).eq(true);
  });

  it("should delete", async () => {
    await repository.delete(userId);
  });

  function sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
});
