import Left from './Left'
import Right from './Right'

const Home = () => {
    return(
        <div className="home glass">
            <div className="glass d-flex justify-content-center align-items-center">
                <Left />
                <Right />
            </div>
        </div>
    )
}

export default Home