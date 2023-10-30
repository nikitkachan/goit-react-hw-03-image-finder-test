import { StyledImageGallery } from "./ImageGallery.styled"


export const ImageGallery = ({children}) => {
    return (
        <StyledImageGallery className="gallery">
            {children}
        </StyledImageGallery>
    )
}