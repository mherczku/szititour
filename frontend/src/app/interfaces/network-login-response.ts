import {Team} from "./team";

export interface NetworkLoginResponse {
  success: boolean,
  successMessage: string,
  errorMessage: string,
  team: Team
}
