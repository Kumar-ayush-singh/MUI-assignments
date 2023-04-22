import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import Percent from "@mui/icons-material/Percent";
import Stack from  '@mui/material/Stack'
import Typography from  '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import useTheme from '@mui/material/styles/useTheme'
import { useState } from "react";
import CalculatorInput from "./common/calculatorInput";
import NumberAnimator from "./common/numberAnimator";
import CalcGraph from "./common/calcGraph";


const MIN_COST = 1000;
const MAX_COST = 10000000;

const MIN_INFL_RATE = 1;
const MAX_INFL_RATE = 50;

const MIN_YEAR = 1;
const MAX_YEAR = 30;


export default function InflationCalculator(){
  const [currentCost, setCurrentCost] = useState(100000);
  const [inflRate, setInflRate] = useState(6);
  const [year, setYear] = useState(5);
  
  const theme = useTheme();

  const futureCost = currentCost * (Math.pow((1 + (inflRate/100)), year));


  //handler for currentCost change
  function handleCurrentCostChange(_event, acceptedValue) {
    console.log(acceptedValue)
    setCurrentCost(acceptedValue);
  }

  //handler for inflRate change
  function handleInflRateChange(_event, acceptedValue) {
    console.log(acceptedValue);
    setInflRate(acceptedValue);
  }

  //handler for year change
  function handleYearChange(_event, acceptedValue) {
    console.log(acceptedValue);
    setYear(acceptedValue);
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
        <Typography variant="h4" fontWeight={500} textAlign='left' p={4} paddingBottom={0}>Inflation Calculator</Typography>
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
              label="Current Cost"
              inputStartAdornment={<CurrencyRupee fontSize="small" />}
              value={currentCost}
              onChange={handleCurrentCostChange}
              min={MIN_COST}
              max={MAX_COST}
              step={1000}
              formatValue
            />
            <CalculatorInput
              label="Rate of inflation (p.a)"
              inputEndAdornment={<Percent fontSize="small" />}
              min={MIN_INFL_RATE}
              max={MAX_INFL_RATE}
              value={inflRate}
              onChange={handleInflRateChange}
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
            
            <Stack direction='row' justifyContent='space-between' marginTop={2}>
              <Typography color='gray'>Current Cost</Typography>
              <Typography fontWeight={700}>
                <NumberAnimator value={currentCost}/>
              </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography color='gray'>Cost Increase</Typography>
              <Typography fontWeight={700}>
                <NumberAnimator value={futureCost - currentCost}/>
              </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography color='gray'>Future Cost</Typography>
              <Typography fontWeight={700}>
                <NumberAnimator value={futureCost}/>
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
                  value: futureCost - currentCost,
                }}
                secondary={{
                  label: 'Current Cost',
                  value: currentCost
                }}
              />
            </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
