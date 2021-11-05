import { makeStyles } from "@material-ui/core";
import { Container, Typography } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
    // backgroundSize: "cover",
    // backgroundPosition: "center center",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  heroText: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.heroText}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Cryptonite
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              fontFamily: "Montserrat",
            }}
          >
            Changing the Way you track Cryptocurrency
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
