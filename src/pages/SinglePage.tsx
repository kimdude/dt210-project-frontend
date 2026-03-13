import { useState } from "react"
import useGet from "../hooks/useGet";
import { useParams } from "react-router-dom";

import type { GameDetails } from "../types/GameTypes";

import "./SinglePage.css"
import { Gallery } from "../components/Gallery";

export const SinglePage = () => {

  //Hooks
  const { _id } = useParams<{_id: string}>();
  const { data, loading, error } = useGet<GameDetails>("https://dt210g-project-backend-hapi.onrender.com/games/" + _id);

  //States
  const [ saved, setSaved ] = useState<boolean>(false);


  return (

    <section className="singleContainer">
      <div className="singleTitle">
        <h1>{ data.title }</h1>

        {/* Save game */}
        <div>
            <svg width="25px" height="25px" viewBox="0 0 16 16" fill={!saved ? "white" : "red"} xmlns="http://www.w3.org/2000/svg">
                <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" />
            </svg>
        </div>
      </div>

      {/* Gallery container */}
      <div className="singleGallery">
        <Gallery images={data.screenshots} />
      </div>
      
      {/* Game details */}
      <div className="singleDetails">
        <h2>Om spelet</h2>
        <p>{ data.score }</p>
        <p>{ data.description }</p>
      </div>


    </section>
  )
}
