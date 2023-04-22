import GrowIntrestCalculator from './components/calculators/compounIintrestCalculator'
import { Route, Routes } from 'react-router-dom'
import Assignments from './components/assignments';
import PageNotFound from './components/pageNotFound';
import DynamicAdornment from './components/dynamicAdornment';
import NavBar from './components/navBar';
import createTheme from '@mui/material/styles/createTheme';
import { blue, indigo, red, teal } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import SipCalculator from './components/calculators/sipCalculator';
import LumpSumCalculator from './components/calculators/lumpsumCalculator';
import CargCalculator from './components/calculators/cagrCalculator';
import InflationCalculator from './components/calculators/inflationCalculator';


const theme = createTheme({
  palette: {
    
    calculatorPrimary: {
      light: teal['50'],
      main: teal['A700'],
      contrastText: 'white',
    },
    calculatorError: {
      light: red['50'],
      main: red['600'],
    },
    calculatorGraph: {
      main: indigo['A400'],
      light: blue['A100']
    },

  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <NavBar/>

      <Routes>
        <Route path='/' element={<Assignments/>}/>
        <Route path='/sip-calculator' element={<SipCalculator/>}/>
        <Route path='/lumpsum-calculator' element={<LumpSumCalculator/>}/>
        <Route path='/cagr-calculator' element={<CargCalculator/>}/>
        <Route path='/inflation-calculator' element={<InflationCalculator/>}/>
        <Route path='/grow-calculator' element={<GrowIntrestCalculator/>} />
        <Route path='/dynamic-adornment' element={<DynamicAdornment/>} />
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
