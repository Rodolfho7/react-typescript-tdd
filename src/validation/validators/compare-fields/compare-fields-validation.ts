import { CompareFieldError } from "../../errors/compare-field-error";
import { FieldValidation } from "../../protocols/field-validation";

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    readonly fieldToCompare: string
  ) {}

  validate(input: any): Error | null {
    return input[this.field] == input[this.fieldToCompare] ? null : new CompareFieldError();
  }
}
