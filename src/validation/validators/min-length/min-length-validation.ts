import { InvalidFieldError } from "../../errors/invalid-field-error";
import { FieldValidation } from "../../protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}
  
  validate(input: any): Error | null {
    return (input[this.field] as string)?.length >= this.minLength ? null : new InvalidFieldError();
  }
}
