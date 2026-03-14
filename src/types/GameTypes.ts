import type { Review } from "./ReviewTypes"

export interface GameBase {
  title: string,
  developer: string,
  publisher: string,
  short_description: string,
  genre: string,
  platform: string,
  release_date: string,
  thumbnail: string,
}

export interface GameOverview extends GameBase {
    id: number,
    game_url: string,
    freetogame_profile_url: string
}

export interface Screenshot {
    id: number,
    image: string
}

export interface GameDetails extends GameBase {
  externalId: string,
  description: string,
  screenshots: Screenshot[],
  score: number,
  reviews: Review[],
  saved: boolean
}

export interface SavedGame {
  gameId: number,
  name: string,
  score: number
}

export interface List {
  list: SavedGame[]
}