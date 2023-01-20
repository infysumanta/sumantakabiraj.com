import React from "react";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Hero from "./Hero/Hero";
import Portfolio from "./Portfolio/Portfolio";
import Skills from "./Skills/Skills";
const profilePhoto =
  "https://avatars.githubusercontent.com/u/40049179?s=400&u=4986fbaa6e9efec4a306bb1f13b4459309fc9a5c&v=4";
const HomePage = () => {
  return (
    <>
      <Hero profilePhoto={profilePhoto} />
      <About profilePhoto={profilePhoto} />
      <Skills />
      {/* <Portfolio /> */}
      {/* <Contact /> */}
    </>
  );
};

export default HomePage;
