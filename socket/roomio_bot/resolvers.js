const axios = require('axios');

const weatherAppID = '70da43007f50c4366fbb4685ffe5ef67';

module.exports = {
    'hello|hi': (message) => `
        hi ${message.user.username || ''}! type 'help' for a list of commands.
    `,
    'help': () => `
        heh just kidding, you gotta find em yourself :)
    `,
    'beep boop': () => `
        i am a robot
    `,
    'things jamie has said|thingsjamiehassaid': async () => {
        const { data } = await axios.get('http://api.reddit.com/r/thingsjamiehassaid');
        const { children } = data.data;
        const index = Math.floor((Math.random() * children.length));
        return children[index].data.title;
    },
    'tj|thomas': () => [
        'dj*',
        'terry*',
        'tom*',
    ],
    'weather': async (message, socket) => {
        // weather in boston
        const parsedMessage = message.content.split('rb weather in').map(word => word.trim()).filter(word => word);
        const city = parsedMessage.pop().split(' ').shift();
        const { data: weatherData } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAppID}`);
        console.log(weatherData);
        return weatherData.weather.pop().description;
        // const ip = socket.request.connection.remoteAddress;
        // const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
        // return data.city;
    }
};