import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import Percent from "@mui/icons-material/Percent";
import Stack from  '@mui/material/Stack'
import Typography from  '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import useTheme from '@mui/material/styles/useTheme'
import { useState } from "react";
import { filterNumber, numberFormater } from "../../util/numberFunction";
import InterestInput from "./common/InterestInput";
import NumberAnimator from "./common/numberAnimator";
import CalcGraph from "./common/calcGraph";


const MIN_MONTHLY_INVST = 500;
const MAX_MONTHLY_INVST = 1000000;

const MIN_RETURN_RATE = 1;
const MAX_RETURN_RATE = 30;

const MIN_YEAR = 1;
const MAX_YEAR = 40;

const MONTHLY_INVST = "totalInvst";
const RETURN_RATE = "returnRate";
const YEAR = "year";


export default function LumpSumCalculator (){
  const [error, setError] = useState([]);
  const [totalInvst, setTotalInvst] = useState('25,000');
  const [returnRate, setReturnRate] = useState(12);
  const [year, setYear] = useState(10);
  
  const theme = useTheme();
  
  const totalInvstAmount = Number(totalInvst.replaceAll(',', ''));
  const totalAmount = totalInvstAmount * ( Math.pow( ( 1 + returnRate/100), year ) );


  //handler for totalInvst change
  function handleMonthlyInvstChange(_event) {
    const value = _event.target.value;
    let anyError = false;

    const number = filterNumber(String(value).replaceAll(',', ''));
    console.log(number);
    console.log(totalInvst);

    if (number >= MAX_MONTHLY_INVST) {
      setTotalInvst(numberFormater(MAX_MONTHLY_INVST));
    } else if (number < MIN_MONTHLY_INVST) {
      setTotalInvst(numberFormater(number));
      anyError = true;
    } else {
      setTotalInvst(numberFormater(number));
    }

    if (anyError) {
      if (!error.includes(MONTHLY_INVST)) {
        setError([...error, MONTHLY_INVST]);
      }
    } else {
      setError(error.filter((err) => err !== MONTHLY_INVST));
    }
  }

  //handler for returnRate change
  function handleRateChange(_event) {
    const value = _event.target.value;
    let anyError = false;
    const number = filterNumber(value, 2);
    
    if (number >= MAX_RETURN_RATE) {
      setReturnRate(MAX_RETURN_RATE);
    } else if (number < MIN_RETURN_RATE) {
      setReturnRate(number);
      anyError = true;
    } else {
      setReturnRate(number);
    }

    if (anyError) {
      if (!error.includes(RETURN_RATE)) {
        setError([...error, RETURN_RATE]);
      }
    } else {
      setError(error.filter((err) => err !== RETURN_RATE));
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
        <Typography variant="h4" fontWeight={500} textAlign='left' p={4} paddingBottom={0}>Lumpsum Calculator</Typography>
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
              label="Total investmest"
              inputStartAdornment={<CurrencyRupee fontSize="small" />}
              value={totalInvst}
              onChange={handleMonthlyInvstChange}
              min={MIN_MONTHLY_INVST}
              max={MAX_MONTHLY_INVST}
              step={500}
              error={error.includes(MONTHLY_INVST)}
            />
            <InterestInput
              label="Expected return rate (p.a)"
              inputEndAdornment={<Percent fontSize="small" />}
              min={MIN_RETURN_RATE}
              max={MAX_RETURN_RATE}
              value={returnRate}
              onChange={handleRateChange}
              step={0.01}
              error={error.includes(RETURN_RATE)}
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
              <Typography color='gray'>Invested amount</Typography>
              <Typography fontWeight={700}>
                <NumberAnimator value={totalInvstAmount}/>
              </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography color='gray'>Est. returns</Typography>
              <Typography fontWeight={700}>
                <NumberAnimator value={totalAmount - totalInvstAmount}/>
              </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography color='gray'>Total value</Typography>
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
                  label: 'Est. returns',
                  value: totalAmount - totalInvstAmount,
                }}
                secondary={{
                  label: 'Invested amount',
                  value: totalInvstAmount
                }}
              />
            </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
