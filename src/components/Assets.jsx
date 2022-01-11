import React from 'react';
// components
import {Avatar, Box, Card, CardContent, Typography} from "@mui/material";
import Login from "./Login";
//hooks
import {useCoinData} from "../hooks/useCoinData";
// icons
import PieChartIcon from '@mui/icons-material/PieChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// utilities
import {c2} from "../utils";

const Assets = () => {
  const {coinList, portfolioValue, isLoading} = useCoinData();

  if (!coinList || !coinList.length || isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        px={4}
        py={2}
        justifyContent="center"
        flexGrow={1}
      >
        <Typography color="text.primary" variant="h4" gutterBottom>Moralis Zerion Clone</Typography>
        <Typography color="text.primary" mb={1}>Connect an Ethereum wallet to manage your portfolio</Typography>
        <Login/>
      </Box>
    )
  }

  return (
    <Box px={4} py={2} flex="1 1 auto">
      <Box>
        <Typography variant="h5" gutterBottom color="text.primary" display="flex" gap={1} alignItems="center">
          {c2.format(portfolioValue)}
          <PieChartIcon fontSize="small"/>
        </Typography>
      </Box>
      <Card variant="outlined" sx={{bgcolor: 'transparent'}}>
        <CardContent>
          <Typography gutterBottom>All Assets</Typography>
          {coinList.map((coin, i) => {
            return (
              <Box display="flex" justifyContent="space-between" mb={2} key={i}>
                <Box display="flex">
                  <Box display="flex" alignItems="center">
                    {coin.image ? (
                        <Avatar
                          sx={{width: '2rem', height: '2rem'}}
                          src={coin.image}
                          alt={coin.symbol}
                        />
                      ) :
                      (
                        <Avatar>
                          <MonetizationOnIcon fontSize="large"/>
                        </Avatar>
                      )}
                  </Box>
                  <Box display="flex" flexDirection="column" ml={1}>
                    <Typography variant="subtitle2">{coin.name}</Typography>
                    <Typography variant="body1">
                      {coin.valueTxt} {c2.format(coin.price)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Assets;