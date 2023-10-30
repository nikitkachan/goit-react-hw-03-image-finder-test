import React, { Component } from 'react';
import { StyledModal } from './Modal.styled';

export default class Modal extends Component {
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleIncrementProduct = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <StyledModal onClick={this.handleOverlayClick}>
        <div className="modal">
                <img src={this.props.modalData.url} alt={this.props.modalData.alt} />
        </div>
      </StyledModal>
    );
  }
}