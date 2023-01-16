import Left from './Left'
import Right from './Right'

const Home = ({ space, handleFetch,setSpace, username, setUsername }) => {
    return(
        <div className="home glass">
            <div className="glass d-flex justify-content-center align-items-center">
                <Left space={space} setSpace={setSpace} handleFetch={handleFetch} username={username} setUsername={setUsername}/>
                {/* <Right /> */}
            </div>
        </div>
    )
}

export default Home