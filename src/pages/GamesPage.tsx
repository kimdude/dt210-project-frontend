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
  const [ searchPhrase, setSearchPhrase ] = useState<string>("");
  const [ filteredGames, setFilteredGames ] = useState<GameOverview[]>([]);

  const url: string = "https://dt210g-project-backend-hapi.onrender.com/games" + query;

  //Hooks
  const { fetchData, data, loading, error } = useGet<GameOverview[]>(url);

  //Setting games array to fetched data when data changes
  useEffect(() => {
    setFilteredGames(data || []);
  }, [data]);

  //Fetching data when url changes
  useEffect(() => {
    fetchData();
  }, [url]);

  //Search by title
  const search = () => {

    if(searchPhrase === "") {
      setFilteredGames(data);
      return;
    }

    const searchResult = data.filter((game) => game.title.toUpperCase().includes(searchPhrase.toUpperCase()));
    setFilteredGames(searchResult);
  }

  return (
    <section>

      {/* Search bar */}
      <div className="gameSearchContainer">
        <label htmlFor="searchBar"></label>
        <input type="text" id="searchBar" placeholder="Sök spel" onChange={(e) => setSearchPhrase(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} />
        <button className="btn" onClick={search}>Sök</button>
      </div>

      {/* All games */}
      <div className="gameTitle">
        <h1>Datorspel</h1>
        <small onClick={() => setDisplayFilters(!displayFilters)}>Filter</small>
      </div>

      {/* Filters */}
      {displayFilters && <Filters setQuery={setQuery} />}

      {/* Displaying games */}
      <div className="gamesGrid">
        {filteredGames && filteredGames.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>

      {/* Spinner */}
      {loading && <PacmanLoader color="#FEDE5D" className="spinner" />}

      {/* Message */}
      {filteredGames.length === 0 && !loading && <p>Inga spel hittades.</p>}

      {/* Error */}
      {error && <p>{ error }</p>}
      
    </section>
  )
}
