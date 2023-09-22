import { ClientData } from "../services/AuthService";
import { Application } from "./application";

export type Team = {
  id: number,
  name: string,
  email: string,
  nextEmail: string,
  img?: string,
  role: "ROLE_ADMIN" | "ROLE_USER",
  createdAt?: Date,
  updatedAt?: Date,
  applications?: Application[],
  members: string[],
  clients: ClientData[]
}

export type TeamUpdateProfile = {
  name: string,
  members: string[]
}

export type TeamUpdatePassword = {
  oldPassword: string,
  newPassword: string
}