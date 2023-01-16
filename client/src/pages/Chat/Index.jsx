import ChatLeft from "./ChatLeft"
import ChatMiddle from "./ChatMiddle"
import ChatRight from "./ChatRight"


const Chat = ({ newSpace, activity, allSpaces }) => {
    console.log(newSpace)

    return (
        <div className="chat-section d-flex justify-content-between align-items-center">
            <ChatLeft activity={activity}/>
            <ChatMiddle newSpace={newSpace}/>
            <ChatRight allSpaces={allSpaces}/>
        </div>
    )
}


export default Chat