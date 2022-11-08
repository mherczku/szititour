
export interface Game {
  id: number,
  title: string,
  dateStart: string,
  dateEnd: string,
  img?: string,
  places: string[],
  applications: string[]
}
