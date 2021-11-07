import { createContext, useContext, useState, useEffect } from "react";
import { CoinList } from "./config/api";
import axios from "axios";
import { auth } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const getCoinsList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  //Since this will run everytime the currency is changed, we add currency as a dependency
  useEffect(() => {
    if (currency === "USD") {
      setSymbol("$");
    } else if (currency === "MXN") {
      setSymbol("MX$");
    }
  }, [currency]);
  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        getCoinsList,
        alert,
        setAlert,
        user,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
