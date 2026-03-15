import { useState } from "react"
import useGet from "../hooks/useGet";
import { useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

import type { GameDetails } from "../types/GameTypes";

import { Gallery } from "../components/Gallery";
import { ReviewItem } from "../components/ReviewItem";

import "./SinglePage.css"
import { ReviewForm } from "../components/ReviewForm";

export const SinglePage = () => {

  //Hooks
  const { _id } = useParams<{_id: string}>();
  const { data, loading, error, fetchData } = useGet<GameDetails>("https://dt210g-project-backend-hapi.onrender.com/games/" + _id);

  //States
  const [ saved, setSaved ] = useState<boolean>(false);
  const [ reachedEnd, setReachedEnd ] = useState<boolean>(false);

  //Calculating if reviews are scrolled to bottom
  const scrollToBottom = (e: HTMLElement) => {

    if(e.scrollTop >= (e.scrollHeight - e.offsetHeight - 150)) {
      setReachedEnd(true)
    } else {
      setReachedEnd(false)
    }
  }

  return (

    <section className="singleContainer">
      {/* Title */}
      <div className="singleTitle">
        <div>
          <h1>{ data.title }</h1>
          <p>Kategori: <strong>{ data.genre }</strong></p>
        </div>

        {/* Save game */}
        <div>
            <svg width="30px" height="30px" viewBox="0 0 16 16" fill={!saved ? "white" : "red"} xmlns="http://www.w3.org/2000/svg">
                <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" />
            </svg>
        </div>
      </div>

      {/* Spinner */}
      {loading && <PacmanLoader color="#FEDE5D" className="spinner" />}

      {/* Error */}
      {error && <p className="error">{ error }</p>}

      {/* Gallery container */}
      <div className="singleGallery">
        <Gallery images={data.screenshots} />
      </div>
      
      {/* Game details */}
      <div className="singleDetails">

        {/* Details */}
        <div className="singleDetailsDev">
          <small>Utgivningsdatum: <strong>{ data.releaseDate }</strong></small>
          <small>Utvecklare: <strong>{ data.developer }</strong></small>
          <small>Utgivare: <strong>{ data.publisher }</strong></small>
          <small>Plattform: <strong>{ data.platform }</strong></small>
        </div>

        {/* Title and score */}
        <div className="singleDetailsTitle">
          <div>
            <h2>Om spelet</h2>
            <p>Genomsnittsbetyg: {data.score ? <span>{ data.score } / 5</span> : <span className="missingData">Inga betygsättningar ännu</span> }</p>
          </div>

          {/* Score icon */}
          { data.score && 
            <div>
              <svg width="50px" height="50px" viewBox="0 0 15 15" fill={data.score >= 4 ? "#40C900" : data.score >= 3 ? "#EBB100" : "#eb5600"} style={{transform: data.score < 4 && data.score >= 3 ? "rotate(-90deg)" : data.score < 3 ? "rotate(180deg)" : "rotate(0deg)"}} xmlns="http://www.w3.org/2000/svg">
                <path d="M9.31176 2.99451C9.78718 2.04368 9.45039 0.887134 8.53883 0.340197C7.59324 -0.227152 6.3678 0.0621374 5.77577 0.992466L3 5.3544V12.5C3 13.8807 4.11929 15 5.5 15H10.5C11.2869 15 12.0279 14.6295 12.5 14L15 10.6667V7.5C15 6.11929 13.8807 5 12.5 5H8.30902L9.31176 2.99451Z"/>
                <path d="M0 5V15H1V5H0Z"/>
              </svg>
            </div>
          }
        </div>

        <p>{ data.description }</p>
      </div>

      {/* Reviews */}
      <div className="gameReviews" onScroll={(e) => scrollToBottom(e.currentTarget)}>
        <div className="gameReviewsTitle">
          <h2>Recensioner</h2>
          <small>Totalt: {data.reviews ? <span>{data.reviews.length}</span> : <span>0</span> } </small>
        </div>

        {/* Review articles */}
        {data.reviews?.map((item) => (
          <ReviewItem key={item._id} review={item} />
        ))}

        {data.reviews?.length === 0 && <span className="missingData">Inga recensioner ännu</span>}
        {!reachedEnd && <div className="scrollShadow"></div>}
      </div>

      
      {/* Form to add review */}
      <ReviewForm gameId={Number(_id)} updateList={fetchData} />

    </section>
  )
}
