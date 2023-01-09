
const Room = ({ room }) => {
    return (
        <div className="room-item py-2 px-3 mb-1">
            <div className="room-item-content">
                <p className="mb-1">{room}</p>
            </div>
        </div>
    )
}

export default Room