export enum AccountType {
  INDIVIDUAL = "individual",
  BUSINESS = "corporate",
}

export enum Product {
  STANDARD = "standard",
  PRO = "pro",
}

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  product: Product;
  type: AccountType;
  companyEntityType: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneAreaCode: string;
  phoneNumber: string;
  product: Product;
  type: AccountType;
  companyEntityType: string;
  recaptcha: string;
}
