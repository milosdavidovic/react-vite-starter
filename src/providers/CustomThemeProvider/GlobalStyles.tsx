import { GlobalStyles, GlobalStylesProps } from "@mui/material";

const VLGlobalStyles = () => {
  const styles: GlobalStylesProps["styles"] = () => ({
    "#root": {
      minHeight: "100vh",
    },
  });

  return <GlobalStyles styles={styles} />;
};

export default VLGlobalStyles;
