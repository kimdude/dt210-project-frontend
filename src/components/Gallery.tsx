import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import "yet-another-react-lightbox/styles.css"
import type { Screenshot } from '../types/GameTypes';

import "./Gallery.css"

export const Gallery = ({images}: {images: Screenshot[]}) => {

    const [ open, setOpen ] = useState(false);
    const [ showImage, setShowImage ] = useState<number>(0);

    //Setting images 
    const slides = images?.map((picture, index) => (
        {
            src: picture.image,
            alt: "Bild " + index
        }
    ));

    const openSlideShow = (index: number) => {
        console.log("got here")
        setShowImage(index);
        setOpen(true)
    }

    return (
        <div className="galleryContainer">

            {/* Image gallery */}
            {images?.slice(0,3).map((picture, index) => (
                <div key={index}>
                    <img src={picture.image} alt={"Bild " + index} onClick={() => openSlideShow(index)}/>
                </div>
            ))}

            {images?.length > 3 && <div className="galleryMore" onClick={() => openSlideShow(0)}><p>+{ images.length - 3}</p></div>}

            <Lightbox open={open} close={() => setOpen(false)} slides={ slides } index={showImage} />
        </div>
    )
}
