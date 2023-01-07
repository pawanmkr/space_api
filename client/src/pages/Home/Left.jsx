
const Left = () => {
  return (
    <div className="left d-flex justify-content-center align-items-center">
        <div className="form">
            <h3 className="form-heading">Create Chat Room</h3>
            <form>
                <div className="form-item">
                    <input type="text" className="form-input" placeholder="Username"/>
                </div>
                <div className="form-item">
                    <input type="text" className="form-input" placeholder="room name"/>
                </div>
                <div className="form-item">
                    <input type="password" className="form-input" placeholder="password"/>
                </div>
                <div className="form-item">
                    <button type="submit" className="form-submit-btn">Create Room</button>
                </div>
            </form>
            <p className="join">Already have one ? <span className="join-span"><a href="#">Join</a></span></p>
        </div>
    </div>
  )
}

export default Left