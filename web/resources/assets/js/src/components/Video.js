import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import FontAwesome from 'react-fontawesome';

class VideoPlayer extends Component {
  state = { collapse : false };

  onClick = () => {
    const { collapse } = this.state;
    this.setState({collapse: !collapse});
  }

  render() {
    return (
      <span className="expandable">
        {
          this.state.collapse ? 
          <span>
            <FontAwesome className='showHide' name="expand" onClick={this.onClick} />
          </span> :
          <span>
            <FontAwesome className='showHide' name="compress" onClick={this.onClick} />
            <ReactPlayer url={this.props.playerURL} frameborder="0" control={true} />
          </span> 
        }
      </span>
    );
  }
}


export default VideoPlayer