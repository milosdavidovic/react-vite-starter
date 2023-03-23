import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Fab, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  onBack: () => void;
}

const BackButton = ({ onBack }: Props) => {
  const theme = useTheme();
  const matchesUpSM = useMediaQuery(theme.breakpoints.up("md"));
  const { t } = useTranslation();

  return matchesUpSM ? (
    <Box position="relative">
      <Fab
        sx={{ position: "absolute", left: -120, top: -8 }}
        size="small"
        color="secondary"
        aria-label={t("registration.backButton")}
        onClick={onBack}
      >
        <ArrowBack />
      </Fab>
    </Box>
  ) : (
    <Button sx={{ mb: 4 }} variant="contained" color="secondary" onClick={onBack} fullWidth startIcon={<ArrowBack />}>
      {t("registration.backButton")}
    </Button>
  );
};

export default BackButton;
