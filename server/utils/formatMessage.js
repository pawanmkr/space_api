import dayjs from "dayjs";

export default function formatMessage(username, text) {
    return {
        username,
        text,
        time: dayjs().format('h:m a')
    };
}