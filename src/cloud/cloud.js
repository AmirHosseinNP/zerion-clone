Moralis.Cloud.define('getTokens', async req => {
  const logger = Moralis.Cloud.getLogger();
  const {userAddress} = req.params;
  if (!userAddress) return [];

  const tokenQuery = new Moralis.Query('EthTokenBalance');
  tokenQuery.equalTo('address', userAddress);
  const tokenResult = await tokenQuery.find();

  const results = tokenResult.map(token => token.attributes);

  const balQuery = new Moralis.Query('EthBalance');
  balQuery.equalTo('address', userAddress);
  const balResult = await balQuery.first();
  logger.info('balResult: ' + balResult);

  results.push({
    name: "Ethereum",
    symbol: "ETH",
    balance: balResult.get('balance'),
    decimals: 18
  });

  return results;
});