import React, { useEffect, useState } from "react";

const Counter1 = () => {
  const [counters, setCounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCounters = async () => {
      try {
        setLoading(true);

        // Fetch counters from Sanity
        const response = await fetch("/api/v2024-01-01/data/query/production?query=*%5B_type+%3D%3D+%22counter%22+%26%26+isActive+%3D%3D+true%5D+%7C+order%28order+asc%29");
        const apiData = await response.json();
        const data = apiData.result || [];

        setCounters(data);
      } catch (err) {
        console.error("Error loading counters:", err);
        setError(err.message);

        // Fallback to static data if Sanity fails
        setCounters([
          {
            count: 26,
            suffix: "+",
            description: "Years Experiences",
            order: 1,
          },
          {
            count: 3.6,
            suffix: "+",
            description: "Yearly Customers",
            order: 2,
          },
          {
            count: 46,
            suffix: "+",
            description: "Visitors daily",
            order: 3,
          },
          {
            count: 56,
            suffix: "+",
            description: "Awards & honors",
            order: 4,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadCounters();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="counter-section fix" style={{ backgroundColor: "#113d48" }}>
        <div className="container">
          <div className="counter-wrapper">
            <div className="text-center text-light py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading counters...</span>
              </div>
              <p className="mt-3">Loading counters...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state if no counters are available
  if (counters.length === 0) {
    return (
      <section className="counter-section fix" style={{ backgroundColor: "#113d48" }}>
        <div className="container">
          <div className="counter-wrapper">
            <div className="text-center text-light py-5">
              <h3>No counters available</h3>
              {error && (
                <div className="alert alert-warning mt-3">
                  <small>Note: Using fallback content. {error}</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="counter-section fix" style={{ backgroundColor: "#113d48" }}>
      <div className="container">
        <div className="counter-wrapper">
          {counters.map((counter, index) => (
            <div key={counter._id || index} className={`counter-items ${index === counters.length - 1 ? "style-2" : ""} wow fadeInUp wow`} data-wow-delay={`${(index + 1) * 0.2}s`}>
              <div className="counter-content">
                <h2>
                  <span className="count">{counter.count}</span>
                  {counter.suffix || ""}
                </h2>
                <p>{counter.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter1;
