import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  card: {
    padding: "20px",
    borderTop: "0.1px solid #777777",
    borderBottom: "0.1px solid #777777",
    fontWeight: "900",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "@media (max-width: 960px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  price: {
    color: "#A3B49B",
    fontWeight: "900",
  },
  anchor: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
  },
  totalBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: "20vh",
    backgroundColor: "#A3B49B",
    fontWeight: "400",
    padding: "1rem",
    borderRadius: "8px",
    "@media (max-width: 600px)": {
      width: "100%",
      height: "auto",
      fontSize: "1rem",
    },
  },
  img: {
    width: "150px",
    height: "150px",
    "@media (max-width: 600px)": {
      width: "100%",
      height: "auto",
    },
  },
  button: {
    width: "150px",
    height: "50px",
    borderRadius: "30px",
    backgroundColor: "#f2f2f0",
    color: "black",
    "&:hover": {
      backgroundColor: "#f2f2f0",
    },
    "@media (max-width: 600px)": {
      width: "100%",
      height: "auto",
      fontSize: "1rem",
    },
  },
}));

const theme = createTheme();

const ShoppingCart = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const classes = useStyles();
  const { email } = useSelector((state) => state.user);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://himalaya-usa-clone.onrender.com/cart/getByEmail`,
          {
            email,
          }
        );
        setDetails(
          response.data.map((item) => ({ ...item, count: item.count || 1 }))
        );
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, [email]);

  const handleIncrease = (productId) => {
    setDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.productId === productId
          ? { ...detail, count: detail.count + 1 }
          : detail
      )
    );
  };

  const handleDecrease = (productId) => {
    setDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.productId === productId && detail.count > 1
          ? { ...detail, count: detail.count - 1 }
          : detail
      )
    );
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://himalaya-usa-clone.onrender.com/cart/${email}/${productId}`
      );
      setDetails((prevDetails) =>
        prevDetails.filter((detail) => detail.productId !== productId)
      );
    } catch (error) {
      console.error(
        "Error deleting cart item:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent={"center"}
        width={"100%"}
        padding={"2rem"}
        gap={3}
      >
        <Typography variant="h4">Shopping Cart</Typography>
        {details.map((detail) => (
          <Grid
            key={detail.productId}
            container
            justifyContent={isSmallScreen ? "center" : "space-around"}
            flexWrap={isSmallScreen ? "wrap" : "nowrap"}
            className={classes.card}
            item
          >
            <DeleteOutlineIcon onClick={() => handleDelete(detail.productId)} />
            <img
              src={detail.imageUrl}
              className={classes.img}
              alt={detail.name}
            />
            <Typography variant="h6">{detail.name}</Typography>
            <Typography variant="h6" className={classes.price}>
              {detail.price}
            </Typography>
            <Button
              variant="outlined"
              className={classes.button}
              startIcon={
                <RemoveIcon onClick={() => handleDecrease(detail.productId)} />
              }
              endIcon={
                <AddIcon onClick={() => handleIncrease(detail.productId)} />
              }
            >
              {detail.count}
            </Button>
            <Typography variant="h6" className={classes.price}>
              $
              {(parseFloat(detail.price.slice(1) || 0) * detail.count).toFixed(
                2
              )}
            </Typography>
          </Grid>
        ))}

        <Grid container item justifyContent={"space-between"}>
          <Link to="/products/all" className={classes.anchor}>
            Continue shopping
          </Link>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            className={classes.totalBox}
          >
            <Typography variant="h4">
              Grand Total: $
              {details
                .reduce(
                  (total, detail) =>
                    total +
                    parseFloat(detail.price.slice(1) || 0) * detail.count,
                  0
                )
                .toFixed(2)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ShoppingCart;
