import { useState } from "react";

export default function useDelete(url: string) : { data: string | null,loading: boolean, deleteError: string | null, deleteData: () => void } {
    
    //States
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteError, setdeleteError] = useState<string | null>(null);
    const [data, setData] = useState<string | null>(null);

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
                throw new Error("An error occurred. Please try again later");
            }

            await result.json();
            setData("Object removed");

        } catch (err) {

            //Checking if error message exists
            if(err instanceof Error) {
                return setdeleteError(err.message);
            }

            setdeleteError("An error occurred. Please try again later");

        }  finally {
            setLoading(false);

        }
    }

    return { data, loading, deleteError, deleteData }
}