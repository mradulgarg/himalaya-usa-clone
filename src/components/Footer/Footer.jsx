import { Link } from "react-router-dom";
import styles from "/src/components/Footer/Footer.module.css";
import { InputAdornment, TextField } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useSelector } from "react-redux";
const Footer = () => {

  const {email} = useSelector(state => state.user)
  const navLinks = [
    { name: "Contact Us", path: "#" },
    { name: "FAQ", path: "#" },
    { name: "Blog", path: "#" },
    { name: "Store Locator", path: "#" },
    { name: "Careers", path: "#" },
    { name: "Shipping & Returns", path: "#" },
    { name: "Terms & Conditions", path: "#" },
    { name: "Privacy", path: "#" },
    { name: "CCPA", path: "#" },
    { name: "Accessibility", path: "#" },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.child1}>
          <h1>Info</h1>
          {navLinks.slice(0, 5).map((link, index) => (
            <Link key={index} to={link.path}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className={styles.child2}>
          <h1>Policies</h1>
          {navLinks.slice(5).map((link, index) => (
            <Link key={index} to={link.path}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className={styles.child3}>
          <h1>Contact Us</h1>
          <h1>Email</h1>
          <p>writetous@himalayausa.com</p>
          <h1>Phone</h1>
          <p>098-982-07989</p>
          <p>Mon-Fri, 8am-5pm CT</p>
          <h1>Mail</h1>
          <p>
            Himalaya Wellness <br />
            1101 Gillingham Lane
            <br />
            Sugar Land, TX 77478​
          </p>
        </div>
        <div className={styles.child4}>
          <h1>Subscribe to Our Newsletter!</h1>
          <TextField
            type="text"
            size="small"
            placeholder="enter your mail"
            value={email}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start" sx={{cursor:'pointer'}}>
                  <MailIcon />
                </InputAdornment>
              ),
            }}
          />
          <p>
            By entering your email, you <br />
            agree to our Terms & Conditions <br /> and Privacy Policy.
          </p>
          <h1>
            Follow Us :{" "}
            <span>
              <FacebookIcon />
            </span>{" "}
            <span>
              <InstagramIcon />
            </span>
            <span>
              <XIcon />
            </span>
            <span>
              <YouTubeIcon />
            </span>{" "}
          </h1>
        </div>
      </div>

      <div className={styles.disclaimer}>
        <p className={styles.copyWright}>
          © 2022 Himalaya Wellness. All rights reserved.
        </p>
        <h6 className={styles.warning}>
          *THESE STATEMENTS HAVE NOT BEEN EVALUATED BY THE FOOD AND DRUG
          ADMINISTRATION. THIS PRODUCT IS NOT INTENDED TO DIAGNOSE, TREAT, CURE
          OR PREVENT ANY DISEASE.
        </h6>
      </div>
    </>
  );
};

export default Footer;
