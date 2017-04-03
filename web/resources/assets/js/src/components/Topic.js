import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import MessageList from './MessageList';
import FontAwesome from 'react-fontawesome';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '400px',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class Topic extends Component {
  state = { modalIsOpen: false };

  onClick = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return(
        <div className="messenger">
        <div className ="sharedContainer">
          <div className="sharedTitleSep topicSep">
            <div className="farRightBtn">
              <div className="flexTopTopic">
              <div className="flexTopTopicRight">
                <FontAwesome
                 className='info' 
                 name='info-circle'
                 onClick={this.onClick}
                />
              </div>
                <div className="leftTopTopic">
                  <Link 
                    to={`/room/${this.props.topic.room_name}`}
                    className="return"
                  >
                    {this.props.topic.room_name}
                  </Link>
                </div>
                <div className="rightTopTopic">
                  <span>{ this.props.topic.title }</span>
                </div>
              </div>
            </div>
          </div>
            {
              this.state.modalIsOpen ? 
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
              <FontAwesome name="times" className='closeModal' onClick={this.closeModal} />
              <h2 ref="subtitle">{this.props.topic.title}</h2>
              <h4 ref="subtitle">Description</h4>
              <p>{this.props.topic.description}</p>
            </Modal> : null
          }
          
            <MessageList {...this.props} />
          </div>
        </div>
    );
  }
}



export default Topic;