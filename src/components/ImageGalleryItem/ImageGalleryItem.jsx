
import { StyledImageGalleryItem } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ data, openModal }) => {
    
    if (data) {
    return (
            
            data.map((img) => {
                return (
                    <StyledImageGalleryItem className="gallery-item" key={img.id} onClick={() => openModal({ url: img.largeImageURL, alt: img.tags })} >
                        <img src={img.webformatURL} alt={img.tags} id={img.id} className="image"/>
                    </StyledImageGalleryItem>
                    )
                 }
            )
    ) 
}

}
