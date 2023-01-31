import { TestUtils } from "../../../../shared/tests/TestUtils";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { Statement } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase"

let getBalanceUseCase: GetBalanceUseCase;
let createStatementUseCase: CreateStatementUseCase;
let usersRepository: InMemoryUsersRepository;
let statementsRepository: InMemoryStatementsRepository;

describe("Get Balance", ()=>{
  beforeAll(()=>{
    usersRepository = new InMemoryUsersRepository();
    statementsRepository = new InMemoryStatementsRepository();
    getBalanceUseCase = new GetBalanceUseCase(statementsRepository, usersRepository);
    createStatementUseCase = new CreateStatementUseCase(usersRepository, statementsRepository);
  });

  it("should be able to list all deposit and withdraw and also total balance from a valid user", async()=>{
    const user = TestUtils.giveMeAValidUser();
    await usersRepository.create(user);
    const statement = TestUtils.giveMeAValidStatement(user.id as string);
    await createStatementUseCase.execute(statement);

    const response = await getBalanceUseCase.execute({
      user_id: user.id as string
    });

    expect(response).toHaveProperty("statement");
    expect(response).toHaveProperty("balance");
  });

  it("should not be able to find the balance information from a inexistent user", async () =>{
    expect(async ()=>{
      await getBalanceUseCase.execute({
        user_id: ''
      });
    }).rejects.toBeInstanceOf(GetBalanceError);
  })

  afterEach(async ()=>{
    await usersRepository.reset();
    await statementsRepository.reset();
  });
})
