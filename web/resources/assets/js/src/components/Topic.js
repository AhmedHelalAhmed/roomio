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
    width                 : '300px',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class Topic extends Component {
  state = {
      modalIsOpen: false
    };
  onClick = () => {
    console.log("clicked")
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
  render() {
    return(
        <div className="messenger">
        <div className ="sharedContainer">
          <div className="sharedTitleSep topicSep">
            <h1>
              <span className='flexTitle'>
                <Link 
                  to={`/room/${this.props.topic.room_name}`}
                  className="return"
                >
                  {this.props.topic.room_name}
                </Link>
                <FontAwesome
                 className='info' 
                 name='info-circle'
                 onClick={this.onClick}
                /> 
                <span>{this.props.topic.title}</span>
              </span>
            </h1>
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
                  <h3 ref="subtitle">Description: </h3>
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