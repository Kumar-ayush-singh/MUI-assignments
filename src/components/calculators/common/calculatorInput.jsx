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
import { useEffect, useRef, useState } from "react";

export default function CalculatorInput({
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

  const preState = useRef({
    cursorPosition: null,
    inputEl: null,
    key: null
  });

  const theme = useTheme();

  //for formating initial value
  useEffect(() => {
    if(formatValue){
      setCurrentValue( numberFormater(value, useDecimal) );
    }
  }, []);


  useEffect(() => {
    const cursorPos = preState.current.cursorPosition;
    const inputEl = preState.current.inputEl;
    if(cursorPos != null && inputEl){
      inputEl.setSelectionRange(cursorPos, cursorPos);
    }
  }, [currentValue, preState])

  
  const handleInputChange = (_event) => {
    const newInputValue = _event.target.value;
    let cursorPos = null;

    if(_event.target instanceof HTMLElement){
      preState.current.inputEl = _event.target;
      cursorPos = _event.target.selectionStart;
      preState.current.cursorPosition = cursorPos;
    }
   
    let filteredString = filterNumber(newInputValue, useDecimal);
    
    //if deleting digit if blocked by ','
    const preKey = preState.current.key;
    if(
      filteredString == filterNumber(currentValue, useDecimal) &&
      (preKey == 'Delete' || preKey == 'Backspace')
    ){
      const curValue = String(currentValue);
    if(preKey == 'Backspace'){
      filteredString = filterNumber(
        curValue.substring(0, cursorPos - 1) +
        curValue.substring(cursorPos),
        useDecimal,
      )
    }
    else{
      filteredString = filterNumber(
        curValue.substring(0, cursorPos) +
        curValue.substring(cursorPos + 2),
        useDecimal,
        )
      }
    }

    const filteredNumber = Number(filteredString);
    let acceptedValue = filteredString;
  
    //for validation
    let isValueValid = false;
    if(filteredNumber >= max){
      acceptedValue = max;
    } else if(filteredNumber < min){
      isValueValid = true;
    }
    
    //if value to be formated
    if(formatValue){
      const newFormatedNumber = numberFormater(acceptedValue, true, useDecimal);
      setCurrentValue(newFormatedNumber);
  
      //for restoring crusor position, distrupted by formatting
      const lenDifference = newFormatedNumber.length - currentValue.length;
      if( Math.abs(lenDifference) == 2 ){
        preState.current.cursorPosition += (
          (lenDifference)/2
        );
      }
    } else{
      setCurrentValue(acceptedValue);
    }
  
    //sending data to parent element with accepted value as number
    onChange(_event, acceptedValue == max ? max : filteredNumber);
    setError(isValueValid);

  }

  function handleKeyDown(_event){
    if (_event.isComposing || _event.keyCode === 229) {
      return;
    }
    preState.current.key = _event.key;
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
            onKeyDown={handleKeyDown}
            placeholder="0"
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
