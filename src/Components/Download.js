import React from "react";

const Download = () => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-toggle="dropdown"
      >
        Export Data&nbsp;&nbsp;
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <a href="https://randomuser.me/api/?format=csv">Download CSV</a>
        </li>
        <li>
          <a href="https://randomuser.me/api/?format=xml">Download XML</a>
        </li>
      </ul>
    </div>
  );
};

export default Download;
