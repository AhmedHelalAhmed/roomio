const axios = require('axios');

module.exports = {
    'hello|hi': (message) => `
        hi ${message.user.username || ''}!, type 'help' for a list of commands.
    `,
    'help': () => `
        heh just kidding, you gotta find em yourself :)
    `,
    'beep boop': () => `
        i am a robot
    `,
    'things jamie has said|thingsjamiehassaid': () =>
        axios.get('http://api.reddit.com/r/thingsjamiehassaid')
            .then(res => {
                const { children } = res.data.data;
                const index = Math.floor((Math.random() * children.length));
                return children[index].data.title;
            }),
    'tj|thomas': () => ['dj*', 'terry*', 'tom*'],
};