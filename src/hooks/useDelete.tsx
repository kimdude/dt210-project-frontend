import { useState } from "react";

export default function useDelete(url: string) : { loading: boolean, deleteError: string | null, deleteData: () => void } {
    
    //States
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteError, setdeleteError] = useState<string | null>(null);

    const token: string | null = localStorage.getItem("token");

    //Deleting item
    const deleteData = async() => {

        setLoading(true);

        try {
            const result = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if(!result.ok) {
                throw new Error("Ett fel uppstod. Prova igen senare.");
            }

        } catch (err) {

            //Checking if error message exists
            if(err instanceof Error) {
                return setdeleteError(err.message);
            }

            setdeleteError("Ett fel har uppstått. Prova igen senare.");

        }  finally {
            setLoading(false);

        }
    }

    return { loading, deleteError, deleteData }
}