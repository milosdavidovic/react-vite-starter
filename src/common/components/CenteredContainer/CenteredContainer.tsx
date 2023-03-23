import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  width?: string;
  maxWidth?: string;
}

const CenteredContainer: FC<Props> = ({ children, width, maxWidth }) => {
  const theme = useTheme();
  const matchesUpSM = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 4,
        width: matchesUpSM ? width : "100%",
        maxWidth,
        m: `${theme.spacing(8)} auto`,
        p: `${theme.spacing(4)} ${theme.spacing(6)}`,
      }}
    >
      {children}
    </Paper>
  );
};

export default CenteredContainer;
