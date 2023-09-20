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

export type UpdateTeam = {
  name?: string,
  email?: string,
  password?: string,
  passwordBefore?: string,
  img?: string,
  members?: string[]
}