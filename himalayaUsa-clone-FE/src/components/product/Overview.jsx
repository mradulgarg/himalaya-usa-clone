import { Button, Grid, Typography } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Overview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [count, setCount] = useState(1);
  const { email } = useSelector((state) => state.user);

  const addToCart = async () => {
    try {
      const { name, price, imageUrl, _id } = details;
      const response = await axios.post(
        `https://himalaya-usa-clone.onrender.com/cart`,
        {
          email,
          name,
          price,
          count,
          imageUrl,
          productId: _id,
        }
      );

      console.log(response.data);
      navigate(`/cart`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const updateProductCount = async (id, count) => {
    try {
      const response = await axios.put(
        `https://himalaya-usa-clone.onrender.com/products/${id}`,
        {
          count,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating product count:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://himalaya-usa-clone.onrender.com/products/${id}`
        );
        console.log(response.data, "deta");
        setDetails(response.data);
        setCount(response.data.count || 1);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleIncrease = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      updateProductCount(id, newCount);
      return newCount;
    });
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount((prev) => {
        const newCount = prev - 1;
        updateProductCount(id, newCount);
        return newCount;
      });
    }
  };

  return (
    <Grid container spacing={2} padding={2} justifyContent="center">
      <Grid item xs={12} md={6} lg={4} container justifyContent="center">
        <img
          src={details?.imageUrl}
          width="100%"
          height="auto"
          style={{ maxWidth: "400px", maxHeight: "500px" }}
          alt={details?.name}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {details && (
          <>
            <Typography
              variant="h4"
              sx={{ fontWeight: "900", marginBottom: 2 }}
            >
              {details.name} <br />
              {details.price}
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    borderRadius: "30px",
                    backgroundColor: "#f2f2f0",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#f2f2f0",
                    },
                  }}
                  startIcon={<RemoveIcon onClick={handleDecrease} />}
                  endIcon={<AddIcon onClick={handleIncrease} />}
                >
                  {count}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "30px",
                    backgroundColor: "#1A4448",
                    "&:hover": {
                      backgroundColor: "#A3B49B",
                    },
                  }}
                  startIcon={<LocalMallIcon />}
                  onClick={addToCart}
                >
                  Add To Cart
                </Button>
              </Grid>
            </Grid>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {details.description}
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Overview;
