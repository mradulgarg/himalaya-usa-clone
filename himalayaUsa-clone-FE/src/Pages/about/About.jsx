import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import Styles from "../about/About.module.css";
import { useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  tabs: {
    margin: "20px 0 0 100px",
    display: "flex",
    justifyContent: "space-around",
    borderBottom: "1px solid #ff7451",
    "@media (max-width: 900px)": {
      margin: "20px auto",
    },
    "@media (max-width: 600px)": {
      width:"100vw",
      margin: "20px auto",
    },
  },
  tab: {
    borderColor: "white",
    width: "250px",
    color: "#006666",
    "&:hover": {
      border: "1px solid #ff7451",
      color: "white",
      backgroundColor: "#006666",
    },
    "&.Mui-selected": {
      color: "white",
      backgroundColor: "#006666",
      borderBottom: "2px solid white",
    },
    "@media (max-width: 600px)": {
      width: "auto",
      fontSize: "0.75rem",
      padding: "6px 12px",
    },
  },
  header: {
    color: "#006666",
    fontSize: "26px",
    fontWeight: "600",
  },
  description: {
    color: "#333333",
    fontSize: "18px",
    "@media (max-width: 600px)": {
      fontSize: "16px",
    },
  },
  imgContainer: {
    flex: 1,
    "@media (max-width: 900px)": {
      width: "100%",
      height: "auto",
      marginBottom: "20px",
    },
  },
  contentContainer: {
    flex: 1,
    "@media (max-width: 900px)": {
      width: "100%",
      height: "auto",
    },
  },
}));

