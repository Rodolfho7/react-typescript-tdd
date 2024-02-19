import { Authentication } from "../usecases/authentication";
import { faker } from '@faker-js/faker';

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const mockAccountModel = (): Authentication.Model => ({
  accessToken: faker.database.mongodbObjectId(),
  name: faker.person.firstName()
});
