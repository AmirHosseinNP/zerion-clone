import React, {useEffect, useState} from 'react';
import {Box, Button, Divider, Drawer, Fab} from "@mui/material";
import Login from "./Login";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MenuIcon from "@mui/icons-material/Menu";

const SideNav = () => {
  const [showNav, setShowNav] = useState(false);
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const [matchMedia, setMatchMedia] = useState(mediaQuery.matches);

  useEffect(() => {
    const handelResize = () => {
      setMatchMedia(mediaQuery.matches);
    }

    window.addEventListener('resize', handelResize);

    return () => window.removeEventListener('resize', handelResize);
  }, [mediaQuery]);

  return (
    <>
      <Drawer
        open={!matchMedia ? true : showNav}
        variant={matchMedia ? 'temporary' : 'persistent'}
        sx={{
          width: !matchMedia ? 240 : 0,
          '& .MuiDrawer-paper': {
            bgcolor: 'transparent',
            width: 240,
          }
        }}
        onClose={() => setShowNav(false)}
      >
        <Box p={1}>
          <Login/>
        </Box>
        <Divider/>
        <Button
          startIcon={<RemoveRedEyeIcon/>}
          sx={{
            color: 'grey.400',
            justifyContent: 'flex-start',
            px: 3,
            py: 2,
            gap: 1,
            '&:hover': {
              color: 'text.primary'
            }
          }}
        >
          History
        </Button>
      </Drawer>
      {
        matchMedia &&
        <Fab
          color="primary"
          aria-label="open side nav"
          sx={{position: 'fixed', right: 40, bottom: 30, zIndex: 'tooltip'}}
          onClick={() => setShowNav(prev => !prev)}
        >
          <MenuIcon/>
        </Fab>
      }
    </>
  );
};

export default SideNav;