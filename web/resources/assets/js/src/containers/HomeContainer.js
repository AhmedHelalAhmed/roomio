import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { addHomeTopics } from "../redux/ducks/entitiesDucks";
import {
  startLoadingHome,
  stopLoadingHome
} from "../redux/ducks/isLoadedDucks";
import { updateHomePagination } from "../redux/ducks/paginationDucks";
import { authGET } from "../shared/utils/authAxios";
import Home from "../components/Home";
import Loading from "../components/reusable/Loading";

class HomeContainer extends Component {
  componentWillMount() {
    this.checkCacheAndFetch();
  }

  checkCacheAndFetch() {
    if (!this.props.topics) {
      this.props.startLoadingHome();
    }
    this.loadMore();
  }

  loadMore = () => {
    const { page, end } = this.props.pagination;
    this.props.updateHomePagination({ loading: true });
    if (!end) {
      this.props.fetchHomeTopics(page).then(res => {
        this.props.updateHomePagination({
          page: page + 1,
          loading: false,
          end: res.data.topics.data.length === 0
        });
      });
    }
  };

  render() {
    const { topics, isLoaded } = this.props;

    if (isLoaded && topics) {
      return (
        <Home
          topics={topics}
          loadMore={this.loadMore}
          {...this.props.pagination}
        />
      );
    }

    return <Loading name="room" />;
  }
}

const mapStateToProps = (state, props) => ({
  topics: state.entities.homeTopics,
  isLoaded: state.isLoaded.home,
  pagination: state.pagination.home
});

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoadingHome()),
  updateHomePagination: pagination =>
    dispatch(updateHomePagination(pagination)),
  fetchHomeTopics: page =>
    new Promise((resolve, reject) => {
      const endpoint = page ? `/api/topic?page=${page}` : "/api/topic";
      authGET(endpoint)
        .then(res => {
          dispatch(addHomeTopics(res.data.topics.data));
          dispatch(stopLoadingHome());
          document.title = "Home";
          resolve(res);
        })
        .catch(err => {
          dispatch(stopLoadingHome());
          reject(err);
        });
    })
});

const ConnectedHomeContainer = connect(mapStateToProps, mapDispatchToProps)(
  HomeContainer
);

export default ConnectedHomeContainer;
