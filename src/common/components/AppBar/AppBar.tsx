import React, { MouseEvent, useState } from "react";
import { AccountCircle, Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import darkImage from "~/assets/images/vl-logo-white.svg";

import { useAuthContext } from "~/contexts/AuthContext/AuthContext";

const AppBar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { me, logout } = useAuthContext();
  const { firstName, lastName } = me || {};

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: "80px", p: `0 ${theme.spacing(8)}`, backgroundColor: theme.palette.primary.dark }}
    >
      <a href="/">
        <Stack>
          <img src={darkImage} alt="logo" style={{ height: "50px", width: "100px" }} />
        </Stack>
      </a>
      {me ? (
        <React.Fragment>
          <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
            <Box sx={{ overflow: "hidden", textOverflow: "ellipsis", width: 300 }}>
              <Typography noWrap textAlign="right" color={theme.palette.getContrastText(theme.palette.primary.dark)}>
                Hi, {firstName} {lastName}
              </Typography>
            </Box>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <AccountCircle />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 1,
              sx: {
                minWidth: 250,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      ) : null}
    </Stack>
  );
};

export default AppBar;
