import React, { useState } from "react";

const OptimizedImage = ({ src, alt, className = "", width, height, loading = "lazy", placeholder = "/mainimage/small.jpg", ...props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`image-container ${className}`} style={{ position: "relative" }}>
      {/* Placeholder/Loading state */}
      {!imageLoaded && !imageError && (
        <img
          src={placeholder}
          alt="Loading..."
          className={`placeholder ${className}`}
          style={{
            width: width || "100%",
            height: height || "auto",
            filter: "blur(5px)",
            transition: "opacity 0.3s ease",
          }}
          {...props}
        />
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className={`main-image ${className} ${imageLoaded ? "loaded" : "loading"}`}
        style={{
          width: width || "100%",
          height: height || "auto",
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          position: imageLoaded ? "static" : "absolute",
          top: 0,
          left: 0,
        }}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />

      {/* Error state */}
      {imageError && (
        <div
          className="image-error"
          style={{
            width: width || "100%",
            height: height || "200px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          Image not available
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
