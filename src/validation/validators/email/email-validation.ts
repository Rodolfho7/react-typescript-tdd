import { InvalidFieldError } from "../../errors/invalid-field-error";
import { FieldValidation } from "../../protocols/field-validation";

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: any): Error | null {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegex.test(input[this.field]) || !input[this.field] ? null : new InvalidFieldError();
  }
}
