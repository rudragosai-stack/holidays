import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import parse from "html-react-parser";
import { Link } from "react-router";
import { urlFor, fetchData, queries } from "../../lib/sanity";

const FeaturedTour1 = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedTours = async () => {
      try {
        setLoading(true);

        // Fetch featured tours from Sanity (including domestic, international, and legacy tours)
        const data = await fetchData(queries.getFeaturedToursCombined);

        // Transform Sanity data to match the expected format
        const transformedTours = data.map((tour) => ({
          img: tour.mainImage ? urlFor(tour.mainImage).width(400).height(300).url() : "/mainimage/austria.jpg",
          location: tour.location,
          title: tour.title,
          price: tour.price,
          priceUnit: tour.priceUnit || "/Per day",
          slug: tour.slug?.current || "tour-details",
          tourType: tour._type, // Add tour type for identification
        }));

        setTours(transformedTours);
      } catch (err) {
        console.error("Error loading featured tours:", err);
        setError(err.message);

        // Fallback to static data if Sanity fails
        setTours([
          {
            img: "/mainimage/austria.jpg",
            location: "Nederland",
            title: "Best Time Ever to Explore <br>Molinas Nature",
            price: "INR 49.00",
            priceUnit: "/Per day",
            slug: "tour-details",
          },
          {
            img: "/mainimage/thailand.jpg",
            location: "Nederland",
            title: "Best Time Ever to Explore <br>Molinas Nature",
            price: "INR 49.00",
            priceUnit: "/Per day",
            slug: "tour-details",
          },
          {
            img: "/mainimage/austria.jpg",
            location: "Nederland",
            title: "Best Time Ever to Explore <br>Molinas Nature",
            price: "INR 49.00",
            priceUnit: "/Per day",
            slug: "tour-details",
          },
          {
            img: "/mainimage/thailand.jpg",
            location: "Nederland",
            title: "Best Time Ever to Explore <br>Molinas Nature",
            price: "INR 49.00",
            priceUnit: "/Per day",
            slug: "tour-details",
          },
          {
            img: "/mainimage/austria.jpg",
            location: "Nederland",
            title: "Best Time Ever to Explore <br>Molinas Nature",
            price: "INR 49.00",
            priceUnit: "/Per day",
            slug: "tour-details",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedTours();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  // Show loading state
  if (loading) {
    return (
      <section className="featured-tour-section section-padding section-bg">
        <div className="container">
          <div className="section-title">
            <span className="sub-title wow fadeInUp">Featured Tour</span>
            <h2 className="wow fadeInUp wow" data-wow-delay=".5s">
              Unforgettable Travel Discoveries
            </h2>
          </div>
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading tours...</span>
            </div>
            <p className="mt-3">Loading featured tours...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state if no tours are available
  if (tours.length === 0) {
    return (
      <section className="featured-tour-section section-padding section-bg">
        <div className="container">
          <div className="section-title">
            <span className="sub-title wow fadeInUp">Featured Tour</span>
            <h2 className="wow fadeInUp wow" data-wow-delay=".5s">
              Unforgettable Travel Discoveries
            </h2>
          </div>
          <div className="text-center py-5">
            <h3>No featured tours available</h3>
            {error && (
              <div className="alert alert-warning mt-3">
                <small>Note: Using fallback content. {error}</small>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-tour-section section-padding section-bg">
      <div className="left-shape">
        <img src="/assets/img/feature/plane-shape.png" alt="img" />
      </div>
      <div className="right-shape">
        <img src="/assets/img/feature/plane-shape.png" alt="img" />
      </div>
      <div className="array-button">
        <button onClick={previous} className="array-prev">
          <img src="/assets/img/offer/chervon-right.png" alt="img" />
        </button>
        <button onClick={next} className="array-next">
          <img src="/assets/img/icon/39.svg" alt="img" />
        </button>
      </div>
      <div className="container">
        <div className="section-title">
          <span className="sub-title wow fadeInUp">Featured Tour</span>
          <h2 className="wow fadeInUp wow" data-wow-delay=".5s">
            Unforgettable Travel Discoveries
          </h2>
        </div>
        <p className="wow fadeInUp wow" data-wow-delay=".7s">
          There are many variations of passages of available, but the majority have suffered alteration in some <br /> form, by injected humour words which don't look even slightly
          believable
        </p>
        <div className="swiper tour-slider">
          <div className="swiper-wrapper cs_slider_gap_301">
            <Slider ref={sliderRef} {...settings}>
              {tours.map((item, i) => (
                <div key={item._id || i} className="swiper-slide">
                  <div className="feature-tour-items">
                    <div className="feature-tour-image">
                      <img src={item.img} alt={item.title} />
                      <ul className="location">
                        <li>
                          <i className="bi bi-geo-alt-fill"></i>
                          {item.location}
                        </li>
                      </ul>
                    </div>
                    <div className="feature-tour-content">
                      <h4>
                        <Link to={`/tour/${item.slug}`}>{parse(item.title)}</Link>
                      </h4>
                      <h5>
                        {item.price}
                        <span>{item.priceUnit}</span>
                      </h5>
                      <Link to={`/tour/${item.slug}`} className="icon">
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTour1;
