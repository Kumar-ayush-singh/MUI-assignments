import GrowIntrestCalculator from './components/intrestCalculator'
import { Route, Routes } from 'react-router-dom'
import Assignments from './components/assignments';



function App() {

  return (
    <Routes>
      <Route path='/' element={<Assignments/>}/>
      <Route path='/grow-calculator' element={<GrowIntrestCalculator/>} />
    </Routes>
  )
}

export default App
