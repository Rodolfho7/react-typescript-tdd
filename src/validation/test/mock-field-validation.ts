import { FieldValidation } from "../protocols/field-validation";

export class FieldValidationSpy implements FieldValidation {
  error: Error | null = null;
  input!: object;
  constructor(readonly field: string) {}
  validate(input: object): Error | null {
    this.input = input;
    return this.error;
  }
}
