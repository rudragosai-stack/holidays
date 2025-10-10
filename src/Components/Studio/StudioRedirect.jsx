import React, { useEffect } from "react";

const StudioRedirect = () => {
  useEffect(() => {
    // Redirect to the Sanity Studio
    window.location.href = "http://localhost:3333";
  }, []);

  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Redirecting to Sanity Studio...</h3>
              <p className="card-text">You will be redirected to the Sanity Studio in a moment.</p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="mt-3">
                <p className="text-muted">
                  If you're not redirected automatically,{" "}
                  <a href="http://localhost:3333" className="btn btn-primary">
                    click here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioRedirect;
