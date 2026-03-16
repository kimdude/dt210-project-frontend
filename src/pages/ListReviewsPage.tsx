import { PacmanLoader } from "react-spinners";
import { ReviewItem } from "../components/ReviewItem";
import useGet from "../hooks/useGet";
import type { ProfileReview } from "../types/ReviewTypes";

export const ListReviewsPage = () => {

  const { fetchData, data, loading } = useGet<ProfileReview[]>("https://dt210g-project-backend-hapi.onrender.com/profile/reviews", true);
  
  return (
    <section>

      {/* Title */}
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1>Dina recensioner</h1>
        <small>Totalt: { data?.length }</small>
      </div>

      { data.length > 0 ?
          data.map((review: any) => (
              <ReviewItem key={review._id} review={review} updateList={fetchData}/>
          )) 
          : <small>Inga delade recensioner</small>
      }

      { loading &&  <PacmanLoader color="#FEDE5D" className="spinner" /> }
    </section>
  )
}
