import React from "react";
import "./poster.css";

function Poster() {
  return (
    <section className="poster">
      {/* LEFT CONTENT */}
      <div className="poster-left">
        <h1>
          Hungry? <br />
          <span>We Deliver Happiness</span>
        </h1>

        <p>
          Order food from your favorite restaurants and get it delivered
          hot & fresh at your doorstep.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for food or restaurants"
          />
          <button>Search</button>
        </div>

        <div className="poster-actions">
          <button className="primary-btn">Order Now</button>
          <button className="secondary-btn">View Menu</button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="poster-right">
        <div className="image-circle">
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


