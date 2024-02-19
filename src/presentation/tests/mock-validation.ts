import { Validation } from "../protocols/validation";

export class ValidationSpy implements Validation {
  errorMessage: string | null = null;
  fieldName: string = '';
  input!: object;

  validate(fieldName: string, input: object): string | null {
    this.fieldName = fieldName;
    this.input = input;
    return this.errorMessage;
  }
}
