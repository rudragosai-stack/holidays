import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchData, queries, urlFor } from "../../lib/sanity";

export default function InternationalMenu({ onItemClick }) {
  const [items, setItems] = useState([]);
  const [hoverIdx, setHoverIdx] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const data = await fetchData(queries.getInternationalTours);
      if (!isMounted) return;
      const mapped = (data || []).map((tour) => {
        const gallery = Array.isArray(tour.galleryImages) ? tour.galleryImages : [];
        const imageUrls = [];
        if (tour.mainImage) imageUrls.push(urlFor(tour.mainImage).width(800).height(450).url());
        for (let i = 0; i < gallery.length && imageUrls.length < 2; i++) {
          const img = gallery[i];
          if (img) imageUrls.push(urlFor(img).width(800).height(450).url());
        }
        while (imageUrls.length < 2) imageUrls.push("/mainimage/banner2.jpg");
        return {
          title: tour.title,
          location: tour.location,
          slug: tour.slug?.current || "",
          images: imageUrls,
        };
      });
      setItems(mapped);
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="international-menu">
      <div className="international-menu-left">
        <ul className="international-menu-list">
          {items.map((item, idx) => (
            <li key={item.slug || idx} onMouseEnter={() => setHoverIdx(idx)}>
              <Link to={`/tour/${item.slug}`} onClick={onItemClick}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="international-menu-right">
        <img
          key={(items[hoverIdx]?.images?.[0] || "/mainimage/banner2.jpg") + "-left"}
          className="fade-in"
          src={items[hoverIdx]?.images?.[0] || "/mainimage/banner2.jpg"}
          alt="International 1"
        />
        <img
          key={(items[hoverIdx]?.images?.[1] || "/mainimage/austria.jpg") + "-right"}
          className="fade-in"
          src={items[hoverIdx]?.images?.[1] || "/mainimage/austria.jpg"}
          alt="International 2"
        />
      </div>
    </div>
  );
}
