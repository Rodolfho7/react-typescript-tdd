import { faker } from '@faker-js/faker';
import { CompareFieldsValidation } from "./compare-fields-validation";
import { CompareFieldError } from "../../errors/compare-field-error";

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare);
}

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = 'field';
    const fieldToCompare = 'fieldToCompare';
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({ [field]: 'correct_value', [fieldToCompare]: 'wrong_value' });
    expect(error).toEqual(new CompareFieldError());
  });

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({ [field]: 'correct_value', [fieldToCompare]: 'correct_value' });
    expect(error).toBeNull();
  });
})
