import ChatLeft from "./ChatLeft"
import ChatMiddle from "./ChatMiddle"
import ChatRight from "./ChatRight"


const Chat = () => {
    return (
        <div className="chat-section d-flex justify-content-between align-items-center">
            <ChatLeft />
            <ChatMiddle />
            <ChatRight />
        </div>
    )
}


export default Chat