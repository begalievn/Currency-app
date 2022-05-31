import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/system";

const drawerWidth = 240;

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    {
      text: "Currency List",
      path: "/",
    },
    {
      text: "Converter",
      path: "/converter",
    },
  ];

  return (
    <div className="layout">
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          height: "60px",
          ml: `${drawerWidth}px`,
        }}
        elevation={0}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontSize: "120%", fontWeight: "bold" }}
          >
            {location.pathname === "/" ? "Currency List" : "Converter"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        elevation={1}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box mt={2} ml={2}>
          <Typography variant="h5">Currency app</Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => {
                navigate(item.path);
              }}
              sx={
                location.pathname === item.path
                  ? { background: "#f3f3f3" }
                  : null
              }
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginTop: "70px",
        }}
      >
        {children}
      </Box>
    </div>
  );
}

export default Layout;
