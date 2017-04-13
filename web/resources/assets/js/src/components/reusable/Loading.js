import React from 'react';
import FontAwesome from 'react-fontawesome';

const RoomSkel = ({ size }) => (
  <div className={`${size} skel`}>
    <div className="skelTitle skelSub" />
    <div className="skelDesc skelSub" />
    <div className="skelComments skelSub" />
  </div>
  );

const NavSkel = ({ size }) => <div className={`${size} skel`} />;

const Loading = ({ name }) => (
  <div className="outerLoad">
    {name === 'room'
      ? <span className="outerSkel-Room">
        <div className="skel full" />
        <RoomSkel size="large" />
        <RoomSkel size="small" />
        <RoomSkel size="medium" />
        <RoomSkel size="large" />
        <RoomSkel size="medium" />
        <RoomSkel size="large" />
      </span>
      : name === 'sidebar'
          ? <span className="outerSkel-Nav">
            <NavSkel size="small" />
            <NavSkel size="medium" />
            <NavSkel size="small" />
            <NavSkel size="large" />
            <NavSkel size="medium" />
            <NavSkel size="medium" />
            <NavSkel size="small" />
            <NavSkel size="large" />
            <NavSkel size="small" />
            <NavSkel size="large" />
            <NavSkel size="medium" />
            <NavSkel size="small" />
            <NavSkel size="medium" />
            <NavSkel size="small" />
            <NavSkel size="small" />
          </span>
          : <div>
            <span className="loadingMessage">
                loading {name}
            </span><div className="spinner">
              <FontAwesome
                className="fa-circle-o-notch fa-spin spinner"
                name="fa-circle-o-notch"
              />
            </div>
          </div>}
  </div>
);

export default Loading;
