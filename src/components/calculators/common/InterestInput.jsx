import Error from "@mui/icons-material/Error";
import Stack from  '@mui/material/Stack'
import Typography from  '@mui/material/Typography'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import useTheme from "@mui/material/styles/useTheme";
import grey from "@mui/material/colors/grey";


import { CustomTooltip } from "./customTooltip";
import { filterNumber, numberFormater } from "../../../util/numberFunction";
import { useEffect, useState } from "react";

export default function InterestInput({
  value,
  onChange,
  label,
  inputStartAdornment,
  inputEndAdornment,
  min,
  max,
  step,
  formatValue,
  useDecimal,
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [error, setError] = useState(false);
  const theme = useTheme();

  //for formating initial value
  useEffect(() => {
    if(formatValue){
      setCurrentValue( numberFormater(value, useDecimal) );
    }
  }, []);



  const handleInputChange = (_event) => {
    const newValue = _event.target.value;
    let isValueValid = false;
    
    const filteredString = filterNumber(newValue);
    const filteredNumber = Number(filteredString);
    let acceptedValue = filteredString;

    if(filteredNumber >= max){
      acceptedValue = max;
    }
    else if(filteredNumber < min){
      isValueValid = true;
    }
    
    if(formatValue){
      setCurrentValue(numberFormater(acceptedValue, true, useDecimal));
    }
    else{
      setCurrentValue(acceptedValue);
    }
    onChange(_event, acceptedValue == max ? max : filteredNumber);

    setError(isValueValid);
  }



  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginTop={2}
      >
        <Typography textAlign='left'>{label}</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          {error ? (
            <CustomTooltip
              title={`Minimum value allowed is ${min}`}
              placement="top"
              arrow
            >
              <Error color="error" />
            </CustomTooltip>
          ) : null}

          <TextField
            InputProps={{
              startAdornment: inputStartAdornment ? inputStartAdornment : null,
              endAdornment: inputEndAdornment ? inputEndAdornment : null,
            }}
            value={currentValue}
            onChange={handleInputChange}
            size="small"
            sx={{
              border: "none",
              background: error ? theme.palette.calculatorError.light : theme.palette.calculatorPrimary.light,
              "& fieldset": {
                display: "none",
              },
              "& svg, & input, & .MuiInputBase-root, & .MuiTypography-root": {
                color: error ? theme.palette.calculatorError.main : theme.palette.calculatorPrimary.main,
                textAlign: "right",
                fontWeight: 700,
              },
              '& .MuiInputBase-root': {
                paddingLeft: 0.5,
              }
            }}
          />
        </Box>
      </Stack>


      <Slider
        min={min}
        max={max}
        value={Number(String(currentValue).replaceAll(',', ''))}
        step={step ? step : undefined}
        onChange={handleInputChange}
        sx={{
          "& .MuiSlider-rail": {
            background: grey[200],
            height: "4px",
          },
          "& .MuiSlider-track": {
            background: theme.palette.calculatorPrimary.main,
            height: "4px",
            border: "none",
          },
          "& .MuiSlider-thumb": {
            background: 'white',
            width: "28px",
            height: "28px",
          },
        }}
      />
    </>
  );
}
