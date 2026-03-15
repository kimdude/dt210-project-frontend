import { useEffect, useState } from 'react'
import usePost from '../hooks/usePost';
import { useAuth } from '../context/AuthContext';

import type { ReviewFormData }from '../types/ReviewTypes';
import type { ReviewFormErrors } from '../types/ReviewTypes';
import { Link } from 'react-router-dom';

export const ReviewForm = ({ gameId, updateList }: { gameId: number, updateList: () => void}) => {

    //States
    const [ formData, setFormData ] = useState<ReviewFormData>({title: "", description: "", rating: 0});
    const [ formErrors, setFormErrors ] = useState<ReviewFormErrors>({});
    const [ message, setMessage ] = useState<string>("");
    
    //Hooks
    const { postData, data, loading, error } = usePost("https://dt210g-project-backend-hapi.onrender.com/games/" + gameId, true);
    const { user } = useAuth();

    //Updating message when data changes
    useEffect(() => {
        if(data) {
            setMessage("Tack för din recension!");
            setFormData({title: "", description: "", rating: 0});
        }
    }, [data]);

    //Validating inputs
    const validate = () => {
        let validationErrors: ReviewFormErrors = {};

        if(formData.title.length < 3 || formData.title.length > 20) {
            validationErrors.titleErr = "Rubriken måste vara mellan 3-20 tecken lång.";
        }

        if(formData.description.length < 5) {
            validationErrors.descrErr = "Beskrivningen måste vara över 5 tecken lång.";
        }

        if(formData.rating < 1 || formData.rating > 5) {
            validationErrors.ratingErr = "Betyg måste vara på skalan 1-5";
        }

        return validationErrors;
    }

    //Sharing review
    const shareReview = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors({});
        setMessage("");

        //Validating inputs
        const validationErrors = validate();

        if(Object.keys(validationErrors).length > 0) {
            return setFormErrors(validationErrors);
        }

        //Posting review
        await postData(formData);
        updateList();

    }

    return (
        <form className="ReviewFormContainer" onSubmit={shareReview}>
            { !user && <div className="ReviewFormCover"><Link to="/login" className="spanBtn">Registrera dig för att lägga till en recension</Link></div>}
            <div>
                <h3>Lägg till recension</h3>
                
                <div>
                    <label htmlFor="titleInp"></label>
                    <input type="text" name="titleInp" id="titleInp" placeholder="Rubrik" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                    {formErrors.titleErr && <span className="error">{ formErrors.titleErr }</span>}
                </div>

                <div>
                    <label htmlFor="descrInp"></label>
                    <textarea name="descrInp" id="descrInp" placeholder="Beskrivning" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                    {formErrors.descrErr && <span className="error">{ formErrors.descrErr }</span>}
                </div>

                <div>
                    <label htmlFor="ratingInp">Betyg: </label>
                    <input type="number" name="ratingInp" id="ratingInp" placeholder="Betyg" value={formData.rating} onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})} />
                    {formErrors.ratingErr && <span className="error">{ formErrors.ratingErr }</span>}
                </div>

                {/* Errors and messages*/}
                {error && <span className="error">{ error }</span>}
                {message !== "" && <span className="confirm">{ message }</span>}

                {/* Submit button */}
                <input type="submit" className="btn" value="Dela recension" disabled={loading}/>
            </div>
        </form>
    )
}
