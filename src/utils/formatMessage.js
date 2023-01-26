import dayjs from "dayjs";

export default function formatMessage(msg) {
    return {
        message: msg.message,
        author: msg.username,
        dateAndTime: {
            date: dayjs().format('DD-MM-YYYY'),
            day: dayjs().format('dddd'),
            time: dayjs().format('hh:mm:ss a'),
        }
    }
}