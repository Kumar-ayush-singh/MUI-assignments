import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Percent from "@mui/icons-material/Percent";
import Stack from  '@mui/material/Stack'
import Typography from  '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import useTheme from '@mui/material/styles/useTheme'
import { useState } from "react";
import { filterNumber, numberFormater } from "../../util/numberFunction";
import InterestInput from "./common/InterestInput";
import NumberAnimator from "./common/numberAnimator";
import CalcGraph from "./common/calcGraph";


const MIN_COST = 1000;
const MAX_COST = 10000000;

const MIN_INFL_RATE = 1;
const MAX_INFL_RATE = 50;

const MIN_YEAR = 1;
const MAX_YEAR = 30;

const COST = "currentCost";
const INFL_RATE = "inflRate";
const YEAR = "year";


export default function InflationCalculator(){
  const [error, setError] = useState([]);
  const [currentCost, setCurrentCost] = useState('1,00,000');
  const [inflRate, setInflRate] = useState(6);
  const [year, setYear] = useState(5);
  
  const theme = useTheme();
  
  const intCurrentCost = Number(currentCost.replaceAll(',', ''));
  const totalAmount = intCurrentCost * (Math.pow((1 + (inflRate/100))), year);


  //handler for currentCost change
  function handleAmountChange(_event) {
    const value = _event.target.value;
    let anyError = false;

    const number = filterNumber(String(value).replaceAll(',', ''));

    if (number >= MAX_COST) {
      setCurrentCost(numberFormater(MAX_COST));
    } else if (number < MIN_COST) {
      setCurrentCost(numberFormater(number));
      anyError = true;
    } else {
      setCurrentCost(numberFormater(number));
    }

    if (anyError) {
      if (!error.includes(COST)) {
        setError([...error, COST]);
      }
    } else {
      setError(error.filter((err) => err !== COST));
    }
  }

  //handler for inflRate change
  function handleRateChange(_event) {
    const value = _event.target.value;
    let anyError = false;
    const number = filterNumber(value, 2);
    
    if (number >= MAX_INFL_RATE) {
      setInflRate(MAX_INFL_RATE);
    } else if (number < MIN_INFL_RATE) {
      setInflRate(number);
      anyError = true;
    } else {
      setInflRate(number);
    }

    if (anyError) {
      if (!error.includes(INFL_RATE)) {
        setError([...error, INFL_RATE]);
      }
    } else {
      setError(error.filter((err) => err !== INFL_RATE));
    }
  }

  //handler for year change
  function handleYearChange(_event) {
    const value = _event.target.value;
    let anyError = false;

    const number = filterNumber(value);

    if (number >= MAX_YEAR) {
      setYear(MAX_YEAR);
    } else if (number < MIN_YEAR) {
      setYear(number);
      anyError = true;
    } else {
      setYear(number);
    }

    if (anyError) {
      if (!error.includes(YEAR)) {
        setError([...error, YEAR]);
      }
    } else {
      setError(error.filter((err) => err !== YEAR));
    }
  }



  //jsx start here
  return (
    <Box 
      display='flex' 
      justifyContent='center'

      sx={{
        padding: {
          xs: '0px',
          sm: '60px'
        }
      }}
    >
      <Paper sx={{
          border: {
            xs: 'none',
            sm: '1px solid #efefef',
          },
          boxShadow: {
            xs: theme.shadows[0],
            sm: theme.shadows[3],
          },
          flexGrow: {
            xs: 1,
            sm: 1,
            md: 0
          },
          maxWidth: '1000px'
      }}>
        <Typography variant="h4" fontWeight={500} textAlign='left' p={4} paddingBottom={0}>Compound Interest Calculator</Typography>
        <Stack spacing={2} p={4} sx={{
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: {
            xs: '1rem',
            md: '2rem'
          }
        }}>
          <Stack spacing={2} width="100%">
            <InterestInput
              label="Current Cost"
              inputStartAdornment={<CurrencyRupee fontSize="small" />}
              value={currentCost}
              onChange={handleAmountChange}
              min={MIN_COST}
              max={MAX_COST}
              step={1000}
              error={error.includes(COST)}
            />
            <InterestInput
              label="Rate of inflation (p.a)"
              inputEndAdornment={<Percent fontSize="small" />}
              min={MIN_INFL_RATE}
              max={MAX_INFL_RATE}
              value={inflRate}
              onChange={handleRateChange}
              step={0.01}
              error={error.includes(INFL_RATE)}
            />
            <InterestInput
              label="Time period"
              inputEndAdornment="Yr"
              min={MIN_YEAR}
              max={MAX_YEAR}
              value={year}
              onChange={handleYearChange}
              step={1}
              error={error.includes(YEAR)}
            />
            
            <Stack direction='row' justifyContent='space-between' marginTop={2}>
              <Typography color='gray'>Current Cost</Typography>
              <Typography fontWeight={700}>
                <NumberAnimator value={intCurrentCost}/>
              </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography color='gray'>Cost Increase</Typography>
              <Typography fontWeight={700}>
                <NumberAnimator value={totalAmount - intCurrentCost}/>
              </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography color='gray'>Future Cost</Typography>
              <Typography fontWeight={700}>
                <NumberAnimator value={totalAmount}/>
              </Typography>
            </Stack>
          </Stack>

          <Box maxWidth={300} sx={{
            alignSelf: {
              xs: 'center',
              md: 'start'
            }
          }}>
              <CalcGraph 
                primary={{
                  label: 'Total Inflation',
                  value: totalAmount - intCurrentCost,
                }}
                secondary={{
                  label: 'Current Cost',
                  value: intCurrentCost
                }}
              />
            </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
