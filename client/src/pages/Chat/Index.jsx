import ChatLeft from "./ChatLeft"
import ChatMiddle from "./ChatMiddle"
import ChatRight from "./ChatRight"


const Chat = ({ newSpace }) => {
    console.log(newSpace)

    return (
        <div className="chat-section d-flex justify-content-between align-items-center">
            <ChatLeft />
            <ChatMiddle newSpace={newSpace}/>
            <ChatRight />
        </div>
    )
}


export default Chat