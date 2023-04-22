import GrowIntrestCalculator from './components/calculators/intrestCalculator'
import { Route, Routes } from 'react-router-dom'
import Assignments from './components/assignments';
import PageNotFound from './components/pageNotFound';
import DynamicAdornment from './components/dynamicAdornment';
import NavBar from './components/navBar';
import createTheme from '@mui/material/styles/createTheme';
import { blue, green, grey, indigo, red, teal } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';


const theme = createTheme({
  palette: {
    calcInput: {
      slider: {
        rail: grey['300'],
        track: teal['A700'],
        thumb: 'white',
      },
      textField: {
        bg: teal['50'],
        text: teal['A700'],
      },
      error: {
        bg: red['50'],
        text: red['600'],
      }
    },
    calcGraph: {
      primary: indigo['A400'],
      secondary: blue['A100']
    }
  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <NavBar/>

      <Routes>
        <Route path='/' element={<Assignments/>}/>
        <Route path='/grow-calculator' element={<GrowIntrestCalculator/>} />
        <Route path='/dynamic-adornment' element={<DynamicAdornment/>} />
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
