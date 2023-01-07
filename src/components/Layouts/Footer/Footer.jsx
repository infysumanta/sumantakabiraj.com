import React from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import "./Footer.scss";
import { motion } from "framer-motion";
const socialIcons = [
  {
    icon: <FaInstagram />,
    link: "https://sumantakabiraj.com",
  },
  {
    icon: <FaFacebook />,
    link: "https://sumantakabiraj.com",
  },
  {
    icon: <FaTwitter />,
    link: "https://sumantakabiraj.com",
  },
  {
    icon: <FaGithub />,
    link: "https://sumantakabiraj.com",
  },
];

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      transition={{ duration: 1.5 }}
      className="footer"
    >
      <div className="copyright">
        <p>
          Copyright &copy; {new Date().getFullYear()}{" "}
          <span>All Right Reserved.</span>{" "}
        </p>
      </div>
      <div className="followMe">
        <h4>Follow Me</h4>
        <div className="stick"></div>
        <div className="social_icons">
          {socialIcons.map((social, index) => (
            <div key={index}>
              <a href={social.link}>{social.icon}</a>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
