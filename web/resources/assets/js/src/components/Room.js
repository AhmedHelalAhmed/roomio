import React, { PropTypes } from 'react';
import TopicList from './TopicList';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import ModalContainer from './Modal';

const Room = (
  {
    room,
    topics,
    loadMore,
    loading,
    end,
    onClick,
    closeModal,
    localstate,
    closeTopicScreen,
    onClickNewTopic,
  },
) => (
  <div className="sharedContainer limit">
    {window.user
      ? <span
        className={
            `bottomStickBubble ${localstate.newTopicIsOpen ? 'moved' : null}`
          }
        onClick={onClickNewTopic}
      >
        <span>
          <div className="newTopicBtn">
            <span className="new">+</span> <FontAwesome name="comment" />
          </div>
        </span>
      </span>
      : null}
    <div className="sharedTitleSep">
      <h1>
        <div className="flexTopTopicRight">
          <FontAwesome className="info" name="info-circle" onClick={onClick} />
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
      {localstate.modalIsOpen
        ? <ModalContainer
          description={room.description}
          admin={room.user.username}
          modalIsOpen={localstate.modalIsOpen}
          closeModal={closeModal}
          type="room"
        />
        : null}
      {localstate.newTopicIsOpen
        ? <ModalContainer
          description={room.description}
          admin={room.user.username}
          modalIsOpen={localstate.newTopicIsOpen}
          closeModal={closeTopicScreen}
          room={room}
          type="create"
        />
        : null}
    </div>
  </div>
);

export default Room;
