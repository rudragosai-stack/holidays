import React from "react";

const LogoTest = () => {
  const logoPaths = ["/logo3.png", "/mainimage/logo3.png", "./logo3.png", "logo3.png"];

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
      <h3>Logo Test Component</h3>
      <p>Testing different logo paths:</p>
      {logoPaths.map((path, index) => (
        <div key={index} style={{ margin: "10px 0", padding: "10px", border: "1px solid #eee" }}>
          <p>
            <strong>Path:</strong> {path}
          </p>
          <img
            src={path}
            alt={`Logo test ${index + 1}`}
            style={{ height: "50px", width: "auto", border: "1px solid red" }}
            onError={(e) => {
              e.target.style.border = "2px solid red";
              e.target.alt = "FAILED TO LOAD";
            }}
            onLoad={(e) => {
              e.target.style.border = "2px solid green";
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default LogoTest;
