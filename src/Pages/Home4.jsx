import React from "react";
import HeroBanner2 from "../Components/HeroBanner/HeroBanner2";
import About2 from "../Components/About/About2";
import Counter1 from "../Components/Counter/Counter1";
import Choose2 from "../Components/Choose/Choose2";
import Story1 from "../Components/Story/Story1";
import FeaturedTour1 from "../Components/FeaturedTour/FeaturedTour1";
import Feature1 from "../Components/Feature/Feature1";
import Category1 from "../Components/Category/Category1";
import Cta1 from "../Components/Cta/Cta1";
import Faq1 from "../Components/Faq/Faq1";
import LogoTest from "../Components/LogoTest";

const Home4 = () => {
  return (
    <div>
      <LogoTest />
      <HeroBanner2></HeroBanner2>
      <Feature1></Feature1>
      <About2></About2>
      <Counter1></Counter1>
      {/* <Category1></Category1> */}
      <Story1></Story1>
      <FeaturedTour1></FeaturedTour1>
      <Cta1></Cta1>
      <Faq1></Faq1>
      {/* <Testimonial1></Testimonial1> */}
      <Choose2></Choose2>
    </div>
  );
};

export default Home4;
