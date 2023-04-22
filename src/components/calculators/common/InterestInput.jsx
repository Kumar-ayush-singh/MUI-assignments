import Error from "@mui/icons-material/Error";
import Stack from  '@mui/material/Stack'
import Typography from  '@mui/material/Typography'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'


import { CustomTooltip } from "./customTooltip";
import useTheme from "@mui/material/styles/useTheme";

export default function InterestInput({
  value,
  onChange,
  label,
  inputStartAdornment,
  inputEndAdornment,
  min,
  max,
  step,
  error,
}) {

  const theme = useTheme();

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
            value={value}
            onChange={onChange}
            size="small"
            sx={{
              border: "none",
              background: error ? theme.palette.calcInput.error.bg : theme.palette.calcInput.textField.bg,
              "& fieldset": {
                display: "none",
              },
              "& svg, & input, & .MuiInputBase-root": {
                color: error ? theme.palette.calcInput.error.text : theme.palette.calcInput.textField.text,
                textAlign: "right",
              },
            }}
          />
        </Box>
      </Stack>


      <Slider
        min={min}
        max={max}
        value={Number(String(value).replaceAll(',', ''))}
        step={step ? step : undefined}
        onChange={onChange}
        sx={{
          "& .MuiSlider-rail": {
            background: theme.palette.calcInput.slider.rail,
            height: "4px",
          },
          "& .MuiSlider-track": {
            background: theme.palette.calcInput.slider.track,
            height: "4px",
            border: "none",
          },
          "& .MuiSlider-thumb": {
            background: theme.palette.calcInput.slider.thumb,
            width: "28px",
            height: "28px",
          },
        }}
      />
    </>
  );
}
