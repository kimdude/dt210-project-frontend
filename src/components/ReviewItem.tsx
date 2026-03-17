import { useEffect, useState } from "react";
import type { ReviewFormData, ReviewFormErrors, ProfileReview, Review } from "../types/ReviewTypes"

import settingsIcon from "../assets/settingsIcon.svg"

import "./ReviewItem.css"
import useDelete from "../hooks/useDelete";
import usePut from "../hooks/usePut";

export const ReviewItem = ({review, updateList}: {review: Review | ProfileReview, updateList: () => void }) => {

    const formattedDate = review?.createdAt.slice(0,10);
    const stars: number[] = [1,2,3,4,5];

    //States
    const [ parent, setParent ] = useState<string>("public");
    const [ displayMenu, setDisplayMenu ] = useState<boolean>(false);
    const [ displayForm, setDisplayForm ] = useState<boolean>(false);
    const [ formData, setFormData ] = useState<ReviewFormData>({title: review.title, description: review.description, rating: review.rating});
    const [ formErrors, setFormErrors ] = useState<ReviewFormErrors>({});
    const [ message, setMessage ] = useState<string>("");

    //Hooks
    const { deleteError, data: dataDeleted, deleteData } = useDelete("https://dt210g-project-backend-hapi.onrender.com/games/reviews/" + review._id);
    const { data, error, loading, putData } = usePut<Review>("https://dt210g-project-backend-hapi.onrender.com/games/reviews/" + review._id);

    //Checking if parent is profile-page or not
    useEffect(() => {

        if(Object.keys(review).includes("gameDetails")) {
            setParent("private");
        }

    }, []);

    //Displaying message for limited time
    const newMessage = (text: string) => {
        setMessage(text);

        setTimeout(() => {
        setMessage("")
    }, 5000);
    }

    //Updating message when data changes or error during delete occurs
    useEffect(() => {
        if(data) {
            newMessage("Review has been updated!");
            editForm();
            updateList();
            return;
        }

        if(dataDeleted) {
            updateList();
            return;
        }

        if(deleteError) {
            newMessage("Couldn't delete review. Please try again later.");
        }

    }, [data, deleteError, dataDeleted]);

    //Toggle editing form
    const editForm = () => {
        setDisplayForm(!displayForm);
        setDisplayMenu(false);
    }

    //Validating form
    const validate = () => {
        const validationErrors: ReviewFormErrors = {};

        if(formData.title.length < 3 || formData.title.length > 20) {
            validationErrors.titleErr = "Title must be between 3-20 characters long.";
        }

        if(formData.description.length < 5) {
            validationErrors.descrErr = "Description must be atleast 5 characters long.";
        }

        if(formData.rating < 1 || formData.rating > 5) {
            validationErrors.ratingErr = "Rating must be on a scale of 1-5.";
        }

        return validationErrors;
    }

    //Updating review
    const updateReview = async(e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        setFormErrors({});
        setMessage("");

        //Validating inputs
        const validationErrors = validate();

        if(Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        await putData(formData);
    }

    return (
        <article className="reviewContainer">

            {/* Text for reviews displayed on profile */}
            { parent === "private" && 
                <div className="reviewProfileSettings">
                    <p>Game: { (review as ProfileReview).gameDetails?.name }</p>
                    <button onClick={() => setDisplayMenu(!displayMenu)}><img src={settingsIcon} alt="Hantera recension" width="30"/></button>

                    {/* Setting nav */}
                    {displayMenu &&
                        <nav className="reviewSettingsNav">
                            <ul>
                                <li onClick={() => editForm()}>Edit review</li>
                                <li onClick={() => deleteData()}>Delete review</li>
                            </ul>
                        </nav>
                    }
                </div> 
            }

            {/* Text for reviews on public pages */}
            { parent === "public" && <p>By <strong>{ (review as Review).displayName }</strong></p>}

            {/* Star icons */}
            <div className="reviewRatings">
                { stars.map((star) => (
                    <svg key={star} width="40px" height="40px" viewBox="0 0 24 24" fill={ review.rating >= star ? "#dd9804" : "#0a1331" } xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
                    </svg>
                ))}
            </div>
            
            {/* Review text */}
            <h3>{ review.title }</h3>
            <p>{ review.description }</p>
            <small>{ formattedDate }</small>
            
            {/* Editing-form */}
            {
                displayForm &&
                <form className="editReviewForm" onSubmit={updateReview}>
                    {/* Title */}
                    <div className="passwordTitle">
                        <h4>Edit review</h4>
                        <button type="button" onClick={() => setDisplayForm(false)}>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    
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

                    {/* Submit button */}
                    <input type="submit" className="btn" value="Uppdatera" disabled={loading}/>

                </form>
            }

            {/* Error message */}
            { deleteError && <small className="popup">{ deleteError }</small>}

            {/* Confirmation messages */}
            {message !== "" && <span className="popUp">{ message }</span>}

        </article>
    )
}
