import React from 'react';
// components
import Assets from "./components/Assets";
import {Box, createTheme, ThemeProvider} from "@mui/material";
// icons
import SideNav from "./components/SideNav";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor="grey.800" minHeight="100vh" display="flex">
        <SideNav/>
        <Assets/>
      </Box>
    </ThemeProvider>
  )
    ;
};

export default App;