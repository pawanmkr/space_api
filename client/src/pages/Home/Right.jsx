
import Rocket from '../../assets/rocket.png'

const Right = () => {
  return (
    <div className="right d-flex justify-content-center align-items-center">
        <div className="logo-container d-flex justify-content-between align-items-center flex-column">
            <div className="ver-line"></div>
            <h3 className="logo">Gather.up</h3>
            <div className="ver-line"></div>
        </div>
        <div className="rocket-container d-flex justify-content-between align-items-center">
            <img src={Rocket} alt="rocket-img" className='rocket-img'/>
        </div>
    </div>
  )
}

export default Right