import './App.css'
import Home from './pages/Home/Index'
import Chat from './pages/Chat/Index'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div className="app">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chat' element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
