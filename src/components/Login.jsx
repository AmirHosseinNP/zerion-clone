import React, {useRef, useState} from "react";
import {useMoralis} from "react-moralis";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Zoom, Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {getEllipsesText} from "../utils";
import Metamask from './WalletIcons/metamaskWallet.png';
import WalletConnect from './WalletIcons/wallet-connect.svg';

const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
  },
];

const Login = () => {
  const {isAuthenticated, authenticate, user, logout} = useMoralis();
  const [open, setOpen] = useState(false);
  const loginBtn = useRef(null);

  const handleLogin = async connectorId => {
    await authenticate({provider: connectorId});
    setOpen(false);
  }

  if (!isAuthenticated) {
    return (
      <Box display="flex" justifyContent="center" p={1}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
          ref={loginBtn}
        >
          connect
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Zoom}
          keepMounted
          onClose={() => setOpen(false)}
          aria-describedby="Connect your wallet"
          maxWidth="xs"
          fullWidth
        >
          <CloseIcon
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              cursor: "pointer",
              color: "grey.300",
              transition: "color .3s ease-out",
              "&:hover": {
                color: "text.primary",
              },
            }}
            onClick={() => setOpen(false)}
          />
          <DialogTitle sx={{textAlign: "center", mb: 2}}>
            Connect Wallet
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
            {connectors.map(({title, icon, connectorId}, i) => (
                <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                key={i}
                gap={1}
                sx={{cursor: 'pointer'}}
                onClick={() => handleLogin(connectorId)}
                >
                  <img
                    src={icon}
                    alt={title}
                    height="35"
                  />
                  <Typography variant="body1">{title}</Typography>
                </Box>
              ))}
          </DialogContent>
        </Dialog>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" p={1}>
      <Button color="primary" variant="contained" onClick={logout}>
        {getEllipsesText(user?.attributes.ethAddress)}
        <CloseIcon fontSize="small"/>
      </Button>
    </Box>
  );
};

export default Login;
