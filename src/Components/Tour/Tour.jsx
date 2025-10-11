import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { urlFor, fetchData, queries } from "../../lib/sanity";

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);

        // Fetch tours from Sanity
        const data = await fetchData(queries.getTours);

        // Transform Sanity data to match the expected format
        const transformedTours = data.map((tour) => ({
          img: tour.mainImage ? urlFor(tour.mainImage).width(400).height(300).url() : "/assets/img/destination/01.jpg",
          location: tour.location,
          title: tour.title,
          rating: "4.7", // Default rating - you can add this to schema later
          day: "10 Days", // Default duration - you can add this to schema later
          number: "50+", // Default capacity - you can add this to schema later
          price: tour.price,
          priceUnit: tour.priceUnit || "/Per day",
          slug: tour.slug?.current || "tour-details",
        }));

        setTours(transformedTours);
      } catch (err) {
        console.error("Error loading tours:", err);
        setError(err.message);

        // Fallback to static data if Sanity fails
        setTours([
          {
            img: "/assets/img/destination/01.jpg",
            location: "Indonesia",
            title: "Brooklyn Beach Resort Tour",
            rating: "4.7",
            day: "10 Days",
            number: "50+",
            price: "$59.00",
            priceUnit: "/Per day",
            slug: "brooklyn-beach-resort-tour",
          },
          {
            img: "/assets/img/destination/02.jpg",
            location: "Indonesia",
            title: "Pak Chumphon Town Tour",
            rating: "4.7",
            day: "10 Days",
            number: "50+",
            price: "$59.00",
            priceUnit: "/Per day",
            slug: "pak-chumphon-town-tour",
          },
          {
            img: "/assets/img/destination/03.jpg",
            location: "Indonesia",
            title: "Java & Bali One Life Adventure",
            rating: "4.7",
            day: "10 Days",
            number: "50+",
            price: "$59.00",
            priceUnit: "/Per day",
            slug: "java-bali-adventure",
          },
          {
            img: "/assets/img/destination/04.jpg",
            location: "Indonesia",
            title: "Places To Travel In November",
            rating: "4.7",
            day: "10 Days",
            number: "50+",
            price: "$59.00",
            priceUnit: "/Per day",
            slug: "november-travel",
          },
          {
            img: "/assets/img/destination/05.jpg",
            location: "Indonesia",
            title: "Brooklyn Beach Resort Tour",
            rating: "4.7",
            day: "10 Days",
            number: "50+",
            price: "$59.00",
            priceUnit: "/Per day",
            slug: "brooklyn-beach-resort-tour-2",
          },
          {
            img: "/assets/img/destination/06.jpg",
            location: "Indonesia",
            title: "Pak Chumphon Town Tour",
            rating: "4.7",
            day: "10 Days",
            number: "50+",
            price: "$59.00",
            priceUnit: "/Per day",
            slug: "pak-chumphon-town-tour-2",
          },
          {
            img: "/assets/img/destination/07.jpg",
            location: "Indonesia",
            title: "Java & Bali One Life Adventure",
            rating: "4.7",
            day: "10 Days",
            number: "50+",
            price: "$59.00",
            priceUnit: "/Per day",
            slug: "java-bali-adventure-2",
          },
          {
            img: "/assets/img/destination/08.jpg",
            location: "Indonesia",
            title: "Places To Travel In November",
            rating: "4.7",
            day: "10 Days",
            number: "50+",
            price: "$59.00",
            priceUnit: "/Per day",
            slug: "november-travel-2",
          },
          {
            img: "/assets/img/destination/04.jpg",
            location: "Indonesia",
            title: "Places To Travel In November",
            rating: "4.7",
            day: "10 Days",
            number: "50+",
            price: "$59.00",
            priceUnit: "/Per day",
            slug: "november-travel-3",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="tour-section section-padding fix">
        <div className="container custom-container">
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading tours...</span>
            </div>
            <p className="mt-3">Loading tours...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state if no tours are available
  if (tours.length === 0) {
    return (
      <section className="tour-section section-padding fix">
        <div className="container custom-container">
          <div className="text-center py-5">
            <h3>No tours available</h3>
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
    <section className="tour-section section-padding fix">
      <div className="container custom-container">
        <div className="tour-destination-wrapper">
          <div className="row g-4">
            <div className="col-xl-9">
              <div className="row g-4">
                {tours.map((item, i) => (
                  <div key={item._id || i} className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp wow" data-wow-delay=".3s">
                    <div className="destination-card-items mt-0">
                      <div className="destination-image">
                        <img src={item.img} alt={item.title} />
                        <div className="heart-icon">
                          <i className="bi bi-heart"></i>
                        </div>
                      </div>
                      <div className="destination-content">
                        <ul className="meta">
                          <li>
                            <i className="bi bi-geo-alt"></i>
                            {item.location}
                          </li>
                          <li className="rating">
                            <div className="star">
                              <i className="bi bi-star-fill"></i>
                            </div>
                            <p>{item.rating}</p>
                          </li>
                        </ul>
                        <h5>
                          <Link to={`/tour/${item.slug}`}>{item.title}</Link>
                        </h5>
                        <ul className="info">
                          <li>
                            <i className="bi bi-clock"></i>
                            {item.day}
                          </li>
                          <li>
                            <i className="bi bi-person"></i>
                            {item.number}
                          </li>
                        </ul>
                        <div className="price">
                          <h6>
                            {item.price}
                            <span>{item.priceUnit}</span>
                          </h6>
                          <Link to={`/tour/${item.slug}`} className="theme-btn style-2">
                            Book Now<i className="bi bi-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="page-nav-wrap text-center">
                <ul>
                  <li>
                    <a className="page-numbers" href="#">
                      <i className="bi bi-arrow-left"></i>
                    </a>
                  </li>
                  <li>
                    <a className="page-numbers" href="#">
                      01
                    </a>
                  </li>
                  <li>
                    <a className="page-numbers" href="#">
                      02
                    </a>
                  </li>
                  <li>
                    <a className="page-numbers" href="#">
                      03
                    </a>
                  </li>
                  <li>
                    <a className="page-numbers" href="#">
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="main-sidebar mt-0">
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Destination Category</h3>
                  </div>
                  <div className="categories-list">
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Canada</span>
                      </span>
                      <span className="text-color">04</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Europe</span>
                      </span>
                      <span className="text-color">03</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">France</span>
                      </span>
                      <span className="text-color">05</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Indonesia</span>
                      </span>
                      <span className="text-color">06</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Nepal</span>
                      </span>
                      <span className="text-color">05</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Maldives</span>
                      </span>
                      <span className="text-color">04</span>
                    </label>
                  </div>
                </div>

                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Activities</h3>
                  </div>
                  <div className="categories-list">
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" readOnly />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Canada</span>
                      </span>
                      <span className="text-color">04</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Europe</span>
                      </span>
                      <span className="text-color">03</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">France</span>
                      </span>
                      <span className="text-color">05</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Indonesia</span>
                      </span>
                      <span className="text-color">06</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Nepal</span>
                      </span>
                      <span className="text-color">05</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Maldives</span>
                      </span>
                      <span className="text-color">04</span>
                    </label>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title style-2">
                    <h3>Tour Types</h3>
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <div className="categories-list">
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Premium</span>
                      </span>
                      <span className="text-color">04</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Luxury</span>
                      </span>
                      <span className="text-color">03</span>
                    </label>
                    <label className="checkbox-single d-flex justify-content-between align-items-center">
                      <span className="d-flex gap-xl-3 gap-2 align-items-center">
                        <span className="checkbox-area d-center">
                          <input type="checkbox" />
                          <span className="checkmark d-center"></span>
                        </span>
                        <span className="text-color">Standard</span>
                      </span>
                      <span className="text-color">05</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tour;
