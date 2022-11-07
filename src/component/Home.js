/** @format */
import Container from "react-bootstrap/Container";
import React from "react";
import TableComponent from "../element/TableComponent";
import Layout from "./partials/Layout";
import { BsEnvelope } from "react-icons/bs";
import { FaRegSun, FaBell, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Home = () => {
  const IconStyle = {
    fontSize: 70,
    textAlign: "right",
  };
  return (
    <Layout>
      <h1>Welcome Matanmi!</h1>
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
            <p>Delivery Reports</p>
            <Link to="/report">View</Link>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 text-start">
          <div className="shadow rounded p-3">
            <div className="text-end">
              <FaRegSun style={IconStyle} className="text-muted" />
            </div>
            <p>Message Templates</p>
            <Link to="/templates">View</Link>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 text-start">
          <div className="shadow rounded p-3">
            <div className="text-end">
              <FaBell style={IconStyle} className="text-muted" />
            </div>
            <p>Notifications</p>
            <Link to="/notifications">View</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
