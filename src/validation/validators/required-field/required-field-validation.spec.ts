import { RequiredFieldError } from "../../errors/required-field-error";
import { RequiredFieldValidation } from "./required-field-validation";
import { faker } from '@faker-js/faker';

const makeSut = (field: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(field);
}

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return falsy if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.word.words(1) });
    expect(error).toBeNull();
  });
})
