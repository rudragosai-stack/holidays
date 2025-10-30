import React, { useEffect } from "react";

const StudioRedirect = () => {
  useEffect(() => {
    // Redirect to the deployed Sanity Studio
    window.location.href = "https://oneworldholidays.sanity.studio/";
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
                  <a href="https://oneworldholidays.sanity.studio/" className="btn btn-primary">
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
