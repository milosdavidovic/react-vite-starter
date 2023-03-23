import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate("/");
  };

  return (
    <Stack sx={{ justifyContent: "space-around", alignItems: "center", height: "100%" }}>
      <Stack sx={{ gap: 4, width: "400px" }}>
        <Typography variant="h4" textAlign="center">
          Page Not Found
        </Typography>
        <Typography variant="body1" textAlign="center">
          Sorry, but the page you are looking for doesn&apos;t exist.
        </Typography>
        <Button onClick={onHomeClick}>Go home</Button>
      </Stack>
    </Stack>
  );
};

export default NotFound;
