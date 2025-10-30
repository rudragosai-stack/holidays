import React from "react";
import BreadCumb from "../Components/Common/BreadCumb";
import Tour from "../Components/Tour/Tour";

const InternationalExplorePage = () => {
  return (
    <div>
      <BreadCumb bgimg="/mainimage/banner.jpg" Title="International Tours"></BreadCumb>
      <Tour tourType="international" forceSidebar={true}></Tour>
    </div>
  );
};

export default InternationalExplorePage;
