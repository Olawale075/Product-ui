/** @format */
import React from "react";
import { FaRegSun,FaInfoCircle, FaRegEnvelopeOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import Protected from "./partials/Protected";

export const Home = () => {
  const IconStyle = {
    fontSize: 70,
    textAlign: "right",
  };
  return (
    <Protected>
      <h1>Welcome olawale!</h1>
      <div class="alert alert-info alert-dismissible fade show" role="alert">
        <strong>Navigate</strong> through the platform with the sections below.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-4 text-start">
          <div className="shadow rounded p-3">
            <div className="text-end">
              <FaInfoCircle style={IconStyle} className="text-muted" />
            </div>
            <p>Product Reports</p>
            <Link to="/product">View</Link>
          </div>
          
        </div>
        
        <div className="col-sm-12 col-md-4 text-start">
          <div className="shadow rounded p-3">
            <div className="text-end">
            
              <FaRegEnvelopeOpen style={IconStyle} className="text-muted" />
            </div>
            <p>User View</p>
            <Link to="/allWear.com">View</Link>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 text-start">
          <div className="shadow rounded p-3">
            <div className="text-end">
            <FaRegSun style={IconStyle} className="text-muted" />
            </div>
            <p>ProductService</p>
            <Link to="product/service">View</Link>
          </div>
        </div>
      </div>
    </Protected>
  );
};
