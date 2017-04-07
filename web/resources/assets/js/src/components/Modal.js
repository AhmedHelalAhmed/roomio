import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Modal from 'react-modal';
import { Link } from 'react-router';

const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '400px',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class ModalContainer extends Component {
  
  render(){
      return (
        this.props.type === 'topic' ? 
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles}
          contentLabel="Topic"
        >
        <FontAwesome name="times" className='closeModal' onClick={this.props.closeModal} />
        <h2 ref="subtitle">{this.props.topic.title}</h2>
        <h4 ref="subtitle">Description</h4>
        <p>{this.props.topic.description}</p>
      </Modal> : 
      <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles}
          contentLabel="Topic"
        >
        <FontAwesome name="times" className='closeModal' onClick={this.props.closeModal} />
        <h2 className="adminTag" ref="subtitle">Admin : 
        <Link to={`/user/${this.props.admin}`}>
          {this.props.admin}</Link>
        </h2>
        <h4 ref="subtitle">Description</h4>
        <p>{this.props.description}</p>
      </Modal>
      )
  }

}


export default ModalContainer;