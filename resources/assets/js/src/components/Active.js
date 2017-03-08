import React from 'react';

const Active = props => {
  return (
    <div className="main-view">
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { socket: props.socket }),
      )}
    </div>
  );
};

export default Active;