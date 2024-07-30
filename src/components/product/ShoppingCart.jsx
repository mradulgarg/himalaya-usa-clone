import { Box, Button, Grid, Typography } from "@mui/material";
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
    padding: "100px",
    borderTop: "0.1px solid #777777",
    borderBottom: "0.1px solid #777777",
    fontWeight: "900",
  },
  price: {
    color: "#A3B49B",
    fontWeight: "900",
  },
  anchor: {
    color: "black",
  },
}));

const ShoppingCart = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const classes = useStyles();
  const { email } = useSelector(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:3010/cart/getByEmail`, {
          email,
        });
        console.log(response.data, "deta");
        setDetails(response.data.map(item => ({ ...item, count: item.count || 1 })));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, [email]);

  const handleIncrease = (id) => {
    setDetails(details.map(detail => 
      detail.id === id ? { ...detail, count: detail.count + 1 } : detail
    ));
  };

  const handleDecrease = (id) => {
    setDetails(details.map(detail => 
      detail.id === id && detail.count > 1 ? { ...detail, count: detail.count - 1 } : detail
    ));
  };

  const handleDelete = async (productId) => {
    try {
      console.log("Attempting to delete item with email and _id:", email, productId);
      await axios.delete(`http://localhost:3010/cart/${email}/${productId}`);
      console.log("Successfully deleted item:", productId);
      setDetails(details.filter(detail => detail.productId !== productId));
    } catch (error) {
      console.error("Error deleting cart item:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <Grid
      container
      justifyContent={"center"}
      width={"1300px"}
      marginLeft={"7%"}
      gap={10}
    >
      <Typography>Shopping Cart</Typography>
      {details.map(detail => (
        <Grid
          key={detail.id}
          container
          justifyContent={"space-around"}
          flexWrap={"nowrap"}
          className={classes.card}
          item
        >
          <DeleteOutlineIcon onClick={() => handleDelete(detail.productId)} />
          <img src={detail.imageUrl} width={300} height={300} alt="" />
          <Typography variant="h6">{detail.name}</Typography>
          <Typography variant="h6" className={classes.price}>
            {detail.price}
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "150px",
              height: "50px",
              borderRadius: "30px",
              backgroundColor: "#f2f2f0",
              color: "black",
              "&:hover": {
                backgroundColor: "#f2f2f0",
              },
            }}
            startIcon={<RemoveIcon onClick={() => handleDecrease(detail.id)} />}
            endIcon={<AddIcon onClick={() => handleIncrease(detail.id)} />}
          >
            {detail.count}
          </Button>
          <Typography variant="h6" className={classes.price}>
            ${(parseFloat(detail.price.slice(1) || 0) * detail.count).toFixed(2)}
          </Typography>
        </Grid>
      ))}
    
      <Grid container item justifyContent={"space-between"}>
        <Link to="/" className={classes.anchor}>
          continue shopping
        </Link>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            color: "white",
            width: "50%",
            height: "20vh",
            backgroundColor: "#A3B49B",
            fontWeight: "400",
          }}
        >
          <Typography variant="h4">
            Grand Total:$
            {(details.reduce((total, detail) => total + (parseFloat(detail.price.slice(1) || 0) * detail.count), 0)).toFixed(2)}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ShoppingCart;
