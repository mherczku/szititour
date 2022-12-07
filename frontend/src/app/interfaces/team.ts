

export interface Team {
  id: number,
  name: string,
  email: string,
  img?: string,
  role: 'ROLE_ADMIN' | 'ROLE_USER',
  createdAt?: Date,
  updatedAt?: Date,
  applications?: any[],
  members?: string[]
}
