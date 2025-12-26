import React from "react";
import "./workflow.css";

function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2>How We Works</h2>
      <p className="subtitle">
        Order food online in just a few simple steps
      </p>

      <div className="steps">
        <div className="step-card">
          <div className="icon">🔍</div>
          <h3>Search Food</h3>
          <p>Find your favorite meals or restaurants near you.</p>
        </div>

        <div className="step-card">
          <div className="icon">🛒</div>
          <h3>Place Order</h3>
          <p>Select dishes, add to cart, and checkout securely.</p>
        </div>

        <div className="step-card">
          <div className="icon">🚴</div>
          <h3>Fast Delivery</h3>
          <p>Your food is delivered hot & fresh to your door.</p>
        </div>

        <div className="step-card">
          <div className="icon">😊</div>
          <h3>Enjoy</h3>
          <p>Relax and enjoy your delicious meal.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
