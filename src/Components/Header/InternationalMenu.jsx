import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchData, queries } from "../../lib/sanity";

export default function InternationalMenu({ onItemClick }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const data = await fetchData(queries.getInternationalTours);
      if (!isMounted) return;
      const mapped = (data || []).map((tour) => ({
        title: tour.title,
        location: tour.location,
        slug: tour.slug?.current || "",
      }));
      setItems(mapped);
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ul>
      {items.map((item, idx) => (
        <li key={item.slug || idx}>
          <Link to={`/tour/${item.slug}`} onClick={onItemClick}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
