import Members from "../../components/Members"


const ChatLeft = () => {
    return (
        <div className="chat-left d-flex justify-content-between">
            <div className="chat-left__logo p-3 d-flex flex-column align-items-center justify-content-center">
                <p className="mb-3 pe-2">G</p>
                <p className="mb-3 pe-2">A</p>
                <p className="mb-3 pe-2">T</p>
                <p className="mb-3 pe-2">H</p>
                <p className="mb-3 pe-2">E</p>
                <p className="mb-3 pe-2">R</p>
                <p className="mb-3 pe-2">.</p>
                <p className="mb-3 pe-2">U</p>
                <p className="mb-3 pe-2">P</p>
            </div>
            <div className="chat-left__content">

                {/* <div className="switch-btn p-3 pt-0">
                    <div className="switch-btn__container d-flex justify-content-center">
                        <div className="switch p-2 text-center">
                            <p className="mb-0 p-2 active-switch">Members</p>
                        </div>
                        <div className="switch p-2 text-center">
                            <p className="mb-0 p-2 text-center">Media</p>
                        </div>
                    </div>
                    <hr className="hr-line" />
                </div> */}

                <div className="chat-left__utils">
                    <div className="activity p-3">
                        <p className="mb-0">Activity</p>
                        <p className="online-green-dot">&#x2022;</p>
                    </div>
                    <div className="chat-left__utils_container pt-2 pb-2">
                        <Members member="Simon Paul" />
                        <Members member="Pawan Lamar" />
                        <Members member="Lakshay" />
                        <Members member="SRD" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatLeft