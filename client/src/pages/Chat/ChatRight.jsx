import Room from "../../components/Room"
import RadioHead from "../../assets/radiohead.jpg"
const ChatRight = () => {
  return (
    <div className="chat-right">
      <div className="chat-right__content">
        <div className="profile-section p-3 pb-1">
          <div className="profile-section__content d-flex justify-content-center align-items-center flex-column mb-2">
            <div className="profile-container mb-3">
              <img src={RadioHead} alt="Profile-Image" className="profile-image" />
            </div>
            <h4 className="profile-name">Simon Paul</h4>
          </div>
          <hr className="hr-line"/>
        </div>


        <div className="chat-right__utils p-3">
          <h5 className="mb-3 text-center">Joined Rooms</h5>

          <div className="chat-right__utils_container p-2">
            <Room room="Planet 101"/>
            <Room room="Planet 835"/>
            <Room room="Planet 690"/>
          </div>


        </div>

      </div>
    </div>
  )
}

export default ChatRight