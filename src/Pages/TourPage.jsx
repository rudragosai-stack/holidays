import React from "react";
import { useLocation } from "react-router";
import BreadCumb from "../Components/Common/BreadCumb";
import Tour from "../Components/Tour/Tour";
import Story1 from "../Components/Story/Story1";
import FeaturedTour1 from "../Components/FeaturedTour/FeaturedTour1";

const TourPage = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Determine tour type based on URL
  let tourType = "all"; // Default to show all tours
  let pageTitle = "Tour";

  if (pathname.includes("/domestic")) {
    tourType = "domestic";
    pageTitle = "Domestic Tours";
  } else if (pathname.includes("/international")) {
    tourType = "international";
    pageTitle = "International Tours";
  }

  return (
    <div>
      <BreadCumb bgimg="/mainimage/banner.jpg" Title={pageTitle}></BreadCumb>
      <Tour tourType={tourType}></Tour>
      {tourType === "international" && (
        <>
          <Story1></Story1>
          <FeaturedTour1></FeaturedTour1>
        </>
      )}
    </div>
  );
};

export default TourPage;
