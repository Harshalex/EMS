import React from "react";
import { imagePath } from "../../../constants/imagePath";
import "./adminreports.css";

function SmallCard({ title, icon, subData, subDataNote, color }) {
  return (
    <div className="card-custom">
      <div className="card-top">
        <h6>{title}</h6>
        <img src={icon} alt="watch" />
      </div>
      <div>
        <h5 className="highlight-text" style={{ color: `${color}` }}>
          {subData}
        </h5>
        <p>{subDataNote}</p>
      </div>
    </div>
  );
}

export default SmallCard;
