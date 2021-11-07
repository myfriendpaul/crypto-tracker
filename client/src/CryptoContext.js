import { createContext, useContext, useState, useEffect } from "react";
import { CoinList } from "./config/api";
import axios from "axios";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { doc, onSnapshot } from "@firebase/firestore";
const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      //We don't want a lot of snapshots. After its done we want to unsubscribe from it once the component is unmounted.
      let unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("Watchlist is empty");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);
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
        watchlist,
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
