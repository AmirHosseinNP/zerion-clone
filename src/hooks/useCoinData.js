import {useMoralis, useMoralisCloudFunction} from "react-moralis";
import {useEffect, useMemo, useState} from "react";
import coinGeckoList from '../data/coinGeckoList.json';
import {tokenValue, tokenValueText} from "../utils";

export function useCoinData() {
  const {user} = useMoralis();
  const userAddress = useMemo(() => user?.attributes.ethAddress, [user]);
  const {data: tokens, isLoading} = useMoralisCloudFunction('getTokens', {userAddress});
  const [coinList, setCoinList] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    (async () => {
      if (!tokens?.length) {
        setCoinList([]);
        return;
      }

      // get the token ids from coinGeckoList.json
      const ids = tokens
        .map(token => coinGeckoList.find(c => c.symbol === token.symbol.toLowerCase())?.id)
        .filter(id => Boolean(id))
        .join(',');

      // fetching the market data of token ids from url
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`;
      const result = await (await fetch(url)).json();
      const marketData = {};
      result.forEach(r => marketData[r.symbol.toUpperCase()] = r);

      // integrate cloud function data(tokens) and market data
      let totalBalance = 0;
      const newList = tokens.map(token => {
        const output = {...token};
        const tokenData = marketData[token.symbol.toUpperCase()];
        output.price = +tokenData?.current_price || 0;
        output.image = tokenData?.image;
        output.amount = tokenValue(+output.balance, +output.decimals);
        output.value = output.price ? output.amount * output.price : 0;
        totalBalance += output.value;
        output.valueTxt = tokenValueText(+output.balance, +output.decimals, output.symbol);
        return output;
      });

      console.log('newList: ', newList);
      setCoinList(newList);
      setPortfolioValue(totalBalance);
    })();
  }, [tokens]);

  return {coinList, isLoading, portfolioValue};
}