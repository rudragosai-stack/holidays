import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import VideoModal from "../VideoModal/VideoModal";
import loadBackgroudImages from "../Common/loadBackgroudImages";

const Story1 = () => {
  const [iframeSrc, setIframeSrc] = useState("about:blank");
  const [toggle, setToggle] = useState(false);

  const handelClose = () => {
    setIframeSrc("about:blank");
    setToggle(!toggle);
  };

  useEffect(() => {
    loadBackgroudImages();
  }, []);

  return (
    <section className="watch-video-section section-padding pb-0 fix">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title wow fadeInUp">Watch Our Story</span>
          <h2 className="wow fadeInUp wow" data-wow-delay=".3s">
            Unforgettable Travel Experiences <br />
            Get Your Guide
          </h2>
        </div>
        <div className="video-wrapper">
          <div className="watch-button">
            <Link to="/contact" className="theme-btn wow fadeInUp wow" data-wow-delay=".5s">
              Contact Us<i className="bi bi-arrow-right"></i>
            </Link>
            <Link to="/tour/tour-details" className="theme-btn style-2 wow fadeInUp wow" data-wow-delay=".7s">
              Book Now<i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="">
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
                borderRadius: "50px",
              }}
            >
              <source src="/mainimage/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <VideoModal isTrue={toggle} iframeSrc={iframeSrc} handelClose={handelClose}></VideoModal>
    </section>
  );
};

export default Story1;
