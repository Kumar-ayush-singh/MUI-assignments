import { Error } from "@mui/icons-material";
import {
  Box,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CustomTooltip } from "./customTooltip";

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
              background: error ? "#fae9e5" : "#e5faf5",
              "& fieldset": {
                display: "none",
              },
              "& svg, & input, & .MuiInputBase-root": {
                color: error ? "#d32f2f" : "#00d09c",
                textAlign: "right",
              },
            }}
          />
        </Box>
      </Stack>


      <Slider
        min={min}
        max={max}
        value={value}
        step={step ? step : undefined}
        onChange={onChange}
        sx={{
          "& .MuiSlider-rail": {
            background: "#ecedef",
            height: "4px",
          },
          "& .MuiSlider-track": {
            background: "#00d09c",
            height: "4px",
            border: "none",
          },
          "& .MuiSlider-thumb": {
            background: "white",
            width: "28px",
            height: "28px",
          },
        }}
      />
    </>
  );
}
