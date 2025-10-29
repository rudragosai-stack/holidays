import React, { useEffect, useRef, useState } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import { Link } from "react-router";
import { urlFor, fetchData, queries } from "../../lib/sanity";

const TourDetails = ({ slug }) => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageUrl, setActiveImageUrl] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        if (!slug) {
          setLoading(false);
          return;
        }
        // Try to get tour from any tour type (domestic, international, or legacy tour)
        const data = await fetchData(queries.getAnyTourBySlug, { slug });
        console.log("Fetched tour data:", data);
        console.log("Tour mainImage:", data?.mainImage);
        console.log("Tour type:", data?._type);
        console.log("Full tour object keys:", data ? Object.keys(data) : "No data");
        console.log("Image URL attempt:", data?.mainImage ? urlFor(data.mainImage).width(1200).height(700).url() : "No mainImage");

        // If no tour data found, try to get from combined tour listing as fallback
        if (!data || (Array.isArray(data) && data.length === 0)) {
          console.log("No tour data found, trying fallback...");
          const allTours = await fetchData(queries.getAllToursCombined);
          const fallbackTour = allTours.find((t) => t.slug?.current === slug);
          if (fallbackTour) {
            console.log("Found fallback tour:", fallbackTour);
            setTour(fallbackTour);
          } else {
            // Use static fallback data if no Sanity data
            console.log("Using static fallback data for slug:", slug);
            const staticTours = [
              {
                _id: "1",
                title: "Brooklyn Beach Resort Tour",
                location: "Indonesia",
                price: "INR 59.00",
                priceUnit: "/Per day",
                slug: { current: "brooklyn-beach-resort-tour" },
                img: "/assets/img/destination/01.jpg",
                mainImage: null,
              },
              {
                _id: "2",
                title: "Pak Chumphon Town Tour",
                location: "Indonesia",
                price: "INR 59.00",
                priceUnit: "/Per day",
                slug: { current: "pak-chumphon-town-tour" },
                img: "/assets/img/destination/02.jpg",
                mainImage: null,
              },
              {
                _id: "3",
                title: "Java & Bali One Life Adventure",
                location: "Indonesia",
                price: "INR 59.00",
                priceUnit: "/Per day",
                slug: { current: "java-bali-adventure" },
                img: "/assets/img/destination/03.jpg",
                mainImage: null,
              },
              {
                _id: "4",
                title: "Places To Travel In November",
                location: "Indonesia",
                price: "INR 59.00",
                priceUnit: "/Per day",
                slug: { current: "november-travel" },
                img: "/assets/img/destination/04.jpg",
                mainImage: null,
              },
              {
                _id: "5",
                title: "Brooklyn Beach Resort Tour 2",
                location: "Indonesia",
                price: "INR 59.00",
                priceUnit: "/Per day",
                slug: { current: "brooklyn-beach-resort-tour-2" },
                img: "/assets/img/destination/05.jpg",
                mainImage: null,
              },
              {
                _id: "6",
                title: "Pak Chumphon Town Tour 2",
                location: "Indonesia",
                price: "INR 59.00",
                priceUnit: "/Per day",
                slug: { current: "pak-chumphon-town-tour-2" },
                img: "/assets/img/destination/06.jpg",
                mainImage: null,
              },
              {
                _id: "7",
                title: "Java & Bali One Life Adventure 2",
                location: "Indonesia",
                price: "INR 59.00",
                priceUnit: "/Per day",
                slug: { current: "java-bali-adventure-2" },
                img: "/assets/img/destination/07.jpg",
                mainImage: null,
              },
              {
                _id: "8",
                title: "Places To Travel In November 2",
                location: "Indonesia",
                price: "INR 59.00",
                priceUnit: "/Per day",
                slug: { current: "november-travel-2" },
                img: "/assets/img/destination/08.jpg",
                mainImage: null,
              },
              {
                _id: "9",
                title: "Places To Travel In November 3",
                location: "Indonesia",
                price: "INR 59.00",
                priceUnit: "/Per day",
                slug: { current: "november-travel-3" },
                img: "/assets/img/destination/04.jpg",
                mainImage: null,
              },
              {
                _id: "10",
                title: "Test Tour 2",
                location: "Test Location",
                price: "INR 99.00",
                priceUnit: "/Per day",
                slug: { current: "test2" },
                img: "/assets/img/destination/01.jpg",
                mainImage: null,
              },
            ];
            const staticTour = staticTours.find((t) => t.slug.current === slug);
            if (staticTour) {
              console.log("Using static tour data:", staticTour);
              setTour(staticTour);
            } else {
              setTour(null);
            }
          }
        } else {
          setTour(data);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [slug]);

  useEffect(() => {
    loadBackgroudImages();
  }, [tour]);

  // Reset active image when tour changes
  useEffect(() => {
    setActiveImageUrl(null);
  }, [tour]);

  const faqContent = [
    {
      title: "How do I book a tour with your agency?",
      content: "Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.Mauris et mollis quam. Nullam fringilla erat id ante",
    },
    {
      title: " What payment methods do you accept?",
      content: "Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.Mauris et mollis quam. Nullam fringilla erat id ante",
    },
    {
      title: "Can I customize my travel itinerary?",
      content: "Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.Mauris et mollis quam. Nullam fringilla erat id ante",
    },
    {
      title: " What is your cancellation policy?",
      content: "Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.Mauris et mollis quam. Nullam fringilla erat id ante",
    },
  ];

  const accordionContentRef = useRef(null);
  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [firstItemOpen, setFirstItemOpen] = useState(true);

  // Helper intentionally unused here; kept for future use when rendering prices in this component
  const FORMAT_PRICE_INR = (price) => {
    if (!price) return "";
    if (typeof price !== "string") return String(price);
    const numeric = price
      .replace(/^\$/g, "")
      .replace(/^INR\s*/i, "")
      .trim();
    return `₹${numeric}`;
  };

  // Normalize Sanity Portable Text blocks (arrays of block objects) into plain text paragraphs
  const extractTextFromBlocks = (blocks) => {
    if (!Array.isArray(blocks)) return [];
    return blocks
      .map((block) => {
        if (typeof block === "string") return block;
        if (block && Array.isArray(block.children)) {
          return block.children
            .map((c) => (typeof c?.text === "string" ? c.text : ""))
            .join("")
            .trim();
        }
        return "";
      })
      .filter((p) => p);
  };

  const handleItemClick = (index) => {
    if (index === openItemIndex) {
      setOpenItemIndex(-1);
    } else {
      setOpenItemIndex(index);
    }
  };
  useEffect(() => {
    if (firstItemOpen) {
      setOpenItemIndex(0);
      setFirstItemOpen(false);
    }
  }, [firstItemOpen]);

  // Render Sanity Portable Text with support for headings, paragraphs, blockquotes, and lists
  const renderPortableText = (blocks = []) => {
    const elements = [];
    let currentList = null; // {type: 'bullet'|'number', items: []}

    const flushList = () => {
      if (!currentList) return;
      const ListTag = currentList.type === "number" ? "ol" : "ul";
      elements.push(
        <ListTag
          key={`list-${elements.length}`}
          className="mb-3"
          style={{
            listStyleType: currentList.type === "number" ? "decimal" : "disc",
            paddingLeft: "1.25rem",
            marginLeft: 0,
            listStylePosition: "outside",
          }}
        >
          {currentList.items.map((item, idx) => (
            <li key={`li-${idx}`}>{item}</li>
          ))}
        </ListTag>
      );
      currentList = null;
    };

    blocks.forEach((block, index) => {
      if (!block || block._type !== "block") return;
      const text = (block.children || [])
        .map((child) => (typeof child?.text === "string" ? child.text : ""))
        .join("")
        .trim();
      if (!text) return;

      // Handle list items
      if (block.listItem) {
        const listType = block.listItem === "number" ? "number" : "bullet";
        if (!currentList || currentList.type !== listType) {
          flushList();
          currentList = { type: listType, items: [] };
        }
        currentList.items.push(text);
        // If next block is not a list item, flush
        const next = blocks[index + 1];
        if (!next || next._type !== "block" || !next.listItem) {
          flushList();
        }
        return;
      }

      // If we reach here and a list was open, flush it
      flushList();

      switch (block.style) {
        case "h2":
          elements.push(
            <h2 key={`h2-${index}`} className="mb-3">
              {text}
            </h2>
          );
          break;
        case "h3":
          elements.push(
            <h3 key={`h3-${index}`} className="mb-2">
              {text}
            </h3>
          );
          break;
        case "blockquote":
          elements.push(
            <blockquote key={`bq-${index}`} className="blockquote mb-3">
              <p>{text}</p>
            </blockquote>
          );
          break;
        default:
          elements.push(
            <p key={`p-${index}`} className="mb-3">
              {text}
            </p>
          );
      }
    });

    // Flush any remaining list
    if (currentList) flushList();

    return elements;
  };

  if (loading) {
    return (
      <section className="activities-details-section fix section-padding">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading tour...</span>
            </div>
            <p className="mt-3">Loading tour details...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state if no tour is found
  if (!tour) {
    return (
      <section className="activities-details-section fix section-padding">
        <div className="container">
          <div className="text-center py-5">
            <h3>Tour not found</h3>
            <p className="mt-3">The tour you're looking for doesn't exist or has been removed.</p>
            {error && (
              <div className="alert alert-warning mt-3">
                <small>Error: {error}</small>
              </div>
            )}
            <Link to="/tour" className="theme-btn mt-3">
              Back to Tours <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="activities-details-section fix section-padding">
      {/* WhatsApp Floating Button */}
      <div className="whatsapp-float" onClick={() => window.open("https://wa.me/1234567890", "_blank")}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      </div>

      <div className="container">
        <div className="activities-details-wrapper">
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="details-thumb">
                <img
                  src={(() => {
                    if (activeImageUrl) return activeImageUrl;
                    if (tour?.mainImage) {
                      try {
                        return urlFor(tour.mainImage).width(1200).height(700).url();
                      } catch (error) {
                        console.log("Error generating Sanity image URL:", error);
                        return tour?.img || "/assets/img/destails/tour-details.jpg";
                      }
                    }
                    return tour?.img || "/assets/img/destails/tour-details.jpg";
                  })()}
                  alt={tour?.title || "Tour Image"}
                  onError={(e) => {
                    console.log("Image failed to load, using fallback");
                    e.target.src = "/assets/img/destails/tour-details.jpg";
                  }}
                  onLoad={() => {
                    console.log("Image loaded successfully");
                  }}
                />
                <ul className="image-list">
                  {(() => {
                    // Always include the current main image as a thumbnail so users can switch back
                    let mainThumbUrl = "";
                    let mainLargeUrl = "";
                    try {
                      if (tour?.mainImage) {
                        mainThumbUrl = urlFor(tour.mainImage).width(160).height(110).url();
                        mainLargeUrl = urlFor(tour.mainImage).width(1200).height(700).url();
                      } else if (tour?.img) {
                        mainThumbUrl = tour.img;
                        mainLargeUrl = tour.img;
                      } else {
                        mainThumbUrl = "/assets/img/destails/tour-details.jpg";
                        mainLargeUrl = "/assets/img/destails/tour-details.jpg";
                      }
                    } catch (err) {
                      console.log("Error generating main image URLs:", err);
                    }
                    const isActiveMain = (activeImageUrl ?? mainLargeUrl) === mainLargeUrl;
                    return (
                      <li key="main-thumb">
                        <img
                          src={mainThumbUrl}
                          alt={tour?.title || "Main image"}
                          onClick={() => {
                            if (mainLargeUrl) setActiveImageUrl(mainLargeUrl);
                          }}
                          style={{
                            cursor: "pointer",
                            width: "120px",
                            height: "80px",
                            objectFit: "cover",
                            border: isActiveMain ? "2px solid #0d6efd" : "1px solid rgba(0,0,0,0.1)",
                            borderRadius: "6px",
                          }}
                          aria-selected={isActiveMain}
                        />
                      </li>
                    );
                  })()}
                  {tour?.galleryImages && tour.galleryImages.length > 0 ? (
                    tour.galleryImages.slice(0, 3).map((galleryImage, index) => {
                      let thumbUrl = "";
                      let largeUrl = "";
                      try {
                        thumbUrl = urlFor(galleryImage).width(160).height(110).url();
                        largeUrl = urlFor(galleryImage).width(1200).height(700).url();
                      } catch (err) {
                        console.log("Error generating gallery image URLs:", err);
                      }
                      const currentMainUrl = (() => {
                        if (activeImageUrl) return activeImageUrl;
                        try {
                          return tour?.mainImage ? urlFor(tour.mainImage).width(1200).height(700).url() : tour?.img || "/assets/img/destails/tour-details.jpg";
                        } catch {
                          return tour?.img || "/assets/img/destails/tour-details.jpg";
                        }
                      })();
                      const isActive = currentMainUrl === largeUrl;
                      return (
                        <li key={index}>
                          <img
                            src={thumbUrl}
                            alt={galleryImage.alt || `Tour gallery ${index + 1}`}
                            onClick={() => {
                              if (largeUrl) setActiveImageUrl(largeUrl);
                            }}
                            style={{
                              cursor: "pointer",
                              width: "120px",
                              height: "80px",
                              objectFit: "cover",
                              border: isActive ? "2px solid #0d6efd" : "1px solid rgba(0,0,0,0.1)",
                              borderRadius: "6px",
                            }}
                            aria-selected={isActive}
                          />
                        </li>
                      );
                    })
                  ) : (
                    // Fallback to static images if no gallery images
                    <>
                      {(() => {
                        const fallbacks = ["/assets/img/destails/tour-details-2.jpg", "/assets/img/destails/tour-details-3.jpg", "/assets/img/destails/tour-details-4.jpg"];
                        return fallbacks.map((src, i) => {
                          const currentMainUrl =
                            activeImageUrl ||
                            (tour?.mainImage
                              ? (() => {
                                  try {
                                    return urlFor(tour.mainImage).width(1200).height(700).url();
                                  } catch {
                                    return tour?.img || "/assets/img/destails/tour-details.jpg";
                                  }
                                })()
                              : tour?.img || "/assets/img/destails/tour-details.jpg");
                          const isActive = currentMainUrl === src;
                          return (
                            <li key={src}>
                              <img
                                src={src}
                                alt={`Tour gallery ${i + 1}`}
                                onClick={() => setActiveImageUrl(src)}
                                style={{
                                  cursor: "pointer",
                                  width: "120px",
                                  height: "80px",
                                  objectFit: "cover",
                                  border: isActive ? "2px solid #0d6efd" : "1px solid rgba(0,0,0,0.1)",
                                  borderRadius: "6px",
                                }}
                                aria-selected={isActive}
                              />
                            </li>
                          );
                        });
                      })()}
                    </>
                  )}
                </ul>
              </div>
              <div className="activities-details-content">
                <div className="tour-type-badge mb-3">
                  {tour?._type === "domesticTour" && <span className="badge bg-success me-2">Domestic Tour</span>}
                  {tour?._type === "internationalTour" && <span className="badge bg-primary me-2">International Tour</span>}
                </div>
                <h2 className="mb-3">{tour?.title || "Ghorepani Poon Hill Trek"}</h2>
                <div className="tour-description">
                  {/* Short Description */}
                  {tour?.description && (
                    <p className="mb-3">
                      <strong>Overview:</strong> {tour.description}
                    </p>
                  )}

                  {/* Detailed Description */}
                  {tour?.detailedDescription && tour.detailedDescription.length > 0 ? (
                    <div className="detailed-content">
                      <h4 className="mb-3">Detailed Information</h4>
                      {renderPortableText(tour.detailedDescription)}
                    </div>
                  ) : (
                    <div className="detailed-content">
                      <h4 className="mb-3">About This Tour</h4>
                      <p>
                        Consectetur adipisicing elit sed do eiusmod tempor is incididunt ut labore et dolore of magna aliqua. ut enim ad minim veniam made of owl the quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea dolor commodo consequat duis aute irure and dolor in reprehenderit.Nullam semper quam mauris nec mollis
                        felis aliquam eu ut non gravida mi quam mauris nec mollis felis aliquam phasellus.
                      </p>
                      <p className="mt-3">
                        Consectetur adipisicing elit sed do eiusmod tempor is incididunt ut labore et dolore of magna aliqua. ut enim ad minim veniam made of owl the quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea dolor commodo consequat duis aute irure and dolor in reprehenderit.Nullam semper quam mauris.
                      </p>
                    </div>
                  )}
                </div>
                {tour?.highlights && tour.highlights.length > 0 && (
                  <div className="tour-highlights mb-4">
                    <h3>Tour Highlights</h3>
                    <div className="highlights-list">
                      <ul className="list-unstyled">
                        {tour.highlights.map((highlight, index) => (
                          <li key={index} className="mb-2">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div className="activities-list-item">
                  <h3>Experience the Difference</h3>
                  <div className="activities-item">
                    {(() => {
                      // Check for benefits first (what's actually in Sanity), then experienceDifferences
                      const items = tour?.benefits || tour?.experienceDifferences;
                      if (items && items.length > 0) {
                        const mid = Math.ceil(items.length / 2);
                        const leftItems = items.slice(0, mid);
                        const rightItems = items.slice(mid);
                        return (
                          <>
                            <ul className="activities-list">
                              {leftItems.map((text, idx) => (
                                <li key={`exp-left-${idx}`}>
                                  <img src="/mainimage/qua1.png" alt="benefit" width="24" height="24" className="me-2" />
                                  {text}
                                </li>
                              ))}
                            </ul>
                            <ul className="activities-list">
                              {rightItems.map((text, idx) => (
                                <li key={`exp-right-${idx}`}>
                                  <img src="/mainimage/qua1.png" alt="benefit" width="24" height="24" className="me-2" />
                                  {text}
                                </li>
                              ))}
                            </ul>
                          </>
                        );
                      }
                      // Fallback to static content
                      return (
                        <>
                          <ul className="activities-list">
                            <li>
                              <img src="/qua.png" alt="benefit" width="24" height="24" className="me-2" />
                              Trusted, Local Travel Experts
                            </li>
                            <li>
                              <img src="/qua.png" alt="benefit" width="24" height="24" className="me-2" />
                              Flexible, Hassle-Free Bookings
                            </li>
                            <li>
                              <img src="/qua.png" alt="benefit" width="24" height="24" className="me-2" />
                              Real-Time Itinerary Updates
                            </li>
                          </ul>
                          <ul className="activities-list">
                            <li>
                              <img src="/qua.png" alt="benefit" width="24" height="24" className="me-2" />
                              Flexible Cancellation Policies
                            </li>
                            <li>
                              <img src="/qua.png" alt="benefit" width="24" height="24" className="me-2" />
                              Customized Travel Experiences
                            </li>
                            <li>
                              <img src="/qua.png" alt="benefit" width="24" height="24" className="me-2" />
                              Exclusive Travel Deals
                            </li>
                          </ul>
                        </>
                      );
                    })()}
                  </div>
                </div>
                <div className="activities-box-wrap">
                  <div className="activities-box-area">
                    <div className="activities-box-item">
                      <div className="icon">
                        <img src="/assets/img/icon/27.svg" alt="img" />
                      </div>
                      <div className="content">
                        <span>Duration</span>
                        <h6>{tour?.duration || "10 Days"}</h6>
                      </div>
                    </div>
                    <div className="activities-box-item style-2">
                      <div className="icon">
                        <img src="/assets/img/icon/28.svg" alt="img" />
                      </div>
                      <div className="content">
                        <span>Max Participants</span>
                        <h6>{tour?.maxParticipants || "50+"}</h6>
                      </div>
                    </div>
                    <div className="activities-box-item">
                      <div className="icon">
                        <img src="/assets/img/icon/29.svg" alt="img" />
                      </div>
                      <div className="content">
                        <span>Location</span>
                        <h6>{tour?.location || "Various"}</h6>
                      </div>
                    </div>
                    <div className="activities-box-item">
                      <div className="icon">
                        <img src="/assets/img/icon/30.svg" alt="img" />
                      </div>
                      <div className="content">
                        <span>Difficulty</span>
                        <h6>{tour?.difficulty ? tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1) : "Moderate"}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="activities-box-area mb-0">
                    <div className="activities-box-item">
                      <div className="icon">
                        <img src="/assets/img/icon/31.svg" alt="img" />
                      </div>
                      <div className="content">
                        <span>Hotel Transfer</span>
                        <h6>{tour?.hotelTransferAvailable === true ? "Available" : tour?.hotelTransferAvailable === false ? "Not Available" : "Ask us"}</h6>
                      </div>
                    </div>
                    <div className="activities-box-item">
                      <div className="icon">
                        <img src="/assets/img/icon/32.svg" alt="img" />
                      </div>
                      <div className="content">
                        <span>Next Tour</span>
                        <h6>{tour?.nextTourAvailable === true ? "Available" : tour?.nextTourAvailable === false ? "Not Scheduled" : "On Request"}</h6>
                      </div>
                    </div>
                    <div className="activities-box-item">
                      <div className="icon">
                        <img src="/assets/img/icon/33.svg" alt="img" />
                      </div>
                      <div className="content">
                        <span>{typeof tour?.guideCount === "number" ? `${tour.guideCount} Guide${tour.guideCount === 1 ? "" : "s"}` : "Guides"}</span>
                        <h6>{typeof tour?.guideCount === "number" ? "Guided" : "Ask us"}</h6>
                      </div>
                    </div>
                    <div className="activities-box-item">
                      <div className="icon">
                        <img src="/assets/img/icon/34.svg" alt="img" />
                      </div>
                      <div className="content">
                        <span>Maximum Age</span>
                        <h6>{tour?.maxAge ? String(tour.maxAge) : "-"}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="faq-items">
                  <h3>Tour Plan</h3>
                  <div className="faq-accordion">
                    <div className="accordion" id="accordion">
                      {(() => {
                        const items =
                          Array.isArray(tour?.tourPlan) && tour.tourPlan.length > 0
                            ? tour.tourPlan.map((it) => {
                                if (typeof it === "string") return { title: it, content: "" };
                                const rawContent = it?.content || it?.description || it?.details || "";
                                const normalizedContent = Array.isArray(rawContent) ? extractTextFromBlocks(rawContent) : rawContent;
                                return {
                                  title: it?.title || it?.dayTitle || it?.name || "",
                                  content: normalizedContent,
                                };
                              })
                            : faqContent;
                        return items.map((item, index) => {
                          const collapseId = `faq-${index}`;
                          return (
                            <div key={index} className={`accordion-item mb-3 ${index === openItemIndex ? "active" : ""}`}>
                              <h5 onClick={() => handleItemClick(index)} className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#${collapseId}`}
                                  aria-expanded={index === openItemIndex}
                                  aria-controls={collapseId}
                                >
                                  {item.title || `Day ${index + 1}`}
                                </button>
                              </h5>
                              <div ref={accordionContentRef} id={collapseId} className="accordion-collapse collapse" data-bs-parent="#accordion">
                                <div className="accordion-body">{Array.isArray(item.content) ? item.content.map((line, i) => <p key={i}>{line}</p>) : <p>{item.content}</p>}</div>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="main-bar main-sideber">
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4>Contact for Booking</h4>
                  </div>
                  <div className="desti-booking-form">
                    <form action="#" id="contact-form" method="POST">
                      <div className="row g-4">
                        <div className="col-lg-12">
                          <div className="form-clt">
                            <input type="text" name="name" id="name11" placeholder="Your Name" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-clt">
                            <input type="text" name="email" id="email212" placeholder="Your Email" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-clt">
                            <textarea name="message" id="message11" placeholder="Type Comment Here"></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button type="submit" className="theme-btn text-center">
                            Send Now <i className="bi bi-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="booking-bg bg-cover" data-background="/mainimage/banner.jpg">
                  <h3 className="text-title">Book Now And Enjoy Amazing Savings!</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourDetails;
