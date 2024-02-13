import { type ConstructorDocument } from "../inputs/create-document.protocol";
import { Document } from "./document.vo";

export class CNPJDocument extends Document {
  constructor(props: ConstructorDocument) {
    super(props.document, props.typeClient);
  }

  validate(): boolean {
    const cnpj = this.document.replace(/[^\d]+/g, "");

    if (cnpj.length !== 14) return false;

    let totalLength = cnpj.length - 2;
    let cnpjWithoutDigits = cnpj.substring(0, totalLength);
    const verificationDigits = cnpj.substring(totalLength);
    let sum = 0;
    let pos = totalLength - 7;
    for (let i = totalLength; i >= 1; i--) {
      sum += Number(cnpjWithoutDigits.charAt(totalLength - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result.toString() !== verificationDigits.charAt(0)) return false;

    totalLength = totalLength + 1;
    cnpjWithoutDigits = cnpj.substring(0, totalLength);
    sum = 0;
    pos = totalLength - 7;
    for (let i = totalLength; i >= 1; i--) {
      sum += Number(cnpjWithoutDigits.charAt(totalLength - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result.toString() !== verificationDigits.charAt(1)) return false;

    return true;
  }
}
