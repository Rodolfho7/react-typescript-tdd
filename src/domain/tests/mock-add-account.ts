import { AddAccount } from "../usecases/add-account";
import { faker } from '@faker-js/faker';

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    name: faker.word.words(),
    password,
    passwordConfirmation: password
  }
};
