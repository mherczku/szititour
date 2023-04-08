import {Team} from "../../types/team";

export type AuthState = {
  isLoggedIn: boolean;
  team: Team | null;
}
