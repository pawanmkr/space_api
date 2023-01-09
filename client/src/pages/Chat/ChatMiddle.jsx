import Message from "../../components/Message"


const ChatMiddle = () => {
    return (
        <div className="chat-middle">
            <div className="chat-middle__content">
                <div className="chatroom-name p-3 mb-3">
                    <p className="mb-3">Chat Room Name</p>
                    <hr className="hr-line" />
                </div>
                <div className="message-section p-3">
                    <div className="message-section__content">
                        <Message text="Received Text" author="Simon Paul" sender={false} />
                        <Message text="Sent Text" author="Pawan Lamar" sender={true} />
                    </div>

                    <div className="input-box px-3">
                        <form className="d-flex input-form px-3 py-2">
                            <input type="text" className="input-message" placeholder="Type Message Here..." />
                            <button type="submit" className="input-submit-btn"><i class="fa-solid fa-paper-plane"></i></button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChatMiddle