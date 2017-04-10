import React from 'react';

const Active = ({ children, socket, activeWindow }) => (
  <div className="main-view">
    {React.Children.map(children, child =>
        React.cloneElement(child, { socket, activeWindow }))}
  </div>
  );

export default Active;
