
export interface Application {
  id: number,
  teamId: number,
  gameId: number,
  createdAt: Date,
  updatedAt: Date,
  accepted?: boolean,
  teamName: string
}
