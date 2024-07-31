import { Link } from "react-router-dom";
import styles from "../shopbycategory/ShopByCategory.module.css";

const ShopByCategory = () => {
  return (
    <>
      <div className={styles.parent}>
        <h1>Shop By Category</h1>
        <div className={styles.container}>
          <div className={styles.box}>
            <Link to="/products/herbal-supplements">
              <img src="/assets/Home/shopCategory-banner-1.webp" />
            </Link>

            <h1>Supplements</h1>
            <Link href="/herbal-supplements">See All Supplements</Link>
          </div>
          <div className={styles.box}>
            <Link to="/products/oral-care">
              <img src="/assets/Home/shopCategory-banner-2.webp" />
            </Link>

            <h1>Oral Care</h1>
            <Link to="/products/oral-care">See All Oral Care</Link>
          </div>
          <div className={styles.box}>
            <Link to="/products/personal-care">
              <img src="/assets/Home/shopCategory-banner-3.webp" />
            </Link>

            <h1>Personal Care</h1>
            <Link to="/products/personal-care">See All Personal Care</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;
