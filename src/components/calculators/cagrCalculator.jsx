import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import Stack from  '@mui/material/Stack'
import Typography from  '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import useTheme from '@mui/material/styles/useTheme'
import { useState } from "react";
import CalculatorInput from "./common/calculatorInput";
import { InputAdornment } from "@mui/material";

const MIN_INITIAL_INVST = 1000;
const MAX_INITIAL_INVST = 10000000;

const MIN_FINAL_INVST = 1000;
const MAX_FINAL_INBST = 10000000;

const MIN_YEAR = 1;
const MAX_YEAR = 40;


export default function CargCalculator(){;
  const [initialInvst, setInitialInvst] = useState(5000);
  const [finalInvst, setFinalInvst] = useState(25000);
  const [year, setYear] = useState(5);
  
  const theme = useTheme();

  const cagr = ( Math.pow( (finalInvst / initialInvst),  ( 1/year ) ) - 1 ) * 100;


  //handler for initialInvst change
  function handleInitialInvstChange(_event, acceptedValue) {
    setInitialInvst(acceptedValue);
  }

  //handler for finalInvst change
  function handleFinalInvstChange(_event, acceptedValue) {
    setFinalInvst(acceptedValue);
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
        <Typography variant="h4" fontWeight={500} textAlign='left' p={4} paddingBottom={0}>CAGR Calculator</Typography>
        <Stack spacing={2} p={4}>
            <CalculatorInput
              label="Initial investmest"
              inputStartAdornment={
                <InputAdornment position="end">
                    <CurrencyRupee fontSize="small" />
                </InputAdornment>
              }
              value={initialInvst}
              onChange={handleInitialInvstChange}
              min={MIN_INITIAL_INVST}
              max={MAX_INITIAL_INVST}
              step={500}
              formatValue
            />
            <CalculatorInput
              label="Final investment"
              inputStartAdornment={
                <InputAdornment position="end">
                    <CurrencyRupee fontSize="small" />
                </InputAdornment>
              }
              min={MIN_FINAL_INVST}
              max={MAX_FINAL_INBST}
              value={finalInvst}
              onChange={handleFinalInvstChange}
              step={0.01}
              formatValue
            />
            <CalculatorInput
              label="Duration of investment"
              inputEndAdornment={
                <InputAdornment position="end">
                    Yr
                </InputAdornment>
              }
              min={MIN_YEAR}
              max={MAX_YEAR}
              value={year}
              onChange={handleYearChange}
              step={1}
            />
        </Stack>
        <Stack 
        direction='row'
        bgcolor={theme.palette.calculatorPrimary.light}
        justifyContent='space-between'
        alignItems='center'
        p={4}
        >
        <Typography variant="h5" fontWeight={500}>
            {`CAGR is ${cagr.toFixed(2)}%`}
        </Typography>
        <Button 
            variant="contained"  
            size='large'
            color='calculatorPrimary'
            sx={{
                flexShrink: 0,
                paddingLeft: '4em',
                paddingRight: '4rem',

            }}
        >
            reset
        </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
