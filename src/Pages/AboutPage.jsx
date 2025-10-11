import React from "react";
import BreadCumb from "../Components/Common/BreadCumb";
import About2 from "../Components/About/About2";
import Choose2 from "../Components/Choose/Choose2";
import Counter1 from "../Components/Counter/Counter1";
import Team1 from "../Components/Team/Team1";
import Testimonial3 from "../Components/Testimonial/Testimonial3";
import Instagram2 from "../Components/Instagram/Instagram2";
import Team2 from "../Components/Team/Team2";
import Testimonial2 from "../Components/Testimonial/Testimonial2";
import Testimonial1 from "../Components/Testimonial/Testimonial1";

const AboutPage = () => {
  return (
    <div>
      <BreadCumb bgimg="/mainimage/banner.jpg" Title="About Us"></BreadCumb>
      <About2></About2>
      <Choose2></Choose2>
      <Counter1></Counter1>
      <Team1></Team1>
      <Testimonial2></Testimonial2>
      <Instagram2></Instagram2>
    </div>
  );
};

export default AboutPage;
