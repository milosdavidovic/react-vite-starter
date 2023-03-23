import { Backdrop, CircularProgress } from "@mui/material";

const LoaderFullScreen = () => {
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoaderFullScreen;
