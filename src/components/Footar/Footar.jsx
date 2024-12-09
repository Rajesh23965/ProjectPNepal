import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ base }) => {
  const [footerData, setFooterData] = useState([]);
  const [data, setData] = useState({
    facebook: "",
    twitter: "",
    youtube: "",
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(`${base}/get-front-footer-details`);
        const data = response.data.footerlist;
        setFooterData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, [base]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base}/get-front-topbar-details`);
        const topbarData = response.data.topbar[0];
        setData({
          facebook: topbarData.facebook,
          twitter: topbarData.twitter,
          youtube: topbarData.youtube,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [base]);

  return (
    <footer className="bg-gradient-to-r from-[#0a2e4f] via-[#18558f] to-[#0a2e4f] text-white py-10 lg:py-16 px-6 lg:px-12">
  {footerData.length > 0 && (
    <div className="flex flex-col lg:flex-row gap-8 justify-between">
      {/* Left Section: Contact Us & Follow Us */}
      <div className="space-y-6">
        {footerData
          .filter((foot) => foot.footer_id === "9")
          .map((foot, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-4 underline underline-offset-8 decoration-[#087830]">
                {foot.footer_title}
              </h2>
              <div
                className="text-sm text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: foot.footer_description,
                }}
              />
            </div>
          ))}
        <div>
          <h2 className="text-2xl font-semibold mb-4 underline underline-offset-8 decoration-[#087830]">
            Follow Us
          </h2>
          <div className="flex space-x-6">
            <Link
              to={data.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="text-3xl hover:text-[#1DA1F2] transition transform hover:scale-110" />
            </Link>
            <Link
              to={data.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="text-3xl hover:text-[#1877F2] transition transform hover:scale-110" />
            </Link>
            <Link
              to={data.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className="text-3xl hover:text-[#FF0000] transition transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>

      {/* Middle Section: Important Links */}
      <div className="space-y-6">
        {footerData
          .filter((foot) => foot.footer_id === "10")
          .map((foot, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-4 underline underline-offset-8 decoration-[#087830]">
                {foot.footer_title}
              </h2>
              <div
                className="text-sm text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: foot.footer_description,
                }}
              />
            </div>
          ))}
      </div>

      {/* Right Section: Calendar & Map */}
      <div className="space-y-6">
        {footerData
          .filter((foot) => foot.footer_id === "11")
          .map((foot, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-4 underline underline-offset-8 decoration-[#087830]">
                {foot.footer_title}
              </h2>
              <div
                className="text-sm text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: foot.footer_description,
                }}
              />
            </div>
          ))}
      </div>
      <div className="space-y-6">
        {footerData
          .filter((foot) => foot.footer_id === "14")
          .map((foot, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-4 underline underline-offset-8 decoration-[#087830]">
                {foot.footer_title}
              </h2>
              <div
                className="text-sm text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: foot.footer_description,
                }}
              />
            </div>
          ))}
      </div>
     
    </div>
  )}

  {/* Footer Bottom */}
  <div className="mt-10 border-t border-green-600 pt-4 text-center">
    <p className="text-sm md:text-base">
      © 2024 परिवर्तन नेपाल | Created by{" "}
      <Link
        to="https://www.ithome.com.np/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-[#a19e6f] transition-all"
      >
        IT HOME NEPAL PVT.LTD.
      </Link>
    </p>
  </div>
</footer>

  );
};

export default Footer;
