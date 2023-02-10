import {Team} from "../team";

export type AuthState = {
  isLoggedIn: boolean;
  team: Team | null;
}
