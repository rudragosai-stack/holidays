import React from "react";
import { useParams } from "react-router";
import BreadCumb from "../Components/Common/BreadCumb";
import TourDetails from "../Components/TourDetails/TourDetails";

const TourDetailsPage = () => {
  const { slug } = useParams();
  return (
    <div>
      <BreadCumb bgimg="/mainimage/banner.jpg" Title="Tour Details"></BreadCumb>
      <TourDetails slug={slug}></TourDetails>
    </div>
  );
};

export default TourDetailsPage;
