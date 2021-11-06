import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { useState, useEffect } from "react";
import axios from "axios";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = CryptoState;

  //Destructuring data using {data} or else we would have to do data.data from the API
  // useEffect(() => {
  //   const getCoinsList = async () => {
  //     setLoading(true);
  //     const { data } = await axios.get(CoinList(currency));
  //     setCoins(data);
  //     setLoading(false);
  //     console.log(coins);
  //   };
  //   getCoinsList();
  // }, [currency]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };
  console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return <div>coins table</div>;
};

export default CoinsTable;
