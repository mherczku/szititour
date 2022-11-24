import {Team} from "../team";

export interface AuthState {
  isLoggedIn: boolean,
  team: Team | null
}
