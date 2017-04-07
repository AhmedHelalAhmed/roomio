import React, { PropTypes } from 'react';
import TopicList from './TopicList';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import ModalContainer from './Modal';

const Room = ({ room, topics, loadMore, loading, end, onClick, closeModal, modal }) => (
  <div className="sharedContainer limit">
    <span className="bottomStickBubble">
      <span><Link to={`/newtopic?room=${room.name}`}>
        <span className = "new">+</span> <FontAwesome name="comment" />
      </Link></span>
    </span>
    <div className="sharedTitleSep">
      <h1>
      <div className="flexTopTopicRight">
          <FontAwesome
            className='info' 
            name='info-circle'
            onClick={onClick}
          />
        </div>
        <span>
          {room.title}
        </span>
      </h1>
    </div>
    <div className="sharedBody sidebyside fixedBody">
      <div className="topicsFlex">
        <h3>Topics</h3>
        <TopicList
          topics={topics}
          name={room.name}
          loadMore={loadMore}
          loading={loading}
          end={end}
        />
      </div>
        {
          modal.modalIsOpen ? 
            <ModalContainer
              description = {room.description}
              admin = {room.user.username}
              modalIsOpen = {modal.modalIsOpen}
              closeModal = {closeModal}
              type = 'room'
            /> : null
      }
    </div>
  </div>
);

export default Room;
