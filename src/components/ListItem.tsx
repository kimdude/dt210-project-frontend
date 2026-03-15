
import { useNavigate } from "react-router-dom";
import type { SavedGame } from "../types/GameTypes"
import useDelete from "../hooks/useDelete";

export const ListItem = ({game}: {game: SavedGame}) => {

    const gameUrl = "/details/"+ game.name + "/" + game.gameId;
    
    //Hooks
    const navigate = useNavigate();
    const { deleteData, deleteError, data } = useDelete("https://dt210g-project-backend-hapi.onrender.com/saved/" + game._id);

    return (
        <article style={{display: "flex", justifyContent: "space-between", backgroundColor: "rgba(30,44,94,0.7)", padding: "5px 20px", borderRadius: "10px"}}>
            <h3 onClick={() => navigate( gameUrl, {state: { type: "Sparade spel" }})}>{ game.name }</h3>

            {/* Remove button */}
            <button className="crossBtn white" onClick={() => deleteData()}>
                <span></span>
                <span></span>
            </button>

            {deleteError && <small className="error">{ deleteError }</small>}
        </article>
    )
}
