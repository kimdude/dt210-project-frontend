import { useEffect, useState } from "react"
import useGet from "../hooks/useGet"

//Components
import { Filters } from "../components/Filters"
import { GameItem } from "../components/GameItem"

//Interfaces
import type { GameOverview } from "../types/GameTypes"

import "./GamesPage.css"
import PacmanLoader from "react-spinners/PacmanLoader"

export const GamesPage = () => {

  //States
  const [ displayFilters, setDisplayFilters ] = useState<boolean>(false);
  const [ query, setQuery ] = useState<string>(""); //Queries set by child comp

  const url: string = "https://dt210g-project-backend-hapi.onrender.com/games" + query;

  console.log(url)

  //Hooks
  const { fetchData, data, loading, error } = useGet<GameOverview[]>(url);

  //Fetching data when url changes
  useEffect(() => {
    fetchData();
  }, [url])

  return (
    <section>

      {/* Search bar */}
      <div className="gameSearchContainer">
        <label htmlFor="searchBar"></label>
        <input type="text" id="searchBar" placeholder="Sök spel" />
        <button className="btn">Sök</button>
      </div>

      {/* All games */}
      <div className="gameTitle">
        <h1>Datorspel</h1>
        <small onClick={() => setDisplayFilters(!displayFilters)}>Filtrera</small>
      </div>

      {/* Filters */}
      {displayFilters && <Filters setQuery={setQuery} />}

      {/* Displaying games */}
      <div className="gamesGrid">
        {data && data.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>

      {/* Spinner */}
      {loading && <PacmanLoader color="#FEDE5D" className="spinner" />}
      
    </section>
  )
}
