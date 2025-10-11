import React, { useEffect } from "react";
import { Link } from "react-router";
import loadBackgroudImages from "../Common/loadBackgroudImages";

const Footer1 = () => {
  useEffect(() => {
    loadBackgroudImages();
  }, []);

  return (
    <footer style={{ backgroundColor: "#ffffff", padding: "60px 0 0" }}>
      <div className="container">
        {/* Main Footer Content */}
        <div className="row">
          {/* Brand and Social Media */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "20px" }}>
                <img src="/mainimage/logo3.png" alt="Logo" style={{ height: "50px", width: "auto" }} />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href="#"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#1ca8cb",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  f
                </a>
                <a
                  href="#"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#1ca8cb",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                  }}
                >
                  💬
                </a>
                <a
                  href="#"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#1ca8cb",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  in
                </a>
                <a
                  href="#"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#1ca8cb",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                  }}
                >
                  📷
                </a>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#000",
                marginBottom: "20px",
                fontFamily: "sans-serif",
              }}
            >
              About
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/about" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  About us
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/destination" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  Destination
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/blog" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  News & article
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/testimonials" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#000",
                marginBottom: "20px",
                fontFamily: "sans-serif",
              }}
            >
              Features
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  Payments
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  Virtual Account
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  Referral Bonus
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  Go-Pay
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#000",
                marginBottom: "20px",
                fontFamily: "sans-serif",
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  Careers
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  Privacy & Policy
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  FAQ
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="#" style={{ color: "#666", textDecoration: "none", fontFamily: "sans-serif" }}>
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us & Get the App */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#000",
                marginBottom: "20px",
                fontFamily: "sans-serif",
              }}
            >
              Contact Us
            </h4>
            <p style={{ color: "#666", marginBottom: "30px", fontFamily: "sans-serif" }}>Turmet@gmail.com</p>

            <h4
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#000",
                marginBottom: "20px",
                fontFamily: "sans-serif",
              }}
            >
              Get the App
            </h4>
            <button
              style={{
                backgroundColor: "#1ca8cb",
                color: "white",
                border: "none",
                borderRadius: "25px",
                padding: "12px 30px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                fontFamily: "sans-serif",
              }}
            >
              Download app
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
      </div>
      <div
        style={{
          backgroundColor: "#000",
          color: "white",
          padding: "20px 0",
          marginTop: "40px",
          width: "100%",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p style={{ margin: 0, fontFamily: "sans-serif" }}>Privacy and policy</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p style={{ margin: 0, fontFamily: "sans-serif" }}>All rights reserved @ Turmet.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
