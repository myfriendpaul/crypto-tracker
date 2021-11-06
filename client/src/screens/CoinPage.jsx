import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import CoinInfo from "../components/CoinInfo/CoinInfo";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const getCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    };
    getCoin();
  }, []);
  console.log(coin);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
