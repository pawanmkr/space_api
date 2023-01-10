import Message from "../../components/Message"


const ChatMiddle = ({ newSpace }) => {

    return (
        <div className="chat-middle">
            <div className="chatroom-name p-3">
                <p className="space-title">{newSpace}</p>
            </div>
            <div className="message-section p-3">
                <Message text="Received Text" author="Simon Paul" sender={false} />
                <Message text="Sent Text" author="Pawan Lamar" sender={true} />
            </div>
            <div className="input-box">
                <form className="d-flex input-form px-3 py-2">
                    <input type="text" className="input-message" placeholder="Type Message Here..." />
                    <button type="submit" className="input-submit-btn"><i className="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    )
}

export default ChatMiddle