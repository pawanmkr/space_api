let moment = require('moment');

const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: "15:13 AM"
        //time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;