import type { SavedGame } from "./GameTypes"

export interface Review {
    _id: string,
    gameId: string,
    userId: string,
    rating: number,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
}

export interface ReviewFormData {
    title: string,
    description: string,
    rating: number
}

export interface ReviewFormErrors {
    titleErr?: string,
    descrErr?: string,
    ratingErr?: string,
    postErr?: string
}

export interface ProfileReview extends Review {
    gameDetails: SavedGame
}