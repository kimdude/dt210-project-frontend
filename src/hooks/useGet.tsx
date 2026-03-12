import { useState, useEffect } from 'react'

export default function useGet<T> (url: string) : { data: T, error: string | null, loading: boolean, fetchData: () => void } {

    //States
    const [data, setData] = useState<T>([] as T);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    //Getting data upon mounted
    useEffect(() => {
        fetchData();
    }, [url]);

    //Getting data
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url);

            if(response.ok) {
                const result = await response.json() as T;
                setData(result);
            }
            
        } catch(err) {

            //Checking if error message exists
            if(err instanceof Error) {
                return setError(err.message);
            }

            setError("Ett fel har uppstått. Prova igen senare.");

        } finally {
            setLoading(false);

        }
    }

    return { data, error, loading, fetchData }
}