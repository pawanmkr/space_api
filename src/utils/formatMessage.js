export default async function formatMessage(savedMessage, msg) {
    return {
        message: savedMessage.message,
        username: msg.username,
        attachment: savedMessage.attachment
    }
}