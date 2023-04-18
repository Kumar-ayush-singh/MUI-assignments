import GrowIntrestCalculator from './components/intrestCalculator'
import { Route, Routes } from 'react-router-dom'
import Assignments from './components/assignments';
import PageNotFound from './components/pageNotFound';



function App() {

  return (
    <Routes>
      <Route path='/' element={<Assignments/>}/>
      <Route path='/grow-calculator' element={<GrowIntrestCalculator/>} />
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
  )
}

export default App
