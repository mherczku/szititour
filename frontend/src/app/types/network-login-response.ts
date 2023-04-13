import {Team} from "./team";

export type NetworkLoginResponse = {
  success: boolean,
  successMessage: string,
  errorMessage: string,
  team: Team
}
