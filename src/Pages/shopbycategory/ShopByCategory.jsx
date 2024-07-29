import styles from "../shopbycategory/ShopByCategory.module.css";

const ShopByCategory = () => {
  return (
    <>
      <div className={styles.parent}>
        <h1>Shop By Category</h1>
        <div className={styles.container}>
          <div className={styles.box}>
            <a href="/products/herbal-supplements">
              <img
                src="src/assets/Home/shopCategory-banner-1.webp"
              />
            </a>

            <h1>Supplements</h1>
            <a href="/products/herbal-supplements">See All Supplements</a>
          </div>
          <div className={styles.box}>
            <a href="/products/oral-care">
              <img
                src="src/assets/Home/shopCategory-banner-2.webp"
              />
            </a>

            <h1>Oral Care</h1>
            <a href="/products/oral-care">See All Oral Care</a>
          </div>
          <div className={styles.box}>
            <a href="/products/personal-care">
              <img
                src="src/assets/Home/shopCategory-banner-3.webp"
              />
            </a>

            <h1>Personal Care</h1>
            <a href="/products/personal-care">See All Personal Care</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;
