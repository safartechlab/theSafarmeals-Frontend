import React from "react";
import "./poster.css";
import { Link } from "react-router-dom";

function Poster() {
  return (
    <section className="poster">
      {/* LEFT */}
      <div className="poster-left">
        <h1>
          Hungry? <br />
          <span>We Deliver Happiness</span>
        </h1>

        <p>
          Order food from your favorite restaurants and get it delivered hot &
          fresh at your doorstep.
        </p>

        {/* SEARCH */}
        <div className="poster-search">
          <span className="search-icon">🔍</span>
          <input placeholder="Search dishes or restaurants" />
        </div>

        {/* ACTIONS */}
        <div className="poster-actions">
          <Link to="/menu" className="primary-btn">
            Order Now
          </Link>
          <Link to="/menu" className="secondary-btn">
            View Menu
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="poster-right">
        <div className="image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt="Food"
          />
        </div>
      </div>
    </section>
  );
}

export default Poster;
