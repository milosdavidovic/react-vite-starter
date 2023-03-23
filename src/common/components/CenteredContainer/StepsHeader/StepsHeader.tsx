import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

interface Props {
  steps: number[];
  current: number;
}

const StepsHeader = ({ steps, current }: Props) => {
  return (
    <Box sx={{ width: "100%", mb: 8 }}>
      <Stepper activeStep={steps.indexOf(current)}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepsHeader;
