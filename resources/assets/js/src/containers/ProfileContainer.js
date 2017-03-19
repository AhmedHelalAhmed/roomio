import React, { Component, PropTypes } from 'react'
import { authGET } from '../shared/utils/authAxios';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { updateActiveProfile } from '../redux/ducks/activeDucks';
import { addProfile } from '../redux/ducks/entitiesDucks';
import { startLoadingProfile, stopLoadingProfile } from '../redux/ducks/isLoadedDucks';
import Loading from '../components/reusable/Loading';

class ProfileContainer extends Component {

  componentWillReceiveProps(nextProps) {
    const newUserName = nextProps.params.userName;
    const currentUserName = this.props.params.userName;
    if (newUserName && (newUserName !== currentUserName)) {
      this.checkCacheAndFetch(newUserName);
    }
  }

  componentWillMount() {
    const { userName } = this.props.params;
    this.checkCacheAndFetch(userName);
  }

  checkCacheAndFetch(userName) {
    const { profiles } = this.props;
      // check cache
      if (!profiles[userName]) {
        this.props.startLoading();
      }

      this.props.fetchProfile(userName)

    }

  render() {
    const { isLoaded, profiles } = this.props;
    console.log('profiles', profiles)
    const { userName } = this.props.params;
    
    if (isLoaded || profiles[userName]) {
    return(
        <Profile 
          username={userName} 
          profile={profiles[userName]} 
        />
    );
  }
  
  return(
    <Loading name="profile" />
  );

  }
}

const mapStateToProps = (state, props) => ({
  profiles: state.entities.profiles,
  isLoaded: state.isLoaded.profiles[props.params.userName],
});

const mapDispatchToProps = dispatch => ({
  startLoading: (userName) => dispatch(startLoadingProfile(userName)),
  fetchProfile: (userName, onSuccess) => {
    return new Promise((resolve, reject) => {
      authGET(`/api/user/${userName}/profile`)
        .then((res) => {
          const { user } = res.data;
          console.table(user)
          dispatch(addProfile(user));
          dispatch(updateActiveProfile(userName));
          dispatch(stopLoadingProfile(userName));
          document.title = `Roomio - ${user.username}`;
          resolve();
        })
        .catch((err) => {
          dispatch(stopLoadingProfile(userName));
          reject(err);
        });
    })
  },
});

const ConnectedProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

export default ConnectedProfileContainer;