const tabPanelValues = {
  1: {
    header: "From Humble Beginnings",
    desc: `While riding through the forests of Burma, our founder, Mr. M. Manal, saw a villager pacify a restless elephant by feeding it the root of the plant Rauwolfia serpentina.Fascinated by the plant's effect on the elephant, he returned home to India to seek scientific evidence for why this particular plant would have such a beneficial, calming effect. Young Manal's mother gave him her bangles to sell so he could pursue his work, and Himalaya was born.
           Once he fully understood the science behind this special botanical, Mr. Manal bought a hand-operated, tablet-compressing machine and began his work. At night, his shoulders would ache from producing a few hundred tablets, one small tablet at a time. But his hard work paid off. This remarkable plant would later become Serpina, the world’s first anti-hypertensive drug in 1934.
           We remain in awe of the man who began our company, and the grandfather of our current CEO, Nabeel Manal. Himalaya’s legacy has always been one of researching nature and using the tools of modern science to develop and produce Ayurveda-based, pharmaceutical-grade herbal medicine products. And today, that legacy continues.
           Mr. Manal had a vision of helping people be well. Today, Himalaya Herbal Healthcare has turned a time-honored herbal tradition into a complete range of contemporary, proprietary formulas and single herbs products.`,
    src: "https://i.shgcdn.com/4075e3a0-9129-48bd-bfe7-42fc93fe2397/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  },
  2: {
    header: "Our Roots",
    desc: `The herbs used in Himalaya Herbal Healthcare's scientific product line are also used in the world's oldest traditional system of medicine, Ayurveda, which dates back over 4,000 years.
           The word Ayurveda comes from the Sanskrit root words ayur, meaning “life” and veda, meaning “to know.” Ayurveda literally means "to know life,” or in the language of today, “the science of life.”
           Ayurveda had a profound, far-reaching influence on Traditional Chinese Medicine and the healthcare systems of many other countries and cultures that followed. Today, thanks to the dedicated efforts of Himalaya’s doctors and scientists, it’s been proven effective through scientific validation.
           Ayurveda acknowledges there are five elements that make up the universe and the human body; earth, water fire, air and space. It seeks to bring the constellation and characteristics of the three body types defined by those elements – the vata, pitta and kapha – back into balance through proper diet, herbal treatment, and emotional well-being.
           We’re proud of the ancient roots and our modern branches that allow us to continue unlocking the powerful healing benefits of Ayurveda, but our formulas are science-based and appropriate for all body types. They require no Ayurvedic knowledge to be used successfully.`,
    src: "https://i.shgcdn.com/f95290db-d02e-433c-9564-4766788d684c/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  },
  3: {
    header: "Our Process",
    desc: `The complexity and timing of the entire seed-to-shelf process for Himalaya and for the plants themselves, is highlighted by three important mandates: purity, efficacy, and batch-to-batch consistency.
           We know the success of traditional plant medicine is based on several integral parts that extend from the most advanced agricultural research and practices, to extraction methodologies, to formulating approaches and dosage strategies.
           To accomplish all of this, Himalaya maintains total control over the farming, harvesting, research, manufacturing, and distribution of all our products.`,
    src: "https://i.shgcdn.com/a802e384-7312-4d13-bda1-8859e1afaecf/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  },
  4: {
    header: "Our Science",
    desc: `Himalaya's core interest has always been to ensure the health benefits of our herbal formulas and standalone solo herbs with product-specific, double-blind, placebo-controlled human clinical trials on all of our products.
           Our commitment to Ayurvedic principles, and research to produce natural, safe, and effective health products is driven by our soul mission, which is to help individual people maintain a healthy, long, and high-quality of life.
           We take pride in the fact that our formulas undergo years of primary research before we offer them to you. Our commitment to ensure we have product-specific science on hand before we launch a product into the marketplace is exceptional within the natural products industry.
           Himalaya has conducted over 1,200 clinical studies, many of which have been published in numerous, highly-regarded medical journals including The European Journal of Pharmacology, Phytotherapy Research, The Indian Journal of Clinical Practice, Australian Journal of Medical Herbalism, and JAMA, India.`,
    src: "https://i.shgcdn.com/a094b44f-0f48-4abf-b25b-549315cc3d98/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  },
  5: {
    header: "Certification for Environmental Management",
    desc: `Himalaya has taken several steps to conserve water, power and reduce pollution to meet National Quality Assurance (NQA) guidelines. The most significant achievement has been setting up a water treatment plant and sourcing water with low Total Dissolved Solids (TDS) externally. This has reduced Himalaya’s water consumption by as much as 10,000 liters a day.
           Himalaya has been awarded ISO-14001:2004 certification, the most recognized standard globally, for environment management. The certification is granted by National Quality Assurance (NQA), the UK's largest established certification body.`,
    src: "https://i.shgcdn.com/6fdef74e-1e57-4bd4-8f3f-617132184feb/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  },
};

const About = () => {
  const [value, setValue] = useState("1");
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <div className={Styles.banner}>
        <div className={Styles.bannerContent}>
          <h1 className={Styles.bannerHeader}>Our Story </h1>
          <h2>
            Founded in 1930, Himalaya remains family owned with products offered
            in over 100 countries.
          </h2>
        </div>
      </div>
      <Grid item>
        <Box>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab className={classes.tab} value="1" label="OUR STORY" wrapped />
            <Tab className={classes.tab} value="2" label="OUR ROOTS" />
            <Tab className={classes.tab} value="3" label="OUR PROCESS" />
            <Tab className={classes.tab} value="4" label="OUR SCIENCE" />
            <Tab className={classes.tab} value="5" label="OUR INITIATIVES" />
          </Tabs>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            gap={10}
            width="100%"
            marginTop={2}
            padding="0 10px"
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Box className={classes.imgContainer}>
              <img
                src={tabPanelValues[value].src}
                width="100%"
                alt={tabPanelValues[value].header}
              />
            </Box>
            <Box className={classes.contentContainer}>
              <Typography variant="h6" className={classes.header}>
                {tabPanelValues[value].header}
              </Typography>
              <Typography className={classes.description}>
                {tabPanelValues[value].desc}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default About;
