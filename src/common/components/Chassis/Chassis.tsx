import React, { PropsWithChildren } from "react";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import AppBar from "../AppBar";

const Chassis: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      display="grid"
      gridTemplateRows="80px 1fr 80px"
      sx={{ height: "100vh", maxWidth: "100vw", overflowX: "hidden", overflowY: "overlay" }}
    >
      <Box gridColumn="span 12">
        <AppBar />
      </Box>
      <Box gridColumn="span 12">
        <Stack sx={{ p: `0 ${theme.spacing(2)} ${theme.spacing(4)} ${theme.spacing(2)}`, height: "100%" }}>
          {children}
        </Stack>
      </Box>
      <Box gridColumn="span 12">
        <Divider />
        <Stack
          sx={{
            justifyContent: "center",
            height: "79px", // 1px for the Divider
            gap: 1,
          }}
        >
          <Typography variant="body1" align="center">
            21000 Novi Sad, Serbia
          </Typography>
          <Typography variant="body1" align="center">
            Copyright © {new Date().getFullYear()} All rights reserved.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Chassis;
