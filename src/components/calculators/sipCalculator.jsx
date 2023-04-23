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


const MIN_MONTHLY_INVST = 500;
const MAX_MONTHLY_INVST = 100000;

const MIN_RETURN_RATE = 1;
const MAX_RETURN_RATE = 30;

const MIN_YEAR = 1;
const MAX_YEAR = 40;


export default function SipCalculator() {
  const [monthlyInvst, setMonthlyInvst] = useState(25000);
  const [returnRate, setReturnRate] = useState(12);
  const [year, setYear] = useState(10);
  
  const theme = useTheme();
  
  const totalMonth = 12 * year;
  const monthlyReturnRate = (returnRate/12);
  const totalInvstAmount = monthlyInvst * totalMonth;
  const totalAmount = monthlyInvst * ( ( ( Math.pow( (1 + (monthlyReturnRate/100)), totalMonth) - 1) / (monthlyReturnRate/100) ) * ( 1 + monthlyReturnRate/100) );


  //handler for monthlyInvst change
  function handleMonthlyInvstChange(_event, acceptedValue) {
    setMonthlyInvst(acceptedValue);
  }

  //handler for returnRate change
  function handleRateChange(_event, acceptedValue) {
    setReturnRate(acceptedValue);
  }

  //handler for year change
  function handleYearChange(_event, acceptedValue) {
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
        <Typography variant="h4" fontWeight={500} textAlign='left' p={4} paddingBottom={0}>SIP Calculator</Typography>
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
              label="Monthly investmest"
              inputStartAdornment={<CurrencyRupee fontSize="small" />}
              value={monthlyInvst}
              onChange={handleMonthlyInvstChange}
              min={MIN_MONTHLY_INVST}
              max={MAX_MONTHLY_INVST}
              step={500}
              formatValue
            />
            <CalculatorInput
              label="Expected return rate (p.a)"
              inputEndAdornment={<Percent fontSize="small" />}
              min={MIN_RETURN_RATE}
              max={MAX_RETURN_RATE}
              value={returnRate}
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
