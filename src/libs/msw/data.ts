import { UserInfo, Product, AccountType } from "~/api";

export const userInfo = (): UserInfo => ({
  id: "123",
  product: Product.STANDARD,
  email: "j.smith@smith.com",
  firstName: "John",
  lastName: "Smith",
  type: AccountType.INDIVIDUAL,
  companyEntityType: "test",
});
