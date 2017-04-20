const axios = require('axios');
const { laravelURI = 'http://127.0.0.1:8888' } = process.env;
const responses = require('./responses');

const sendMessage = ({ io, socket, message }) => {
    return new Promise((resolve, reject) => {
        axios.post(`${laravelURI}/api/message/robot`, message)
            .then((res) => {  
                const { message: newMessage } = res.data;
                const topic = `topic:${message.topic_ref}`;
                io.sockets.to(topic).emit('topic:new_message', { message: newMessage });
                resolve(res);
            }).catch(console.log);
    });
}

const test = (reg, content) => new RegExp(reg).test(content);

const RoomioBot = async (io, socket, message) => {
    const params = content => ({
        io, socket,
        message: {
            topic_ref: message.topic_ref,
            content
        }
    });

    const matches = Object.keys(responses).filter(key => test(key, message.content));

    if (matches.length) {
        await sendMessage(
            params(await responses[matches.pop()](message) || 'I broke somehow.')
        );
    }
};

module.exports = RoomioBot;