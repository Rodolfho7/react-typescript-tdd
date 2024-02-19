import { faker } from '@faker-js/faker';
import { MinLengthValidation } from './min-length-validation';
import { InvalidFieldError } from '../../errors/invalid-field-error';

const makeSut = (field: string, minLength: number): MinLengthValidation => {
  return new MinLengthValidation(field, minLength);
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const minLength = 4;
    const field = faker.database.column();
    const sut = makeSut(field, minLength);
    const error = sut.validate({ [field]: '123' });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if value is valid', () => {
    const minLength = 4;
    const field = faker.database.column();
    const sut = makeSut(field, minLength);
    const error = sut.validate({ [field]: '1234' });
    expect(error).toBeNull();
  });
})
