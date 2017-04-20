module.exports = {
    'hello roomio_bot': (message) => `
        hi ${message.user.username}!, type 'help' for a list of commands.
    `,
    'help': () => `heh, just kidding, that isn't setup yet`,
};