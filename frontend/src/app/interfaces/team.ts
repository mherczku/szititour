

export interface Team {
  id: number,
  name: string,
  email: string,
  img?: string,
  admin: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  applications?: any[],
  members?: string[]
}
