import { Component } from 'react'
import { StyledApp } from './App.styled'
import { SearchBar } from './Searchbar/Searchbar'
import { fetchImages } from './Api/api'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem'
import Loader from './Loader/Loader'
import Button from './Button/Button'
import Modal from './Modal/Modal'

export class App extends Component {
  
  state = {
    searchWord: null,
    images: null,
    page: 1,
    isLoading: false,
    isShown: false,
    isOpenModal: false,
    modalData: null,
    error: null,
  }


  componentDidUpdate(_, prevState) {
    if (prevState.searchWord !== this.state.searchWord) {
      this.fetchImagesFirstTime();
      this.setState({
        page: 1
      })
    }
    if (prevState.page !== this.state.page) {
      this.fetchImagesLoadMore();
    }
  }

  handleKeyDown = e => {
      if (e.code === 'Escape') {
        this.props.closeModal();
      }
  };
  
openModal = data => {
    this.setState({
      isOpenModal: true,
      modalData: data,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      modalData: null,
    });
  };

  onSubmit = searchWord =>
    this.setState({
      searchWord: searchWord,
    });
  
  fetchImagesLoadMore = async () => {
    try {
      this.setState({
      isLoading: true,
      isShown: false,
    });
    
      console.log(this.state.page);
      
      const result = await fetchImages(this.state.searchWord, this.state.page)
    this.setState(prevState => ({
      images: [...prevState.images, ...result.hits],
      isShown: true,
    }));
    if (result.hits.length <= 11) {
      this.setState({
        isShown: false,
      })
    }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
    
  }

  fetchImagesFirstTime = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const result = await fetchImages(this.state.searchWord, this.state.page);
      
      this.setState({
        images: result.hits,
      });
      if (result.hits.length >= 12) {
        this.setState({
        isShown: true,
      });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }
  
  onLoadMoreHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  render() {
    return (
      <StyledApp >
        <SearchBar onSubmit={this.onSubmit} />
         {this.state.error !== null && (
          <p className="error-bage">
            Oops, some error occured... Error message: {this.state.error}
          </p>
        )}
        <ImageGallery>
          {this.state.images !== null && <ImageGalleryItem data={this.state.images} openModal={this.openModal} />}
        </ImageGallery> 
         {this.state.isLoading && <Loader />}
        {this.state.images !== null && this.state.isShown && <Button onLoadMoreHandler={this.onLoadMoreHandler} />}
        {this.state.isOpenModal && (
          <Modal
            closeModal={this.closeModal}
            modalData={this.state.modalData}
          />
        )}
      </StyledApp>
    )
  }
}
