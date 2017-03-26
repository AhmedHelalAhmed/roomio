import React from 'react';

const Active = ({ children, socket }) => {
  return (
    <div className="main-view">
      {React.Children.map(children, child =>
        React.cloneElement(child, { socket }),
      )}
    </div>
  );
};

export default Active;