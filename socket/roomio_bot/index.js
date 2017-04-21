const axios = require("axios");
const { laravelURI = "http://127.0.0.1:8888" } = process.env;
const resolvers = require("./resolvers");

const sendMessage = ({ io, socket, message }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${laravelURI}/api/message/robot`, message)
      .then(res => {
        const { message: newMessage } = res.data;
        const topic = `topic:${message.topic_ref}`;
        io.sockets.to(topic).emit("topic:new_message", { message: newMessage });
        resolve(res);
      })
      .catch(reject);
  });
};

const test = (trigger, content) => new RegExp(`\\b${trigger}\\b`, 'i').test(content);

const parseResult = (result) => {
    if (Array.isArray(result)) {
        const index = Math.floor((Math.random() * result.length));
        return result[index];
    }
    return result;
};

const RoomioBot = async (io, socket, message) => {
  const params = (content = "i broke somehow :(") => ({
    io,
    socket,
    message: {
      topic_ref: message.topic_ref,
      content
    }
  });

  if(!test('rb', message.content)) return;

  const matches = Object.keys(resolvers).filter(key => {
    return key.split('|').filter(subKey => {
        return test(subKey, message.content);
    }).length;
  });

  if (matches.length) {
      try {
          const command = matches.shift();
          console.log(`command: ${command}`);
        await sendMessage(
            params(
                await parseResult(resolvers[command](message, socket))
            )
        );
      } catch (e) {
        console.log(e);
        await sendMessage(params('something went wrong :('));
      }
  } else {
      await sendMessage(params('command not recognized :('));
  }
};

module.exports = RoomioBot;
