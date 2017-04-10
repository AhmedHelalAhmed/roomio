import React from 'react';
import FontAwesome from 'react-fontawesome';

const Loading = ({ name }) => (
  <div className="outerLoad">
    {name
        ? <span className="loadingMessage">
            loading {name}
        </span>
        : null}
    <div className="spinner">
      <FontAwesome
        className="fa-circle-o-notch fa-spin spinner"
        name="fa-circle-o-notch"
      />
    </div>
  </div>
  );

export default Loading;
