import React from "react";
import "./spinner.scss";

const Spinner = () => {
  return (
    <>
      <div className="loading-container">
        <div id="loading"></div>
      </div>

      {/* <div className="success-container">
        <div class="success-checkmark">
          <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>
        <h3 className="success-h3 fade-in">
          Data <span>berhasil</span> ditambahkan
        </h3>
      </div> */}
    </>
  );
};

export default Spinner;
