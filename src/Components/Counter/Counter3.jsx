import React, { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";

const Counter3 = () => {
  useEffect(() => {
    loadBackgroudImages();
  }, []);

  return (
    <section className="counter-section-2 fix">
      <div className="container-fluid">
        <div className="counter-wrapper-2 bg-cover" data-background="/mainimage/banner1.jpg">
          <div className="counter-image">
            <img src="/assets/img/counter-image.png" alt="img" />
          </div>
          <div className="counter-items-2 wow fadeInUp wow" data-wow-delay=".2s">
            <div className="counter-content">
              <h2>
                <span className="count">26</span>+
              </h2>
              <p>Years Experiences</p>
            </div>
          </div>
          <div className="counter-items-2 wow fadeInUp wow" data-wow-delay=".4s">
            <div className="counter-content">
              <h2>
                <span className="count">3</span>.6k+
              </h2>
              <p>Yearly Customers</p>
            </div>
          </div>
          <div className="counter-items-2 wow fadeInUp wow" data-wow-delay=".6s">
            <div className="counter-content">
              <h2>
                <span className="count">46</span>+
              </h2>
              <p>Visitors daily</p>
            </div>
          </div>
          <div className="counter-items-2 style-2 wow fadeInUp wow" data-wow-delay=".8s">
            <div className="counter-content">
              <h2>
                <span className="count">56</span>+
              </h2>
              <p>Awards &amp; honors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter3;
