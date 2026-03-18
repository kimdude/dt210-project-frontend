
import { useNavigate } from "react-router-dom";
import type { SavedGame } from "../types/GameTypes"
import useDelete from "../hooks/useDelete";
import { useEffect } from "react";

export const ListItem = ({game, updateList}: {game: SavedGame, updateList: () => void}) => {

    const gameUrl = "/details/"+ game.name + "/" + game.gameId;
    
    //Hooks
    const navigate = useNavigate();
    const { deleteData, deleteError, data } = useDelete("https://dt210g-project-backend-hapi.onrender.com/saved/" + game.gameId);

    useEffect(() => {
        updateList();
    }, [data]);

    return (
        <article style={{display: "flex", justifyContent: "space-between", backgroundColor: "rgba(30,44,94,0.7)", padding: "5px 20px", margin: "10px 0px", borderRadius: "10px"}}>
            <h3 onClick={() => navigate( gameUrl, {state: { type: "Sparade spel", title: game.name}})}>{ game.name }</h3>

            {/* Remove button */}
            <button className="crossBtn white" onClick={() => deleteData()} aria-label="Remove from list" title="Remove">
                <span></span>
                <span></span>
            </button>

            {deleteError && <small className="error">{ deleteError }</small>}
        </article>
    )
}
