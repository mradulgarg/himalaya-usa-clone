import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Breadcrumbs,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/userSlices";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  dropdownContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "rgb(106, 134, 106)",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
}));

const Navbar = () => {
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [shopEl, setShopEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState(null);
  const [serachEnable, setSerachEnable] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleShopMenuOpen = (event) => {
    setShopEl(event.currentTarget);
  };

  const handleShopMenuClose = () => {
    setShopEl(null);
  };

  const handleShopClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    navigate("/products/all");
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const breadcrumbs = location.pathname.split("/").filter((path) => path);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          backgroundColor: "#ff7451",
          color: "white",
        }}
      >
        <h2>FREE SHIPPING</h2> <p>ON ALL ORDERS OVER $35!</p>
      </div>
      <AppBar
        position="static"
        style={{
          backgroundColor: "white",
          color: "#777777",
          boxShadow: "none",
          padding: "20px 0px",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="#777777"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "#777777" }}>
              <img
                src="https://himalayausa.com/cdn/shop/files/Himalaya_Logo_-_Since_1930_CMYK_-_Reduced_500x.png?v=1673635210"
                alt="Himalaya Logo"
                style={{ height: "50px" }}
              />
            </Link>
          </Typography>
          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                right: "60%",
                gap: "30px",
              }}
            >
              {!serachEnable ? (
                <>
                  <Link
                    to="/products/all"
                    style={{
                      marginRight: "5px",
                      textDecoration: "none",
                      color: "#777777",
                      fontSize: "18px",
                      "&:hover": {
                        color: "#A3B49B",
                      },
                    }}
                    onClick={handleShopClick}
                    onMouseEnter={handleShopMenuOpen}
                  >
                    Shop
                  </Link>
                  <Link
                    to="/about"
                    style={{
                      marginRight: "5px",
                      textDecoration: "none",
                      color: "#777777",
                      fontSize: "18px",
                      "&:hover": {
                        color: "#A3B49B",
                      },
                    }}
                  >
                    About
                  </Link>
                  <Link
                    to="#"
                    style={{
                      marginRight: "5px",
                      textDecoration: "none",
                      color: "#777777",
                      fontSize: "18px",
                      "&:hover": {
                        color: "#A3B49B",
                      },
                    }}
                  >
                    Store Locator
                  </Link>
                </>
              ) : (
                <TextField
                  fullWidth
                  name="search"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSearchValue(e.target.value);
                      navigate(`/products/${e.target.value}`);
                    } else {
                      setSearchValue("");
                      setSerachEnable(false);

                      navigate("/products/all");
                    }
                  }}
                />
              )}
            </div>
          )}
          <IconButton
            color="#777777"
            onClick={() => setSerachEnable((prev) => !prev)}
          >
            <Tooltip title="Search">
              <SearchOutlinedIcon />
            </Tooltip>
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Tooltip title={email ? "Account" : "Register"}>
              <PersonOutlineOutlinedIcon />
            </Tooltip>
          </IconButton>
          <Menu
            anchorEl={shopEl}
            open={Boolean(shopEl)}
            onClose={handleShopMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                width: "100vw",
                maxWidth: "100vw",
                mt: 5,
                boxShadow: "none",
              },
            }}
            onMouseLeave={handleShopMenuClose}
          >
            <Box sx={{ display: "flex", height: "70vh" }}>
              <Box
                sx={{
                  flex: "1 1 50%",
                  p: 2,
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }}
                className={classes.dropdownContainer}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "10%",
                    height: "80%",
                  }}
                >
                  <Box sx={{ flex: "1", paddingLeft: "4%", color: "#777777" }}>
                    <Typography
                      variant="h6"
                      component={Link}
                      to="/products/herbal-supplements"
                      className={classes.sectionTitle}
                      sx={{
                        textDecoration: "none",
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                      onClick={handleShopMenuClose}
                    >
                      Herbal Supplements
                    </Typography>
                    <MenuItem
                      component={Link}
                      onClick={handleShopMenuClose}
                      to="/products/health-interests"
                      sx={{
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                    >
                      Single Herb Supplements
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      onClick={handleShopMenuClose}
                      to="/products/energy-vitality"
                      sx={{
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                    >
                      Multi-Ingredient Supplements
                    </MenuItem>
                  </Box>
                  <Box sx={{ flex: "1", color: "#777777" }}>
                    <Typography
                      variant="h6"
                      component={Link}
                      to="/products/oral-care"
                      className={classes.sectionTitle}
                      sx={{
                        textDecoration: "none",
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                      onClick={handleShopMenuClose}
                    >
                      Oral Care
                    </Typography>
                    <MenuItem
                      component={Link}
                      onClick={handleShopMenuClose}
                      to="/products/adult-toothpaste"
                      sx={{
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                    >
                      Adult Toothpaste
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      onClick={handleShopMenuClose}
                      to="/products/kids-toothpaste"
                      sx={{
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                    >
                      Kids Toothpaste
                    </MenuItem>
                  </Box>
                  <Box sx={{ flex: "1", color: "#777777" }}>
                    <Typography
                      variant="h6"
                      className={classes.sectionTitle}
                      component={Link}
                      to="/products/personal-care"
                      sx={{
                        textDecoration: "none",
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                      onClick={handleShopMenuClose}
                    >
                      Personal Care
                    </Typography>
                    <MenuItem
                      component={Link}
                      onClick={handleShopMenuClose}
                      to="/products/face-care"
                      sx={{
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                    >
                      Face Care
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      onClick={handleShopMenuClose}
                      to="/products/cleansing-bars"
                      sx={{
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                    >
                      Cleansing Bars
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      onClick={handleShopMenuClose}
                      to="/products/balm"
                      sx={{
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                    >
                      Balm
                    </MenuItem>
                  </Box>
                  <Box sx={{ flex: "1", paddingLeft: "4%", color: "#777777" }}>
                    <hr style={{ color: "#777777", marginBottom: "4%" }} />
                    <Typography
                      variant="h6"
                      className={classes.sectionTitle}
                      component={Link}
                      to="/products/health-interests"
                      sx={{
                        textDecoration: "none",
                        "&:hover": {
                          color: "#A3B49B",
                        },
                      }}
                      onClick={handleShopMenuClose}
                    >
                      Health Interests
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/blood-sugar"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Blood Sugar
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/brain-cognitive"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Brain & Cognitive
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/digestion"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Digestion
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/energy-vitality"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Energy & Vitality
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/hair-skin-nails"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Hair, Skin & Nails
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/heart-cardio"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Heart & Cardio
                        </MenuItem>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/immune-support"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Immune Support
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/joint-mobility"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Joint & Mobility
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/liver-cleanse"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Liver & Cleanse
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/mens-wellness"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Men's Wellness
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/respiratory"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Respiratory
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          onClick={handleShopMenuClose}
                          to="/products/sleep"
                          sx={{
                            "&:hover": {
                              color: "#A3B49B",
                            },
                          }}
                        >
                          Sleep
                        </MenuItem>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "contain",
                  backgroundImage:
                    "url(https://himalayausa.com/cdn/shop/products/chyavanprash-105275_1024x1024.png?v=1660858328)",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Box>
          </Menu>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {email ? (
              <>
                <MenuItem
                  onClick={() => {
                    dispatch(clearUser());
                    handleMenuClose();
                  }}
                  sx={{ color: "#777777" }}
                >
                  Log Out
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/account"
                  onClick={handleMenuClose}
                  sx={{ color: "#777777" }}
                >
                  Account
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  component={Link}
                  to="/signin"
                  onClick={handleMenuClose}
                  sx={{ color: "#777777" }}
                >
                  Sign In
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/register"
                  onClick={handleMenuClose}
                  sx={{ color: "#777777" }}
                >
                  Register
                </MenuItem>
              </>
            )}
            <MenuItem
              component={Link}
              to="/cart"
              onClick={handleMenuClose}
              sx={{ color: "#777777" }}
            >
              Checkout
            </MenuItem>
          </Menu>
          <IconButton color="#777777">
            <Tooltip title="Cart">
              <Link to="/cart" style={{ color: "#777777" }}>
                <ShoppingBagIcon />
              </Link>
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
      {isMobile && (
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ margin: "20px" }}
          onClick={handleDrawerToggle}
        >
          <Link to="/" style={{ textDecoration: "none", color: "#777777" }}>
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <Typography key={index} color="#777777">
              {crumb}
            </Typography>
          ))}
        </Breadcrumbs>
      )}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Link
          to="#"
          style={{ textDecoration: "none", color: "#777777" }}
          onClick={handleDrawerToggle}
        >
          Close
        </Link>
        <List>
          <ListItem onClick={handleDrawerToggle} button component={Link} to="/products/all">
            <ListItemText primary="Shop" />
          </ListItem>
          <ListItem onClick={handleDrawerToggle} button component={Link} to="/about">
            <ListItemText primary="About" />
          </ListItem>
          <ListItem onClick={handleDrawerToggle} button component={Link} to="#">
            <ListItemText primary="Store Locator" />
          </ListItem>
          <hr
            style={{
              color: "rgba(211, 211, 211, 0.5)",
              backgroundColor: "rgba(211, 211, 211, 0.5)",
              height: "1px",
              border: "none",
            }}
          />
          <Typography variant="h6">My Account</Typography>
          <ListItem onClick={handleDrawerToggle} button component={Link} to="/signin">
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem onClick={handleDrawerToggle} button component={Link} to="/register">
            <ListItemText primary="Register" />
          </ListItem>
          <ListItem onClick={handleDrawerToggle} button component={Link} to="/cart">
            <ListItemText primary="Checkout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
