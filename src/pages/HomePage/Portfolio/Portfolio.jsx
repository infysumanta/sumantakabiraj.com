import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Portfolio.scss";

import { FiGithub, FiEye } from "react-icons/fi";
export const workImages = [
  {
    id: 1,
    img: "work1",
    name: "project 1",
    category: "web",
  },
  {
    id: 2,
    img: "work2",
    name: "project 2",
    category: "web",
  },
  {
    id: 3,
    img: "work3",
    name: "project 3",
    category: "web",
  },
  {
    id: 4,
    img: "work4",
    name: "project 4",
    category: "app",
  },
  {
    id: 5,
    img: "work5",
    name: "project 5",
    category: "app",
  },
  {
    id: 6,
    img: "work6",
    name: "project 6",
    category: "design",
  },
];

export const workNavs = ["All", "Web", "App", "Design"];

const Portfolio = () => {
  const [tab, setTab] = useState({ name: "all" });
  const [works, setWorks] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (tab.name === "all") {
      setWorks(workImages);
    } else {
      const newWork = workImages.filter((workImage) => {
        return workImage.category.toLowerCase() === tab.name;
      });
      setWorks(newWork);
    }
  }, [tab]);

  const activeTab = (e, index) => {
    setTab({ name: e.target.textContent.toLowerCase() });
    setActive(index);
  };

  return (
    <div className="container" id="portfolio">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ y: [-50, 0], opacity: 1 }}
        className="title"
      >
        <span>My Work</span>
        <h1>Awesome Projects</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ y: [-50, 0], opacity: 1 }}
        className="buttons"
      >
        {workNavs.map((workNav, index) => {
          return (
            <button
              onClick={(e) => activeTab(e, index)}
              className={`${active === index ? "active" : ""}`}
              key={index}
            >
              {workNav}
            </button>
          );
        })}
      </motion.div>
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        whileInView={{ x: [-250, 0], opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0, y: -50 }}
        className="workImages"
      >
        {works.map((work) => {
          return (
            <div className="workImage" key={work.id}>
              <img src={work.img} alt="workImg" />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hoverLayer"
              >
                <motion.a
                  href="#"
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 1.1] }}
                  transition={{ duration: 0.3 }}
                >
                  <FiGithub />
                </motion.a>

                <motion.a
                  href="#"
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 1.1] }}
                  transition={{ duration: 0.3 }}
                >
                  <FiEye />
                </motion.a>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        whileInView={{ x: [250, 0], opacity: 1 }}
        transition={{ duration: 1 }}
        className="talk"
      >
        <div className="talk_left">
          <h3>
            so let's talk about <br /> <span>your next projects</span>
          </h3>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="talk_right"
        >
          <a href="#contact">Contact Me</a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portfolio;
