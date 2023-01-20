import React from "react";
import { FaPaperPlane, FaPhoneAlt, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import "./About.scss";
export const bios = [
  {
    id: 1,
    icon: <FaUser />,
    key: "Name",
    value: "Sumanta Kabiraj",
  },
  {
    id: 3,
    icon: <FaPaperPlane />,
    key: "Email",
    value: "me@sumantakabiraj.com",
  },
];

const About = ({ profilePhoto }) => {
  return (
    <div className="container " id="about">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ y: [-50, 0], opacity: 1 }}
        className="title"
      >
        <span>Who Am I?</span>
        <h1>About Me</h1>
      </motion.div>

      <div className="about_container">
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          whileInView={{ x: [-250, 0], opacity: 1 }}
          transition={{ duration: 1 }}
          className="about_left"
        >
          <motion.img
            src={profilePhoto}
            whileHover={{ y: -48, x: -55 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <motion.div
          className="about_right"
          initial={{ x: 0, opacity: 0 }}
          whileInView={{ x: [250, 0], opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p>
            Hi there 👋, I am Sumanta, a Software developer from Kolkata, India
            <br />
            Full Stack Developer | MERN Stack | 😊 Open-Source | Workaholic |
            🕸️Web3 | Creator of @vscode-extensions-pack
          </p>
          {bios.map((bio) => {
            return (
              <div className="bio" key={bio.id}>
                <span className="bioKey">
                  {bio.icon}
                  {bio.key}
                </span>
                <span className="bioValue">{bio.value}</span>
              </div>
            );
          })}
          <motion.a
            href="#"
            download=""
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
