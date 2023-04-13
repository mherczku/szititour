export type ApplicationOriginal = {
  id: number,
  accepted?: boolean,
  createdAt?: Date,
  updatedAt?: Date
  game: GameOriginal,
  team: TeamOriginal
}

export type TeamOriginal = {
  id: number,
  name?: string,
  email?: string,
  role?: "ROLE_ADMIN" | "ROLE_USER",
  img?: string,
  createdAt?: Date,
  updatedAt?: Date,
  answers?: [],
  applications?: [],
  members?: string[]
}

export type GameOriginal = {
  id: number,
  title?: string,
  dateStart?: Date,
  dateEnd?: Date,
  img?: string,
  createdAt?: Date,
  updatedAt?: Date,
  places?: [],
  applications?: []
}
