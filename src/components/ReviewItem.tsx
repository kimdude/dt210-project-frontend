import type { Review } from "../types/ReviewTypes"
import "./ReviewItem.css"

export const ReviewItem = ({review}: {review: Review}) => {

    const formattedDate = review?.createdAt.slice(0,10);

    return (
        <article className="reviewContainer">
            <div className="reviewRatings">

            </div>
            <h3>{ review.title }</h3>
            <p>{ review.description }</p>
            <small>{ formattedDate }</small>
        </article>
    )
}
