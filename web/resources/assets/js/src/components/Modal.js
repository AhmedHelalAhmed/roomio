import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Modal from 'react-modal';
import { Link } from 'react-router';
import CreateTopic from './CreateTopic';


const customStyles = {
  content: {
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '400px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const loginStyle = {
  content: {
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '600px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class ModalContainer extends Component {
  render() {
    return this.props.type === 'topic'
      ? <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Topic"
      >
        <FontAwesome
          name="times"
          className="closeModal"
          onClick={this.props.closeModal}
        />
        <h2 ref="subtitle">{this.props.topic.title}</h2>
        <h4 ref="subtitle">Description</h4>
        <p>{this.props.topic.description}</p>
      </Modal>
      :  this.props.type === 'room' ? <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Room"
      >
        <FontAwesome
          name="times"
          className="closeModal"
          onClick={this.props.closeModal}
        />
        <h2 className="adminTag" ref="subtitle">
            Admin 
            <FontAwesome name='user' className='usSep' />
            <Link to={`/user/${this.props.admin}`}>
              {this.props.admin}
            </Link>
        </h2>
        <h4 ref="subtitle">Description</h4>
        <p>{this.props.description}</p>
      </Modal> : 
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        style={loginStyle}
        contentLabel="create"
      >
        <FontAwesome
          className='topicEx'
          name="times"
          onClick={this.props.closeModal}
        />
        <CreateTopic room={this.props.room}/>
      </Modal>
  }
}

export default ModalContainer;
