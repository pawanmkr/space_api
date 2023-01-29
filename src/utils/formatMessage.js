import dayjs from "dayjs";

export default function formatMessage(msg) {
    return {
        message: msg.message,
        username: msg.username,
        attachment: msg.attachment
    }
}