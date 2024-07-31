import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  shop: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A3B49B",
    color: "white",
    "&:hover": {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      padding: "0 10px",
      width: "auto",
      height: "40px",
      backgroundColor: "#A3B49B",
      cursor: "pointer",
      "&::after": {
        content: '"Add To Cart"',
      },
    },
  },
  links: {
    "& a": {
      textDecoration: "none",
      color: "#777777",
      fontSize: "16px",
      fontWeight: "500",
      "&:hover": {
        color: "#A3B49B",
      },
    },
  },
}));

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const classes = useStyles();
  const { category } = useParams();
  const naviagte = useNavigate();
  const [pageCount, setPageCount] = useState(10);
  const [sorting, setSorting] = useState(1);

  const normalizeCategory = (category) => {
    return category
      .replace(/-/g, " ") // Replace hyphens with spaces
      .replace(/_/g, " ") // Replace underscores with spaces
      .toLowerCase() // Convert to lowercase
      .trim(); // Trim any extra spaces
  };

  useEffect(() => {
    const parsePrice = (priceStr) => {
      return parseFloat(priceStr?.replace(/[^0-9.-]+/g, ""));
    };
    if (sorting === 0) {
      const sortedData = data.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);

        return priceA - priceB;
      });
      setData(sortedData);
    }

    if (sorting === 1) {
      const sortedData = data.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);

        return priceB - priceA;
      });
      console.log(sortedData, "dat");
      setData(sortedData);
    }
  }, [sorting, data]);
  useEffect(() => {
    axios
      .get("https://himalaya-usa-clone.onrender.com/products")
      .then((response) => {
        if (category !== "all") {
          setData(
            response.data.filter(
              (res) =>
                res.category == normalizeCategory(category) ||
                res.subCategory == normalizeCategory(category)
            )
          );
        } else {
          setData(response.data);
        }
        console.log(
          response.data.filter(
            (res) =>
              res.category === normalizeCategory(category) ||
              res.subCategory === normalizeCategory(category)
          ),
          normalizeCategory(category),
          "filter"
        );
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading products</Typography>;

  const displayedProducts = showAll ? data : data.slice(0, pageCount);

  return (
    <>
      <Typography variant="h4" textAlign={"center"}>
        Products
      </Typography>
      <Grid
        container
        paddingRight={20}
        marginTop={2}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Typography></Typography>
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sorting}
            label="sorting"
            size="small"
            onChange={(e) => setSorting(e.target.value)}
            sx={{
              border: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value={1}>Price Ascending</MenuItem>
            <MenuItem value={0}>Price Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pageCount}
            label="count"
            size="small"
            onChange={(e) => setPageCount(e.target.value)}
            sx={{
              border: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid display={"flex"} justifyContent={"space-around"} marginTop={5}>
        <Grid item>
          <Typography variant="h6">Health Category</Typography>
          <Grid
            className={classes.links}
            display={"flex"}
            flexDirection={"column"}
            lineHeight={2}
            marginTop={2}
          >
            <Link to="/products/herbal-supplements">Herbal Supplements</Link>
            <Link to="/products/health-interests">Health Interests</Link>
            <Link to="/products/oral-care">Oral Care</Link>
            <Link to="/products/personal-care">Personal Care</Link>
          </Grid>
        </Grid>
        <Grid
          container
          item
          display={"flex"}
          flexDirection={"row"}
          width={1000}
        >
          {displayedProducts.map((product, index) => (
            <Grid key={index}>
              <Box
                width={220}
                height={220}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                m={1}
                onClick={() => naviagte(`/overview/${product._id}`)}
              >
                <img
                  width={220}
                  height={220}
                  src={product.imageUrl}
                  alt={product.name.slice(0, 20)}
                  style={{ cursor: "pointer" }}
                />
              </Box>
              <Typography>{product.name.slice(0, 20)}</Typography>
              <Grid
                display={"flex"}
                gap={2}
                onClick={() => naviagte(`/overview/${product._id}`)}
              >
                <Box className={classes.shop}>
                  <LocalMallIcon />
                </Box>
                <Typography>{product.price}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid display="flex" justifyContent="center" marginTop={3}>
        {!showAll && (
          <Button
            variant="outlined"
            sx={{
              color: "black",
              borderColor: "black",
              "&:hover": {
                color: "black",
                borderColor: "black",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            onClick={() => setShowAll(true)}
          >
            Show More
          </Button>
        )}
      </Grid>
    </>
  );
};

export default Product;
