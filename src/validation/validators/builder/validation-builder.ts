import { FieldValidation } from "../../protocols/field-validation";
import { CompareFieldsValidation } from "../compare-fields/compare-fields-validation";
import { EmailValidation } from "../email/email-validation";
import { MinLengthValidation } from "../min-length/min-length-validation";
import { RequiredFieldValidation } from "../required-field/required-field-validation";

export class ValidationBuilder {
  private constructor(
    private fieldName: string,
    private validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    const requiredFieldValidation = new RequiredFieldValidation(this.fieldName);
    this.validations.push(requiredFieldValidation);
    return this;
  }

  email(): ValidationBuilder {
    const emailValidation = new EmailValidation(this.fieldName);
    this.validations.push(emailValidation);
    return this;
  }

  minLength(length: number): ValidationBuilder {
    const minLengthValidation = new MinLengthValidation(this.fieldName, length);
    this.validations.push(minLengthValidation);
    return this;
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    const compareFieldValidation = new CompareFieldsValidation(this.fieldName, fieldToCompare);
    this.validations.push(compareFieldValidation);
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
