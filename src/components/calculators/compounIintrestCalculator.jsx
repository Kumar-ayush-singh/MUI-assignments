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
import CalculatorInput from "./common/calculatorInput";
import NumberAnimator from "./common/numberAnimator";
import CalcGraph from "./common/calcGraph";


const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 10000000;

const MIN_RATE = 1;
const MAX_RATE = 50;

const MIN_YEAR = 1;
const MAX_YEAR = 30;


const frequencyArray = ['Yearly', 'Half yearly', 'Quarterly']


export default function compoundIntrestCalculator() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(6);
  const [year, setYear] = useState(5);
  const [frequency, setFrequency] = useState(1);
  
  const theme = useTheme();
  
  const totalAmount = amount * (Math.pow((1 + (rate/(frequency * 100))), frequency * year));


  //handler for amount change
  function handleAmountChange(_event, acceptedValue) {
    setAmount(acceptedValue);
  }

  //handler for rate change
  function handleRateChange(_event, acceptedValue) {
    setRate(acceptedValue);
  }

  //handler for year change
  function handleYearChange(_event, acceptedValue) {
    setYear(acceptedValue);
  }

  function changeFrequency(){
    if(frequency > 4){
      setFrequency(1);
    }
    else{
      setFrequency(frequency * 2);
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
            <CalculatorInput
              label="Principal amount"
              inputStartAdornment={<CurrencyRupee fontSize="small" />}
              value={amount}
              onChange={handleAmountChange}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={1000}
              formatValue
            />
            <CalculatorInput
              label="Rate of interest (p.a)"
              inputEndAdornment={<Percent fontSize="small" />}
              min={MIN_RATE}
              max={MAX_RATE}
              value={rate}
              onChange={handleRateChange}
              step={0.01}
              useDecimal
            />
            <CalculatorInput
              label="Time period"
              inputEndAdornment="Yr"
              min={MIN_YEAR}
              max={MAX_YEAR}
              value={year}
              onChange={handleYearChange}
              step={1}
            />

            <Box display='flex' justifyContent='space-between' align-items='center'>
              <Typography textAlign='left'>Compounding frequency</Typography>
              <Button variant="text" endIcon={<ExpandMore fontSize="small"/>} onClick={changeFrequency} color="success">
                {frequencyArray[Math.floor(frequency/2)]}
              </Button>
            </Box>
            
            <Stack direction='row' justifyContent='space-between' marginTop={2}>
              <Typography color='gray'>Principal amount</Typography>
              <Typography fontWeight={700}>
                <NumberAnimator value={amount}/>
              </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography color='gray'>Total interest</Typography>
              <Typography fontWeight={700}>
                <NumberAnimator value={totalAmount - amount}/>
              </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography color='gray'>Total amount</Typography>
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
                  label: 'Total interest',
                  value: totalAmount - amount,
                }}
                secondary={{
                  label: 'Principal amount',
                  value: amount
                }}
              />
            </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
