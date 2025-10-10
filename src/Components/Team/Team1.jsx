import React from "react";
import { Link } from "react-router";

const Team1 = () => {
  const teamContent = [
    { img: "/mainimage/tourist1.jpg", name: "Esther howard", content: "Tourist Guide", instagram: "#", facebook: "#", twitter: "#", linkedin: "#" },
    { img: "/mainimage/tourist2.jpg", name: "Leslie Alexander", content: "Tourist Guide", instagram: "#", facebook: "#", twitter: "#", linkedin: "#" },
    { img: "/mainimage/tourist3.jpg", name: "Theresa Web", content: "Tourist Guide", instagram: "#", facebook: "#", twitter: "#", linkedin: "#" },
    { img: "/mainimage/tourist4.jpg", name: "Floyd Miles", content: "Tourist Guide", instagram: "#", facebook: "#", twitter: "#", linkedin: "#" },
  ];

  return (
    <section className="team-section fix section-padding">
      <div className="jip-shape float-bob-x">
        <img src="/assets/img/team/jip.png" alt="img" />
      </div>
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title wow fadeInUp">Meet with Guide</span>
          <h2 className="wow fadeInUp wow" data-wow-delay=".2s">
            Tour Guide
          </h2>
        </div>
        <div className="row">
          {teamContent.map((item, i) => (
            <div key={i} className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp wow" data-wow-delay=".2s">
              <div className="team-card-item">
                <div className="team-image">
                  <img src={item.img} alt="img" style={{ height: "460px", width: "100%", objectFit: "cover" }} />
                </div>
                <div className="team-content">
                  <h4>
                    <Link to="/team/team-details">{item.name}</Link>
                  </h4>
                  <p>{item.content}</p>
                  <div className="social-profile">
                    <ul>
                      <li>
                        <a href={item.facebook}>
                          <i className="bi bi-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href={item.twitter}>
                          <i className="bi bi-twitter-x"></i>
                        </a>
                      </li>
                      <li>
                        <a href={item.linkedin}>
                          {" "}
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a href={item.instagram}>
                          <i className="bi bi-instagram"></i>
                        </a>
                      </li>
                    </ul>
                    <span className="plus-btn">
                      <i className="bi bi-share"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team1;
