import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import MessageList from './MessageList';
import FontAwesome from 'react-fontawesome';
import ModalContainer from './Modal';


class Topic extends Component {
  state = {
      modalIsOpen: false
    };
  onClick = () => {
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
                <ModalContainer
                  topic = {this.props.topic}
                  modalIsOpen = {this.state.modalIsOpen}
                  closeModal = {this.closeModal}
                  type = 'topic'
                /> : null
          }
          
            <MessageList {...this.props} />
          </div>
        </div>
    );
  }
}



export default Topic;