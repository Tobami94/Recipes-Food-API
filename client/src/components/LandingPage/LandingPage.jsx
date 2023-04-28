import React from "react";
import { Link } from "react-router-dom";
import StyleLand from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={StyleLand.landing}>
      <div className={StyleLand.containerback}>
        <h1 className={StyleLand.infoMsg}>
          Are you ready to know the<br></br> best user recipes and for users?
        </h1>
        <hr></hr>
        <p>
          This application was developed by Malena Paraschuk<br></br> in order
          to present her full stack web development skills. <br></br>That
          included:
          <br></br>Searches, combined filters, requests to external
          applications, <br></br>creation of posts, databases relational data.
        </p>
        <Link to="/home" id="click">
          <button className={StyleLand.hbtn}>READ MORE</button>
        </Link>
      </div>
    </div>
  );
}
