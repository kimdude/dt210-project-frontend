import { useState, useEffect } from 'react'

export default function useGet<T> (url: string, auth?: boolean) : { data: T, error: string | null, loading: boolean, fetchData: () => void } {

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

            let token;
            let options: Record<string, string> = {};

            //Setting headers if call needs authentication
            if(auth) {
                token = localStorage.getItem("token");
                options = {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }

            const response = await fetch(url, {
                headers: options
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

            setError("An error occurred. Please try again later");

        } finally {
            setLoading(false);

        }
    }

    return { data, error, loading, fetchData }
}