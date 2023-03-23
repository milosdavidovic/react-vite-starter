import { Stack, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { authStorage } from "~/utils/auth/authStorage";

const GeneralError = () => {
  const { t } = useTranslation();

  return (
    <Stack sx={{ m: "48px auto", alignItems: "center", gap: 2 }}>
      <Typography variant="h5">{t("general.error.title")}</Typography>
      <Button
        variant="contained"
        onClick={() => {
          authStorage.clearAuthData();
          window.location.assign(window.location.origin);
        }}
      >
        {t("general.error.button")}
      </Button>
    </Stack>
  );
};

export default GeneralError;
