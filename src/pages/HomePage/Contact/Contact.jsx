import React from "react";
import { motion } from "framer-motion";
import "./Contact.scss";
import {
  FaMapMarkerAlt,
  FaPaperPlane,
  FaDribbble,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { BsMedium } from "react-icons/bs";

export const contacts = [
  {
    id: 1,
    icon: <FaMapMarkerAlt />,
    infoText: "Kolkata, India",
  },
  {
    id: 2,
    icon: <FaPaperPlane />,
    infoText: "me@sumantakabiraj.com",
  },
];

export const socialIcons = [
  <FaDribbble />,
  <FaInstagram />,
  <FaLinkedin />,
  <BsMedium />,
];
const Contact = () => {
  return (
    <div className="container" id="contact">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ y: [-50, 0], opacity: 1 }}
        className="title"
      >
        <span>get in touch</span>
        <h1>Contact Me</h1>
      </motion.div>
      <div className="contact_form">
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          whileInView={{ x: [-150, 0], opacity: 1 }}
          transition={{ duration: 1 }}
          className="contact_left_container"
        >
          <h3>Just Say Hi</h3>
          <p className="contact_text"></p>
          {contacts.map((contact) => {
            return (
              <div className="contact_left" key={contact.id}>
                <div className="icon">{contact.icon}</div>
                <p>{contact.infoText}</p>
              </div>
            );
          })}
          <div className="social_icons">
            {socialIcons.map((socialIcon, index) => {
              return <div key={index}>{socialIcon}</div>;
            })}
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          whileInView={{ x: [150, 0], opacity: 1 }}
          transition={{ duration: 1 }}
          className="contact_right"
        >
          <h3>Get In Touch</h3>
          <div className="row">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last name" />
          </div>
          <div className="row">
            <input type="text" placeholder="Phone" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="row">
            <textarea placeholder="message"></textarea>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="btn"
          >
            <a href="/">Send</a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
