import { ArrowRightAltSharp } from "@mui/icons-material";
import { Box, Button, Link, Paper, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { generateLoginItems } from "~/utils";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLoginClick = () => {
    const { loginUrl, codeVerifier } = generateLoginItems();
    // writing pkce code verifier to storage so it is available for token request
    sessionStorage.setItem(`codeVerifier`, codeVerifier);
    // navigate to AWS Cognito hosted UI page
    window.location.assign(loginUrl);
  };

  return (
    <Box sx={{ m: `${theme.spacing(8)} auto`, maxWidth: 600, width: "100%" }}>
      <Paper sx={{ p: 4, borderRadius: 4 }} elevation={1}>
        <Typography variant="h4" align="center">
          {t("login.header")}
        </Typography>
        <Stack sx={{ gap: 1, mt: 8 }}>
          <Button variant="contained" endIcon={<ArrowRightAltSharp />} onClick={handleLoginClick}>
            <Stack sx={{ ml: 4, mr: 4 }}>
              <Typography variant="body1">{t("login.signIn.title")}</Typography>
              <Typography variant="body2">{t("login.signIn.subTitle")}</Typography>
            </Stack>
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              navigate("register");
            }}
          >
            {t("login.createAccountButton")}
          </Button>
        </Stack>
        <Stack sx={{ mt: 2 }}>
          <Stack flexDirection={"row"} gap={1}>
            <Typography>{t("login.needHelp")}</Typography>
            <Link variant="body1" href="#">
              {t("login.contactSupport")}
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginPage;
