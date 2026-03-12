import { useState } from 'react'


export default function usePut<T> (url: string) : { data: T, error: string | null, loading: boolean, putData: (item: any) => Promise<void> } {

    //States
    const [data, setData] = useState<T>([] as T);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null);

    const token: string | null = localStorage.getItem("token");

    //Updating item
    const putData = async(item: any) => {
        try {
            setLoading(true);
            setError(null);

            //Fetch api
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if(response.ok) {
                const result = await response.json() as T;
                setData(result);
            }
            
        } catch(err) {

            //Checking if error message exists
            if(err instanceof Error) {
                return setError(err.message);
            }

            setError("Ett fel uppstod. Prova igen senare.");

        } finally {
            setLoading(false);
        }
        
    }

    return { data, error, loading, putData }
}