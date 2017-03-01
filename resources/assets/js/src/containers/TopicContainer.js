import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { updateActiveTopic } from '../redux/ducks/activeDucks';
import { addTopic } from '../redux/ducks/entitiesDucks';
import { startLoading, stopLoading } from '../redux/ducks/loadingDucks';
import { authGET } from '../shared/utils/authAxios';

import Topic from '../components/Topic';

class TopicContainer extends Component {

  componentWillReceiveProps(nextProps) {
    // const { roomName, topicRef } = this.props.params;
    // const { active } = this.props;
    // if (roomName && roomName !== active.room) {
    //   this.props.fetchRoom(roomName);
    // }
  }

  componentWillMount() {
    const { roomName, topicRef } = this.props.params;
    const { topics } = this.props;

    // check cache
    const topic = find(topics[roomName], { ref: topicRef });

    if (topic) {
      // still get the new one in case things have changed but don't show the spinner
      this.props.fetchTopic(topicRef);
    } else {
      this.props.startLoading();
      this.props.fetchTopic(topicRef);
    }
  }

  render() {
    const { topics, loading } = this.props;
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
      />
    );
  }
}

const mapStateToProps = state => ({
  topics: state.entities.topics,
  active: state.active,
  loading: state.loading.topic
});

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading('topic')),
  fetchTopic: (topicRef) => {
    authGET(`/api/topic/${topicRef}/messages`)
      .then((res) => {
        const { messages, topic } = res.data;
        dispatch(addTopic(topic));
        dispatch(updateActiveTopic(topic.ref));
        document.title = `${topic.room.title} - ${topic.title}`;
        dispatch(stopLoading('topic'));
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading('topic'));
      });
  },
});

const ConnectedTopicContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicContainer);

export default ConnectedTopicContainer;