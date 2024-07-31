import styles from "../bestSeller/BestSeller.module.css";

const BestSeller = () => {
  const handleSlide = (tag) => {
    const element = document.getElementById(tag);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.parent}>
        <h1>Best Seller</h1>
        <div>
          <img width={140} height={200} src="/assets/Home/bestSeller.png" />
          <div className={styles.parentChild}>
            <h1>Unlock the Wisdom of Herbs</h1>
            <h2>with Herbal Supplements, Toothpaste & More!</h2>
            <p>
              Since 1930, Himalaya has been passionate about the healing wisdom
              of herbs. We offer a wide range of clinically-studied herbal
              supplements, toothpaste and personal care products that unlock the
              powerful healing benefits of herbs.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.box}>
          <span></span>
          <h4 id={1}>
            We have tried countless fluoride-free toothpastes, and this is our
            favorite!
          </h4>
          <p>Botanique Complete Care Toothpaste - Peppermint</p>
        </div>
        <div className={styles.box}>
          <span></span>
          <h4>
            I am amazed. I am less irritable and tired, and more calm and
            centered.
          </h4>
          <p>Ashwagandha</p>
        </div>
        <div className={styles.box}>
          <span></span>
          <h4 id={3}>
            Recommended to me by my local health food store. This product is a
            godsend.
          </h4>
          <p>LiverCare®</p>
        </div>
        <div className={styles.box}>
          <span></span>
          <h4>
            I have seen such a drastic difference in my memory, it is hard to
            believe.
          </h4>
          <p>Bacopa</p>
        </div>
        <div className={styles.box}>
          <span></span>
          <h4>
            Other whitening toothpastes have not given me these kinds of
            results.
          </h4>
          <p>Botanique Complete Care Whitening Toothpaste - Mint</p>
        </div>
        <div className={styles.box}>
          <span></span>
          <h4 id={6}>
            “Since taking this product, I have cut back considerably on sugary
            snacks.”
          </h4>
          <p>Gymnema</p>
        </div>
      </div>
      <div className={styles.anchors}>
        <span onClick={() => handleSlide(1)}></span>
        <span onClick={() => handleSlide(3)}></span>
        <span onClick={() => handleSlide(6)}></span>
      </div>
    </>
  );
};

export default BestSeller;
