import { PacmanLoader } from "react-spinners";
import { ListItem } from "../components/ListItem";
import useGet from "../hooks/useGet"
import type { List } from "../types/GameTypes"

export const ListGamesPage = () => {

  //Hooks
  const { fetchData, data, loading } = useGet<List>("https://dt210g-project-backend-hapi.onrender.com/saved", true);

  return (
    <section>

      {/* Title */}
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1>Sparade spel</h1>
        <small>Totalt: { data.list?.length }</small>
      </div>

      {/* Listing games */}
      { data.list?.length > 0 ?
        data.list?.map((game) => (
          <ListItem key={game._id} game={game} updateList={fetchData} />
        ))
        : <small>Inga sparade spel</small> 
      }

      {/* Loading icon */}
      { loading && <PacmanLoader color="#FEDE5D" className="spinner" />}
    </section>
  )
}
