import { Link } from "react-router-dom";
import BestSeller from "../bestSeller/BestSeller";
import FollowUs from "../followUs/FollowUs";
import ShopByCategory from "../shopbycategory/ShopByCategory";
import Styles from "/src/Pages/Home/Home.module.css";

const Home = () => {
  return (
    <>
      <div className={Styles.banner}>
        <div className={Styles.bannerContent}>
          <h1 className={Styles.bannerHeader}>BERBERINE</h1>
          <p>
            Potent Plant-Based Support <br /> for Daily Wellness.
          </p>
          <button className={Styles.bannerButton}>
            <Link to="/overview/669ffdafd233551429073e44">shop now</Link>
          </button>
        </div>
      </div>
      <ShopByCategory />
      <BestSeller />
      <FollowUs />
    </>
  );
};

export default Home;
