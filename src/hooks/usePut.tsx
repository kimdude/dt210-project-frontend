import { useState } from 'react'


export default function usePut<T> (url: string) : { data: T | null, error: string | null, loading: boolean, putData: (item: any) => Promise<void> } {

    //States
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null);

    //Updating item
    const putData = async(item: any) => {
        
        const token: string | null = localStorage.getItem("token");

        try {
            setLoading(true);
            setError(null);
            setData(null);

            //Fetch api
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if(!response.ok) {
                throw new Error("An error occurred. Please try again later");
            }

            const result = await response.json() as T;
            setData(result);
            
        } catch(err) {

            //Checking if error message exists
            if(err instanceof Error) {
                return setError(err.message);
            }

            setError("An error occurred. Please try again later");

        } finally {
            setLoading(false);
        }
        
    }

    return { data, error, loading, putData }
}