import Room from "../../components/Room"
import RadioHead from "../../assets/profile.png"

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
        </div>


        <div className="chat-right__utils p-2">

          <div className="chat-right__utils_container pt-2 pb-2">
            {/* <Room room="kaale kachhe wale"/> */}
            <Room room=" Omly Fans no Grills"/>
            <Room room="Duckbois on the move"/>
            <Room room="blue pegasus: reincarnation"/>
          </div>


        </div>

      </div>
    </div>
  )
}

export default ChatRight