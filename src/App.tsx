import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/CheckOut'
import Navbar from './componets/Navbar'

function App() {
  return<>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/auth' element={<Auth/>}/>
    <Route path='/checkout' element={<Checkout/>}/>
  </Routes>
  </>
}
export default App
