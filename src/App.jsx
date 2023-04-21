import GrowIntrestCalculator from './components/calculators/intrestCalculator'
import { Route, Routes } from 'react-router-dom'
import Assignments from './components/assignments';
import PageNotFound from './components/pageNotFound';
import DynamicAdornment from './components/dynamicAdornment';



function App() {

  return (
    <Routes>
      <Route path='/' element={<Assignments/>}/>
      <Route path='/grow-calculator' element={<GrowIntrestCalculator/>} />
      <Route path='/dynamic-adornment' element={<DynamicAdornment/>} />
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
  )
}

export default App
