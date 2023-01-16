import './App.css'
import Home from './pages/Home/Index'
import Chat from './pages/Chat/Index'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'


function App() {

  const [space, setSpace] = useState('')
  const [newSpace, setNewSpace] = useState('')
  const [username, setUsername] = useState('')
  const [activity, setActivity] = useState([])
  const [allSpaces, setAllSpaces] = useState([])
  const navigate = useNavigate()
  
  const handleFetch = (e) => {

    e.preventDefault()

    let item = {
      name: space,
      username: username
    }

    fetch(`http://localhost:4000/namespace/join/${space}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(item)
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      setNewSpace(data.extractData.spaceName)
      setActivity(data.activity)
      setAllSpaces(data.allSpace)
      navigate(`/spaces/${data.extractData.spaceName}`)
    })
    
  }

  return (
    <div className="app">
      <div>
          <Routes>
            <Route path='/' element={<Home space={space} setSpace={setSpace} username={username} setUsername={setUsername} handleFetch={handleFetch}/>} />
            <Route path='/spaces/:spaces' element={<Chat newSpace={newSpace} activity={activity} allSpaces={allSpaces}/>} />
          </Routes>
      </div>
    </div>
  )
}

export default App
