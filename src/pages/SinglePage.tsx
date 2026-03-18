import { useEffect, useRef, useState } from "react"
import useGet from "../hooks/useGet";
import { Link, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

import type { GameDetails } from "../types/GameTypes";

import { Gallery } from "../components/Gallery";
import { ReviewItem } from "../components/ReviewItem";

import "./SinglePage.css"
import { ReviewForm } from "../components/ReviewForm";
import usePost from "../hooks/usePost";
import useDelete from "../hooks/useDelete";
import { useAuth } from "../context/AuthContext";

export const SinglePage = () => {

  //States
  const [ message, setMessage ] = useState<string>("");
  const [ reachedEnd, setReachedEnd ] = useState<boolean>(true);
  const reviewContainer = useRef<HTMLDivElement | null>(null);

  //Hooks
  const { _id } = useParams<{_id: string}>();
  const { user } = useAuth();

  const { data, loading, error, fetchData } = useGet<GameDetails>("https://dt210g-project-backend-hapi.onrender.com/games/" + _id, true);
  const { postData, error: saveError } = usePost("https://dt210g-project-backend-hapi.onrender.com/saved/" + _id, true);
  const { deleteData, deleteError } = useDelete("https://dt210g-project-backend-hapi.onrender.com/saved/" + data.externalId);

  
  useEffect(() => {
    
    //Checking if reference is set to div
    if(reviewContainer.current) {

      //Calculating if content is bigger then container
      const containerHeight = reviewContainer.current.offsetHeight;
      const contentHeight = reviewContainer.current.scrollHeight;
      const overflow = contentHeight - containerHeight;

      if(overflow > 0) {
        setReachedEnd(false);
      }

    }

  }, [data]);

  //Listening to errors during save or delete from list
  useEffect(() => {

    if(saveError !== null && saveError !== "" ) {
      newMessage("Couldn't save game to list. Please try again later.");
    }

    if(deleteError !== null && deleteError !== "") {
      newMessage("Couldn't remove game from list. Please try again later.");
    }

  }, [saveError, deleteError]);

  //Calculating if reviews are scrolled to bottom
  const scrollToBottom = (e: HTMLElement) => {

    const scrolled = e.scrollTop;
    const overflow = e.scrollHeight - e.offsetHeight;
    const nearEnd = overflow - 130;

    if(scrolled >= nearEnd) {
      setReachedEnd(true);
    } else {
      setReachedEnd(false);
    }
  }

  //Saving or removing from list
  const saveGame = async() => {

    if(!user) {
      newMessage("Log in or register to save ►");
      return;
    }

    if(data.saved === false) {
      await postData(null);
      await fetchData();

    } else {
      await deleteData();
      await fetchData();
    }
  }

  //Displaying message for limited time
  const newMessage = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("")
  }, 5000);
  }

  return (

    <section className="singleContainer">
      {/* Title */}
      <div className="singleTitle">
        <div>
          <h1>{ data.title }</h1>
          <p>Category: <strong>{ data.genre }</strong></p>
        </div>

        {/* Save game */}
        <div onClick={() => saveGame()} className="singlePageSave">
            <svg width="30px" height="30px" viewBox="0 0 16 16" fill={!data.saved ? "white" : "red"} xmlns="http://www.w3.org/2000/svg">
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
          <small>Released: <strong>{ data.releaseDate }</strong></small>
          <small>Developer: <strong>{ data.developer }</strong></small>
          <small>Publisher: <strong>{ data.publisher }</strong></small>
          <small>Platform: <strong>{ data.platform }</strong></small>
        </div>

        {/* Title and score */}
        <div className="singleDetailsTitle">
          <div>
            <h2>Summary</h2>
            <p>Average rating: {data.score ? <span>{ data.score } / 5</span> : <span className="missingData">No ratings yet</span> }</p>
          </div>

          {/* Score icon */}
          { data.score !== undefined && data.score > 0 && (
            <div>
              <svg width="50px" height="50px" viewBox="0 0 15 15" fill={data.score >= 4 ? "#40C900" : data.score >= 2.5 ? "#EBB100" : "#eb5600"} style={{transform: data.score < 4 && data.score >= 2.5 ? "rotate(-90deg)" : data.score < 3 ? "rotate(180deg)" : "rotate(0deg)"}} xmlns="http://www.w3.org/2000/svg">
                <path d="M9.31176 2.99451C9.78718 2.04368 9.45039 0.887134 8.53883 0.340197C7.59324 -0.227152 6.3678 0.0621374 5.77577 0.992466L3 5.3544V12.5C3 13.8807 4.11929 15 5.5 15H10.5C11.2869 15 12.0279 14.6295 12.5 14L15 10.6667V7.5C15 6.11929 13.8807 5 12.5 5H8.30902L9.31176 2.99451Z"/>
                <path d="M0 5V15H1V5H0Z"/>
              </svg>
            </div>)
          }
        </div>

        <p className="singlePageFullDescr">{ data.description }</p>
      </div>

      {/* Reviews */}
      <div className="gameReviews" onScroll={(e) => scrollToBottom(e.currentTarget)} ref={reviewContainer}>
        <div className="gameReviewsTitle">
          <h2>Reviews</h2>
          <small>Total: {data.reviews ? <span>{data.reviews.length}</span> : <span>0</span> } </small>
        </div>

        {/* Review articles */}
        {data.reviews?.map((item) => (
          <ReviewItem key={item._id} review={item} updateList={fetchData} />
        ))}

        {data.reviews?.length === 0 && <span className="missingData">No reviews yet</span>}

        {/* Shadow if more reviews are below */}
        {!reachedEnd && <div className="scrollShadow"></div>}
      </div>
      
      {/* Form to add review */}
      <ReviewForm gameId={Number(_id)} updateList={fetchData} />

      {/* Confirmation messages */}
      { message === "Log in or register to save ►" ? <Link to="/login" className="popUp">{ message } </Link> : message !== "" && 
        <span className="popUp">{ message }</span>}

    </section>
  )
}
