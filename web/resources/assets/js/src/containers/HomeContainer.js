import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addHomeTopics } from '../redux/ducks/entitiesDucks';
import { startLoadingHome, stopLoadingHome } from '../redux/ducks/isLoadedDucks';
import { authGET } from '../shared/utils/authAxios';
import Home from '../components/Home';
import Loading from '../components/reusable/Loading';

class HomeContainer extends Component {
  componentWillMount() {
    this.checkCacheAndFetch();
  }

  checkCacheAndFetch() {
    if (!this.props.topics) {
      this.props.startLoadingHome();
    }
    this.props.fetchHomeTopics()
      .then(() => console.log('fetchedHomeTopics'));
  }

  render() {
    console.table(this.props)
    const { topics, isLoaded } = this.props;

    if (isLoaded && topics) {
      return (
        <Home
          topics={topics}
        />
      );
    }

    return (
      <Loading name="room" />
    );
  }
}

const mapStateToProps = (state, props) => ({
  topics: state.entities.homeTopics,
  isLoaded: state.isLoaded.home,
});

const mapDispatchToProps = dispatch => ({
  startLoading: (roomName) => dispatch(startLoadingHome()),
  fetchHomeTopics: (roomName) => {
    return new Promise((resolve, reject) => {
      authGET(`/api/topic`)
        .then((res) => {
          dispatch(addHomeTopics(res.data.topics.data));
          dispatch(stopLoadingHome());
          document.title = 'Home';
          resolve();
        })
        .catch((err) => {
          dispatch(stopLoadingHome());
          reject(err);
        });
    });
  },
});

const ConnectedHomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);

export default ConnectedHomeContainer;