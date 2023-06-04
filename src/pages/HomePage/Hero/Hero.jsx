import React from "react";
import "./Hero.scss";
import { motion } from "framer-motion";

const Hero = ({ profilePhoto }) => {
  const moveVariants = {
    animation: {
      y: [0, -15],
      transition: {
        yoyo: Infinity,
        duration: 2,
        delay: 1,
      },
    },
  };

  return (
    <motion.div
      className="container "
      id="home"
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 2,
        delay: 0.5,
      }}
    >
      <div className="profile">
        <img src={profilePhoto} alt="portfolio" />
      </div>
      <div className="profile_text">
        <h3 className="name">
          Hi, I'm <span>Sumanta</span>
        </h3>
        <span className="job">Full Stack Developer Based on India</span>
        <span className="text">
          Passionate
          <br /> to developed <br /> web <span>apps</span> and{" "}
          <span>software</span>.
        </span>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.1 }}
          variants={moveVariants}
          animate="animation"
        >
          connect with me
        </motion.a>
        <div className="web">Web Developer</div>
        <div className="software">Software Developer</div>
        <div className="freelance">Freelancer</div>
        <div className="opensource">Opensource</div>
      </div>
    </motion.div>
  );
};

export default Hero;
