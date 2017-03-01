import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addRoom,
  addTopic,
} from '../redux/ducks/entitiesDucks';

class AppContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }

  componentWillMount() {
    console.log(this.props);
  }

  render() {
      return (
          <div>
            {this.props.children}
          </div>
      );
  }
}

const mapStateToProps = state => ({
  entities: state.entities,
});

// const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

function mapDispatchToProps(dispatch) {
  return {
    addRoom: (value) => dispatch(addRoom(value)),
    addTopic: () => dispatch(addTopic())
  };
}

const ConnectedAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

export default ConnectedAppContainer;
