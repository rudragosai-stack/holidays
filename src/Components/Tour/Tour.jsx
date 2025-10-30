import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { urlFor, fetchData, queries } from "../../lib/sanity";
import FilterSidebar from "./FilterSidebar";

const Tour = ({ tourType = "all", forceSidebar = false }) => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 9;
  const [filters, setFilters] = useState({
    locations: [],
    activities: [],
    tourTypes: [],
  });

  // Get unique values from tours for filters
  const getUniqueLocations = (tours) => {
    const locations = [...new Set(tours.map((tour) => tour.location))];
    return locations.map((location) => ({
      name: location,
      count: tours.filter((tour) => tour.location === location).length,
    }));
  };

  const getUniqueActivities = (tours) => {
    const allHighlights = tours.flatMap((tour) => tour.highlights || []);
    const uniqueHighlights = [...new Set(allHighlights)];
    return uniqueHighlights.map((highlight) => ({
      name: highlight,
      count: tours.filter((tour) => tour.highlights?.includes(highlight)).length,
    }));
  };

  const getTourTypes = (tours) => {
    const types = [
      { name: "Easy", value: "easy", count: tours.filter((tour) => tour.difficulty === "easy").length },
      { name: "Moderate", value: "moderate", count: tours.filter((tour) => tour.difficulty === "moderate").length },
      { name: "Challenging", value: "challenging", count: tours.filter((tour) => tour.difficulty === "challenging").length },
      { name: "Expert", value: "expert", count: tours.filter((tour) => tour.difficulty === "expert").length },
    ];
    return types.filter((type) => type.count > 0);
  };

  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);

        // Fetch tours from Sanity based on tour type
        let data;
        if (tourType === "domestic") {
          data = await fetchData(queries.getDomesticTours);
        } else if (tourType === "international") {
          data = await fetchData(queries.getInternationalTours);
        } else {
          // Show all tours (domestic + international)
          data = await fetchData(queries.getAllToursCombined);
        }

        // Transform Sanity data to match the expected format
        const transformedTours = data.map((tour) => ({
          img: tour.mainImage ? urlFor(tour.mainImage).width(400).height(300).url() : "/assets/img/destination/01.jpg",
          location: tour.location,
          title: tour.title,
          rating: tour.rating ? tour.rating.toString() : "4.7",
          day: tour.duration || "10 Days",
          number: tour.maxParticipants || "50+",
          price: tour.price,
          priceUnit: tour.priceUnit || "/Per day",
          slug: tour.slug?.current || "tour-details",
          difficulty: tour.difficulty,
          highlights: tour.highlights,
          tourType: tour._type, // Add tour type for identification
        }));

        setTours(transformedTours);
        setFilteredTours(transformedTours);

        // Update filter options based on tour data
        setFilters({
          locations: getUniqueLocations(transformedTours),
          activities: getUniqueActivities(transformedTours),
          tourTypes: getTourTypes(transformedTours),
        });
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
            price: "INR 59.00",
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
            price: "INR 59.00",
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
            price: "INR 59.00",
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
            price: "INR 59.00",
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
            price: "INR 59.00",
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
            price: "INR 59.00",
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
            price: "INR 59.00",
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
            price: "INR 59.00",
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
            price: "INR 59.00",
            priceUnit: "/Per day",
            slug: "november-travel-3",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, [tourType]);

  // Filter handling functions (used only when sidebar is visible)
  const handleLocationFilter = (location) => {
    setFilters((prev) => ({
      ...prev,
      locations: prev.locations.map((loc) => (loc.name === location ? { ...loc, selected: !loc.selected } : loc)),
    }));
  };

  const handleActivityFilter = (activity) => {
    setFilters((prev) => ({
      ...prev,
      activities: prev.activities.map((act) => (act.name === activity ? { ...act, selected: !act.selected } : act)),
    }));
  };

  const handleTourTypeFilter = (tourType) => {
    setFilters((prev) => ({
      ...prev,
      tourTypes: prev.tourTypes.map((type) => (type.value === tourType ? { ...type, selected: !type.selected } : type)),
    }));
  };

  // Apply filters whenever filters change
  useEffect(() => {
    let filtered = [...tours];

    // Filter by locations
    const selectedLocations = filters.locations.filter((loc) => loc.selected).map((loc) => loc.name);
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((tour) => selectedLocations.includes(tour.location));
    }

    // Filter by activities
    const selectedActivities = filters.activities.filter((act) => act.selected).map((act) => act.name);
    if (selectedActivities.length > 0) {
      filtered = filtered.filter((tour) => tour.highlights && tour.highlights.some((highlight) => selectedActivities.includes(highlight)));
    }

    // Filter by tour types (difficulty)
    const selectedTourTypes = filters.tourTypes.filter((type) => type.selected).map((type) => type.value);
    if (selectedTourTypes.length > 0) {
      filtered = filtered.filter((tour) => selectedTourTypes.includes(tour.difficulty));
    }

    setFilteredTours(filtered);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [filters, tours]);

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showSidebar = forceSidebar || tourType === "domestic";
  const cardColXL = showSidebar ? "4" : "3"; // sidebar => 3 per row (xl-4); no sidebar => 4 per row (xl-3)

  return (
    <section className="tour-section section-padding fix">
      {/* WhatsApp Floating Button */}
      <div className="whatsapp-float" onClick={() => window.open("https://wa.me/9978307772", "_blank")}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      </div>

      <div className="container custom-container">
        <div className="tour-destination-wrapper">
          <div className="row g-4">
            <div className={"col-xl-" + (showSidebar ? "9" : "12")}>
              <div className="row g-4">
                {currentTours.map((item, i) => (
                  <div key={item._id || i} className={`col-xl-${cardColXL} col-lg-4 col-md-6 wow fadeInUp wow`} data-wow-delay=".3s">
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
                            ₹{item.price}
                            <span>{item.priceUnit}</span>
                          </h6>
                          {tourType === "international" && !forceSidebar ? (
                            <Link to="/tour/international/explore" className="theme-btn style-2">
                              View More<i className="bi bi-arrow-right"></i>
                            </Link>
                          ) : (
                            <Link to={`/tour/${item.slug}`} className="theme-btn style-2">
                              Book Now<i className="bi bi-arrow-right"></i>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="page-nav-wrap text-center">
                  <ul>
                    <li>
                      <button
                        className="page-numbers"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}
                      >
                        <i className="bi bi-arrow-left"></i>
                      </button>
                    </li>
                    {getPageNumbers().map((pageNum) => (
                      <li key={pageNum}>
                        <button className={`page-numbers ${currentPage === pageNum ? "current" : ""}`} onClick={() => handlePageChange(pageNum)}>
                          {String(pageNum).padStart(2, "0")}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        className="page-numbers"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.5 : 1 }}
                      >
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {showSidebar && (
              <div className="col-xl-3">
                <FilterSidebar
                  filters={filters}
                  filteredCount={filteredTours.length}
                  totalCount={tours.length}
                  onClearAll={() =>
                    setFilters({
                      locations: filters.locations.map((loc) => ({ ...loc, selected: false })),
                      activities: filters.activities.map((act) => ({ ...act, selected: false })),
                      tourTypes: filters.tourTypes.map((type) => ({ ...type, selected: false })),
                    })
                  }
                  onToggleLocation={handleLocationFilter}
                  onToggleActivity={handleActivityFilter}
                  onToggleTourType={handleTourTypeFilter}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tour;
