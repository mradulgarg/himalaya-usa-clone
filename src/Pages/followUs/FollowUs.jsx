import Instagram from "@mui/icons-material/Instagram";
import styles from "../followUs/FollowUs.module.css";
import { Box, Button, Modal, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #fff",
  boxShadow: 24,
  p: 4,
};
const FollowUs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <div className={styles.container}>
        <div className={styles.child1}>
          <h1>Follow us @himalayausa</h1>
          <div className={styles.icon}>
            <a
              href="https://www.instagram.com/himalayausa/"
              target="_blank"
              alt="insta link"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/HimalayaUSA"
              target="_blank"
              alt="fb llink"
            >
              <FacebookOutlinedIcon />
            </a>
          </div>
        </div>

        <div className={styles.child2}>
          <a href="#">
            <div className={styles.image}>
              <img src="src/assets/Home/followUs-banner1.webp" alt="category" />
              <div className={styles.layer}>
                <h1 onClick={handleOpen}>
                  <Instagram />
                </h1>
              </div>
            </div>
          </a>
          <a href="#">
            <div className={styles.image}>
              <img src="src/assets/Home/followUs-banner2.webp" alt="category" />
              <div className={styles.layer}>
                <h1 onClick={handleOpen}>
                  <Instagram />
                </h1>
              </div>
            </div>
          </a>
          <a href="#">
            <div className={styles.image}>
              <img src="src/assets/Home/followUs-banner3.webp" alt="category" />
              <div className={styles.layer}>
                <h1 onClick={handleOpen}>
                  <Instagram />
                </h1>
              </div>
            </div>
          </a>
          <a href="#">
            <div className={styles.image}>
              <img src="src/assets/Home/followUs-banner4.webp" alt="category" />
              <div className={styles.layer}>
                <h1 onClick={handleOpen}>
                  <Instagram />
                </h1>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default FollowUs;
