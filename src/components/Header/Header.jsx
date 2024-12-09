import React, { useState, useEffect } from "react";
import { CiAlarmOn } from "react-icons/ci";
import { FaFacebook, FaTwitter, FaYoutube, FaSkype } from "react-icons/fa";
import axios from "axios";

const Header = ({base}) => {
  const [headerInfo, setHeaderInfo] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState({
    facebook: "",
    twitter: "",
    youtube: "",
    skype: "",
  });

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base}/get-front-header-details`
        );
        const headerData = response.data.header;
       
        setHeaderInfo(headerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //to get Icon Link

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base}/get-front-topbar-details`
        );
        const topbarData = response.data.topbar[0];
        setData({
          facebook: topbarData.facebook,
          twitter: topbarData.twitter,
          yotube: topbarData.yotube,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!headerInfo.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex md:flex-row justify-between text-center mr-6 lg:ml-10 lg:mt-4 mb-4  items-center">
      {headerInfo.map((head, index) => (
        <React.Fragment key={index}>
          <img
            src={`${base}/assets/uploads/${head.left_logo}`}
            alt="Logo is loading"
            className=""
          />
          <div className="lg:text-center text-start">
            <p className="text-[#087830] font-bold text-4xl">
              {head.nirdeshnalaya}
            </p>
            <p className="text-[#82bb1e] font-bold text-3xl">
              {head.office_name}
            </p>
            <p className="text-[#087830] font-bold text-lg">
              {head.office_location}
            </p>
          </div>

          <div className="hidden md:flex flex-col text-[#82bb1e] lg:flex gap-2">
            <p className="uppercase text-xl">
              gpo box number: {head.gpo_box || "2081-06-14"}
            </p>
            <div className="flex items-center gap-2">
              <CiAlarmOn className="font-bold" size={25} />
              <p>
                {currentTime.toLocaleDateString()}{" "}
                {currentTime.toLocaleTimeString()}
              </p>
            </div>

            <div className="flex space-x-4">
              <a href={data.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-[#087830] cursor-pointer" />
              </a>
              <a href={data.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-[#087830] cursor-pointer" />
              </a>
              <a href={data.youtube} target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-2xl hover:text-[#087830] cursor-pointer" />
              </a>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Header;
