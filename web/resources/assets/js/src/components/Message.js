import React from 'react';
import { Link } from 'react-router';
import ReactPlayer from 'react-player';
import * as linkify from 'linkifyjs';
import VideoPlayer from './Video';

const matchPlayerUrl = (url) => {
  const youtube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/.test(url);
  const vimeo = /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/.test(url);
  const streamable = /^https?:\/\/(streamable\.com)\/(.*)$/.test(url);
  const vidme = /^https?:\/\/(vid\.me)\/(.*)$/.test(url);
  return youtube || vimeo || streamable || vidme;
};

const getUrlsFromContent = (content) => {
  const link = linkify.find(content).pop();
  return matchPlayerUrl(link ? link.href : '') ? link.href : null;
};

const Message = ({ messages, message, index, html }) => {
  const isFirst = index === 0;
  const playerURL = getUrlsFromContent(message.content);

  return (
    <div className="chatBubble" key={index}>
      {isFirst || messages[index - 1].user.username !== message.user.username
        ? <strong className="user">
          <Link to={`/user/${message.user.username}`}>
            {message.user.username}:
            </Link>
        </strong>
        : null}
      {playerURL
        ? <span>
          <span
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <VideoPlayer playerURL={playerURL} message={message} />
        </span>
        : <span
          style={{ whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />}
    </div>
  );
};

export default Message;
