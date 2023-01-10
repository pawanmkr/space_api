

const Members = ({ member }) => {
  return (
    <div className="member-item py-2 px-3 mb-1">
        {/* <div className="member-item-content">
            <p className="mb-1"> <span className="member-item__icon me-2"><i class="fa-solid fa-circle"></i></span> {member}</p>
        </div> */}
        
        {/* added by pawan */}
        <div className="member">
            { member }
        </div>
    </div>
  )
}

export default Members