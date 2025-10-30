import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import { urlFor, fetchData, queries } from "../../lib/sanity";
import { sanityConfig } from "../../lib/config";

const HeroBanner2 = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHeroBanners = async () => {
      try {
        setLoading(true);

        // Fetch hero banners from Sanity using the client
        const data = await fetchData(queries.getHeroBanners);

        // Transform Sanity data to match the expected format
        const transformedSlides = data.map((banner) => ({
          background: banner.backgroundImage ? urlFor(banner.backgroundImage).width(1920).height(1080).url() : "/mainimage/banner4.jpg",
          subtitle: banner.subtitle,
          titleLine1: banner.titleLine1,
          titleLine2: banner.titleLine2,
          description: banner.description,
        }));

        setSlides(transformedSlides);
      } catch (err) {
        console.error("Error loading hero banners:", err);
        setError(err.message);

        // Fallback to static data if Sanity fails
        setSlides([
          {
            background: "/mainimage/banner4.jpg",
            subtitle: "Get unforgettable pleasure with us",
            titleLine1: "Discover Your Next",
            titleLine2: "Handpicked Journey",
            description:
              "There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour words which don't look even slightly believable.",
          },
          {
            background: "/mainimage/banner3.jpg",
            subtitle: "Explore breathtaking destinations",
            titleLine1: "Travel The World",
            titleLine2: "With Confidence",
            description: "From curated itineraries to premium support, we make every trip smooth, memorable, and completely yours.",
          },
          {
            background: "/mainimage/banner2.jpg",
            subtitle: "Craft moments that last forever",
            titleLine1: "Find Your Perfect",
            titleLine2: "Escape Today",
            description: "Choose from handpicked tours and experiences designed to match your vibe and budget.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadHeroBanners();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      loadBackgroudImages();
    }
  }, [slides]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    swipeToSlide: true,
    waitForAnimate: false,
    afterChange: () => {
      // Ensure background images are applied after each slide change
      loadBackgroudImages();
    },
  };

  // Show loading state
  if (loading) {
    return (
      <section className="hero-section-2 hero-slider">
        <div className="hero-2 bg-cover" style={{ backgroundImage: "url('/mainimage/banner4.jpg')", minHeight: "600px" }}>
          <div className="container custom-container-3">
            <div className="row">
              <div className="col-lg-6">
                <div className="hero-content">
                  <div className="text-center">
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-light">Loading hero banners...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state if no slides are available
  if (slides.length === 0) {
    return (
      <section className="hero-section-2 hero-slider">
        <div className="hero-2 bg-cover" style={{ backgroundImage: "url('/mainimage/banner4.jpg')", minHeight: "600px" }}>
          <div className="container custom-container-3">
            <div className="row">
              <div className="col-lg-6">
                <div className="hero-content">
                  <div className="sub-title">Welcome to One World Holidays</div>
                  <h1>
                    Discover Your Next <br />
                    Handpicked Journey
                  </h1>
                  <p>There are many variations of passages of available, but the majority have suffered alteration in some form.</p>
                  {error && (
                    <div className="alert alert-warning mt-3">
                      <small>Note: Using fallback content. {error}</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section-2 hero-slider">
      <Slider {...settings}>
        {slides.map((item, index) => (
          <div key={index}>
            <div className="hero-2 bg-cover" data-background={item.background}>
              <div className="container custom-container-3">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="hero-content">
                      <div className="sub-title wow fadeInUp">{item.subtitle}</div>
                      <h1 className="wow fadeInUp" data-wow-delay=".3s">
                        {item.titleLine1} <br />
                        {item.titleLine2}
                      </h1>
                      <p className="wow fadeInUp" data-wow-delay=".5s">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroBanner2;
