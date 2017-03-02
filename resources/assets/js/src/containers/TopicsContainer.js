import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateActiveTopic } from '../redux/ducks/activeDucks';
import { addTopic, addMessages } from '../redux/ducks/entitiesDucks';
import { startLoading, stopLoading } from '../redux/ducks/loadingDucks';
import { authGET } from '../shared/utils/authAxios';
import find from 'lodash/find';

/**
 * Components
 */
import Topic from '../components/Topic';

class TopicContainer extends Component {
  state = { messageContent: ''};

  componentWillMount() {
    const { topics, socket, params: { topicRef, roomName } } = this.props;
    // check cache
    const topic = find(topics[roomName], { ref: topicRef });

    if (!topic) {
      // if not in the cache show spinner
      this.props.startLoading();
    }

    this.props.fetchTopic(topicRef)
      .then(() => {
          this.props.initSocketListeners();
          this.props.emit.joinTopic();
      }).catch((err) => console.log(err));
  }

  componentWillUnmount() {
    this.props.emit.leaveTopic();
  }

  render() {
    const { topics, loading, messages } = this.props;
    const { roomName, topicRef } = this.props.params;
    const topic = find(topics[roomName], { ref: topicRef });

    if (loading && !topic) {
      return (
        <p>spinner</p>
      )
    }

    return (
      <Topic
        topic={topic}
        messages={messages[topicRef]}
      />
    );
  }
}

const mapStateToProps = state => ({
  topics: state.entities.topics,
  messages: state.entities.messages,
  active: state.active,
  loading: state.loading.topic,
});

const mapDispatchToProps = (dispatch, props) => {
  const { socket, params } = props;

  return {
    initSocketListeners: () => {
      socket.on('topic:new_message', ({ message }) => {
        this.props.addMessage(message.topic_ref, message);
      });
    },
    emit: {
      joinTopic: () => {
        const { topicRef, roomName } = params;
        props.socket.emit('topic:join', { topicRef, roomName });
      },
      leaveTopic: () => {
        const { topicRef, roomName } = params;
        props.socket.emit('topic:leave', { topicRef, roomName });
      },
      sendMessage: (content) => {
        const { topicRef, roomName } = params;
        props.socket.emit('topic:send_message', {
          content, 
          topicRef, 
          ...window.user,
        });
      },
    },
    startLoading: () => dispatch(startLoading('topic')),
    fetchTopic: (topicRef) => {
      return new Promise((resolve, reject) => {
        authGET(`/api/topic/${topicRef}/messages`)
          .then((res) => {
            const { messages, topic } = res.data;
            console.log(messages);
            dispatch(addTopic(topic));
            dispatch(addMessages(topic.ref, messages.data));
            dispatch(updateActiveTopic(topic.ref));
            document.title = `${topic.room.title} - ${topic.title}`;
            dispatch(stopLoading('topic'));
            resolve();
          })
          .catch((err) => {
            dispatch(stopLoading('topic'));
            reject(err);
          });
      })
    }
  }
};

const ConnectedTopicContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicContainer);

export default ConnectedTopicContainer;