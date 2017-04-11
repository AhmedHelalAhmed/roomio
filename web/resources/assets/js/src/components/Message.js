import React from 'react';
import { Link } from 'react-router';
import * as linkify from 'linkifyjs';
import moment from 'moment';
import { Popup } from 'semantic-ui-react';
import VideoPlayer from './Video';

const matchPlayerUrl = (url) => {
  const youtube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/.test(
    url,
  );
  const vimeo = /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/.test(
    url,
  );
  const streamable = /^https?:\/\/(streamable\.com)\/(.*)$/.test(url);
  const vidme = /^https?:\/\/(vid\.me)\/(.*)$/.test(url);
  return youtube || vimeo || streamable || vidme;
};

const getUrlsFromContent = (content) => {
  const link = linkify.find(content).pop();
  return matchPlayerUrl(link ? link.href : '') ? link.href : null;
};

const UsernameDate = ({ isFirst, prevMessage, message }) => {
  const differentUser = prevMessage.user.username !== message.user.username;
  const trigger = <i className="date-trigger">{moment.utc(message.created_at).fromNow()}</i>;
  const minBefore = moment.utc(prevMessage.created_at).add(1, 'm');
  const isWithinMin = moment.utc(message.created_at).isBefore(minBefore);

  const comp = (
    <div>
      <strong className="user">
        <Link to={`/user/${message.user.username}`}>
          {message.user.username}
        </Link>
      </strong>&nbsp;
      <Popup
        trigger={trigger}
        content={moment(message.created_at).utcOffset(4).format('MM-DD-YYYY h:mm a')}
      />
    </div>
  );

  if (isFirst) {
    return comp;
  } else if (differentUser) {
    return comp;
  } else if (!isWithinMin) {
    return comp;
  }

  return null;
};

const Message = ({ messages, message, index, html }) => {
  const isFirst = index === 0;
  const playerURL = getUrlsFromContent(message.content);

  return (
    <div className="chatBubble" key={index}>
      <UsernameDate
        isFirst={isFirst}
        prevMessage={messages[index > 0 ? index - 1 : index]}
        message={message}
      />
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
