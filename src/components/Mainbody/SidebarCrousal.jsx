import React from "react";
import Sidepost from "../SidePost/Sidepost";
import Carousel from "./Crousal";

const SidebarCrousal = ({ base }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Carousel */}
      <div className="w-full lg:5/6  ">
        <Carousel base={base} />
      </div>

      {/* Sidepost */}
      <div className="w-full lg:w-1/6">
        <Sidepost base={base} />
      </div>
    </div>
  );
};

export default SidebarCrousal;
