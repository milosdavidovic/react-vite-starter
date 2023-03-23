import { Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
}

const TitleHeader = ({ title }: Props) => {
  return (
    <Typography variant="h4" align="center" sx={{ mb: 4, mt: 0 }}>
      {title}
    </Typography>
  );
};

export default TitleHeader;
