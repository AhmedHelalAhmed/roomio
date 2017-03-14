import React from 'react';
import FontAwesome from 'react-fontawesome';

const Loading = (props) => {
  return (
    <div className="outerLoad">
      <span className="loadingMessage">
        loading {props.name}
      </span>
      <div className="spinner">
        <FontAwesome 
          className="fa-circle-o-notch fa-spin spinner"
          name='fa-circle-o-notch' 
        />
      </div>
    </div>
  )
}

export default Loading;