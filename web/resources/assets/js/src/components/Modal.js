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

const customStylesFadeOut = {
  content: {
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '400px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    animation: 'fadeOut .3s',
    animationFillMode: 'forwards',
  },
};

const loginStyle = {
  content: {
    top: '48%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    //width: '600px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class ModalContainer extends Component {
  state = {
    closing: false,
  };

  closeModalFirst = () => {
    this.setState({ closing: true });
    setTimeout(
      () => {
        this.setState({ closing: false });
        this.props.closeModal();
      },
      300,
    );
  };

  render() {
    return this.props.type === 'topic'
      ? <div
          className={
            this.state.closing ? 'customBackdropFaded' : 'customBackdrop'
          }
        >
          <Modal
            isOpen={this.props.modalIsOpen}
            onRequestClose={this.closeModalFirst}
            style={this.state.closing ? customStylesFadeOut : customStyles}
            contentLabel="Topic"
          >
            <FontAwesome
              name="times"
              className="closeModal"
              onClick={this.closeModalFirst}
            />
            <h2 ref="subtitle">{this.props.topic.title}</h2>
            <h4 ref="subtitle">Description</h4>
            <p>{this.props.topic.description}</p>
          </Modal>
        </div>
      : this.props.type === 'room'
          ? <div
              className={
                this.state.closing ? 'customBackdropFaded' : 'customBackdrop'
              }
            >
              <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.closeModalFirst}
                style={this.state.closing ? customStylesFadeOut : customStyles}
                contentLabel="Room"
              >
                <FontAwesome
                  name="times"
                  className="closeModal"
                  onClick={this.closeModalFirst}
                />
                <h2 className="adminTag" ref="subtitle">
                  <FontAwesome name="user" className="usSep" />
                  <Link to={`/user/${this.props.admin}`}>
                    {this.props.admin}
                  </Link>
                  <span className="modalAdmin">Room Admin</span>
                </h2>
                <h4 ref="subtitle">Description</h4>
                <p>{this.props.description}</p>
              </Modal>
            </div>
          : <div
              className={
                this.state.closing ? 'customBackdropFaded' : 'customBackdrop'
              }
            >
              <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={loginStyle}
                contentLabel="create"
              >
                <FontAwesome
                  className="topicEx"
                  name="times"
                  onClick={this.props.closeModal}
                />
                <CreateTopic room={this.props.room} />
              </Modal>
            </div>;
  }
}

export default ModalContainer;
