
import { BsSearch } from 'react-icons/bs';
import { StyledSearchBar } from './Searchbar.styled';
import Notiflix from 'notiflix';

export const SearchBar = ({ onSubmit }) => {
    
   
    const handleInputSubmit = (e) => {
        e.preventDefault();
        const searchWord = e.currentTarget[1].value;
        if (searchWord.trim() === "") {
            Notiflix.Notify.failure('Please, enter something!');
            return
        }
    
        onSubmit(searchWord);
    }

    return (
        <StyledSearchBar>
            <form onSubmit={handleInputSubmit} className="form">
                <button type="submit" className="button">
                <BsSearch />
                </button>

                <input
                className="input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
            </form>
      </StyledSearchBar>
    )
  }

