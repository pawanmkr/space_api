import './App.css'
import Home from './pages/Home/Index'
import Chat from './pages/Chat/Index'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'


function App() {

  const [space, setSpace] = useState('')
  const [newSpace, setNewSpace] = useState('')
  const navigate = useNavigate()
  
  const handleFetch = (e) => {

    e.preventDefault()

    let item = {
      name: space
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
      console.log(data.name)
      setNewSpace(data.name)
      navigate(`/spaces/${data.name}`)
    })
    
  }

  return (
    <div className="app">
      <div>
          <Routes>
            <Route path='/' element={<Home space={space} setSpace={setSpace} handleFetch={handleFetch}/>} />
            <Route path='/spaces/:spaces' element={<Chat newSpace={newSpace}/>} />
          </Routes>
      </div>
    </div>
  )
}

export default App
