const dayjs = require('dayjs');

const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: dayjs().format('h:m a')
    }
}

module.exports = formatMessage;