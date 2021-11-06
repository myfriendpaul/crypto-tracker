import { createContext, useContext, useState, useEffect } from "react";

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  //Since this will run everytime the currency is changed, we add currency as a dependency
  useEffect(() => {
    if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
