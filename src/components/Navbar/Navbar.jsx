import React from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/userSlices";
const Navbar = () => {
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [shopEl, setShopEL] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleShopMenu = () => {
    setShopEL(null);
  };
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const breadcrumbs = location.pathname.split("/").filter((path) => path);
  return (
    <>
      {" "}
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
        {" "}
        <h2>FREE SHIPPING</h2> <p>ON ALL ORDERS OVER $35!</p>{" "}
      </div>{" "}
      <AppBar
        position="static"
        style={{ backgroundColor: "white", color: "black", boxShadow:"none", padding:"20px 0px" }}
      >
        {" "}
        <Toolbar>
          {" "}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              {" "}
              <MenuIcon />{" "}
            </IconButton>
          )}{" "}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {" "}
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              {" "}
              <img
                src="https://himalayausa.com/cdn/shop/files/Himalaya_Logo_-_Since_1930_CMYK_-_Reduced_500x.png?v=1673635210"
                alt="Himalaya Logo"
                style={{ height: "50px" }}
              />{" "}
            </Link>{" "}
          </Typography>{" "}
          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                right: "60%",
                gap:"30px"
              }}
            >
              {" "}
              <Link
                to="/products/all"
                style={{
                  marginRight: "5px",
                  textDecoration: "none",
                  color: "#777777",
                  fontSize:"18px",
                  '&:hover':
                  {
                    color:"#A3B49B",
                  }
                }}
                onClick={()=>setShopEL(true)}
              >
                {" "}
                Shop{" "}
              </Link>{" "}
              <Link
                to="/about"
                style={{
                  marginRight: "5px",
                  textDecoration: "none",
                  color: "#777777",
                  fontSize:"18px"
                }}
              >
                {" "}
                About{" "}
              </Link>{" "}
              <Link
                to="#"
                style={{
                  marginRight: "5px",
                  textDecoration: "none",
                  color: "#777777",
                  fontSize:"18px"
                }}
              >
                {" "}
                Store Locator{" "}
              </Link>{" "}
            </div>
          )}{" "}
          <IconButton color="inherit">
            {" "}
            <Tooltip title="Search">
              {" "}
              <SearchOutlinedIcon />{" "}
            </Tooltip>{" "}
          </IconButton>{" "}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            {" "}
            <Tooltip title={email ? "Account" : "Register"}>
              {" "}
              <PersonOutlineOutlinedIcon />{" "}
            </Tooltip>{" "}
          </IconButton>{" "}
        

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {" "}
            {email ? (
              <>
                {" "}
                <MenuItem
                  onClick={() => {
                    dispatch(clearUser());
                    handleMenuClose();
                  }}
                >
                  Log Out
                </MenuItem>{" "}
                <MenuItem
                  component={Link}
                  to="/account"
                  onClick={handleMenuClose}
                >
                  {" "}
                  Account{" "}
                </MenuItem>{" "}
              </>
            ) : (
              <>
                {" "}
                <MenuItem
                  component={Link}
                  to="/signin"
                  onClick={handleMenuClose}
                >
                  {" "}
                  Sign In{" "}
                </MenuItem>{" "}
                <MenuItem
                  component={Link}
                  to="/register"
                  onClick={handleMenuClose}
                >
                  {" "}
                  Register{" "}
                </MenuItem>{" "}
              </>
            )}{" "}
            <MenuItem component={Link} to="/cart" onClick={handleMenuClose}>
              {" "}
              Checkout{" "}
            </MenuItem>{" "}
          </Menu>{" "}
          <IconButton color="inherit">
            {" "}
            <Tooltip title="Cart">
              {" "}
              <Link to="/cart" style={{ color: "inherit" }}>
                {" "}
                <ShoppingBagIcon />{" "}
              </Link>{" "}
            </Tooltip>{" "}
          </IconButton>{" "}
        </Toolbar>{" "}
      </AppBar>{" "}
      {isMobile && <Breadcrumbs
        aria-label="breadcrumb"
        style={{ margin: "20px" }}
        onClick={handleDrawerToggle}
      >
        {" "}
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          {" "}
          Home{" "}
        </Link>{" "}
        {breadcrumbs.map((crumb, index) => (
          <Typography key={index} color="textPrimary">
            {" "}
            {crumb}{" "}
          </Typography>
        ))}{" "}
      </Breadcrumbs>}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {" "}
        <Link
          to="#"
          style={{ textDecoration: "none", color: "black" }}
          onClick={handleDrawerToggle}
        >
          Close
        </Link>{" "}
        <List>
          {" "}
          <ListItem button component={Link} to="/products/all">
            {" "}
            <ListItemText primary="Shop" />{" "}
          </ListItem>{" "}
          <ListItem button component={Link} to="/about">
            {" "}
            <ListItemText primary="About" />{" "}
          </ListItem>{" "}
          <ListItem button component={Link} to="#">
            {" "}
            <ListItemText primary="Store Locator" />{" "}
          </ListItem>{" "}
          <hr
            style={{
              color: "rgba(211, 211, 211, 0.5)",
              backgroundColor: "rgba(211, 211, 211, 0.5)",
              height: "1px",
              border: "none",
            }}
          />{" "}
          <Typography variant="h6">My Account</Typography>{" "}
          <ListItem button component={Link} to="/signin">
            {" "}
            <ListItemText primary="Sign In" />{" "}
          </ListItem>{" "}
          <ListItem button component={Link} to="/register">
            {" "}
            <ListItemText primary="Register" />{" "}
          </ListItem>{" "}
          <ListItem button component={Link} to="/cart">
            {" "}
            <ListItemText primary="Checkout" />{" "}
          </ListItem>{" "}
        </List>{" "}
      </Drawer>{" "}
    </>
  );
};
export default Navbar;
