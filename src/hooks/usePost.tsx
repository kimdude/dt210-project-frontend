import { useState } from 'react'


export default function usePost<T> (url: string, auth?: boolean) : { data: T | null, error: string | null, loading: boolean, postData: (item: any) => Promise<void> } {

    //States
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null);

    //Posting item
    const postData = async(item: any) => {

        try {
            setLoading(true);
            setError(null);
            setData(null);

            let token;
            let options: Record<string, string> = {
                    "Content-Type": "application/json"
                }

            //Setting headers if call needs authentication
            if(auth) {
                token = localStorage.getItem("token");
                options = {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }

            console.log(options)

            //Fetch API
            const response = await fetch(url, {
                method: "POST",
                headers: options,
                body: JSON.stringify(item)
            });

            if(!response.ok) {
                console.log(response)
                throw new Error("Ett fel har uppstått. Prova igen senare.");
            }
            
            const result = await response.json() as T;
            setData(result);
            
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

    return { data, error, loading, postData }
}