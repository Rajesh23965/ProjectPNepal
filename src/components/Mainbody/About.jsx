import React, { useEffect, useState } from "react";
import Image2 from "../../assets/1732258013414.jpg";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const About = ({ base, categoryId }) => {
  const [showMore, setShowMore] = useState(false);
  const [intro, setIntro] = useState([]);
  const location = useLocation();
  const [postDataByCat, setPostDataByCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerInfo, setHeaderInfo] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const getQueryParam = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  const postId = getQueryParam("id");

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const { data } = await axios.get(`${base}/get-front-header-details`);
        setHeaderInfo(data.header || []);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, [base]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch posts by category ID
  useEffect(() => {
    const fetchPostDataCat = async () => {
      try {
        const { data } = await axios.get(
          `${base}/get-front-postlist-by-category-id-details?catId=26`
        );
        setPostDataByCat(data.postlist || []);
      } catch (error) {
        console.error("Error fetching posts by category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDataCat();
  }, [base]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await axios.get(
          `${base}/get-front-introduction-details`
        );
        const introData = response.data.intro;
        setIntro(introData);
      } catch (error) {
        console.error("Error fetching introduction data:", error);
      }
    };

    fetchIntro();
  }, [base]);

  const toggleViewMore = () => {
    setShowMore(!showMore);
  };

  const truncateText = (text, length = 100) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="ma sm:w-full px-4 md:px-8 flex-col md:flex-row mt-10">
      {/* Introduction Section */}
      <div className="lg:flex items-center gap-8 mb-16 animate-fadeInUp">
  {/* Image Section */}
  {/* <div className="lg:w-1/2 animate__animated animate__fadeInLeft">
    <img
      src={Image2}
      alt="Nepal"
      className="w-full max-w-xs lg:max-w-md mx-auto object-cover rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:rotate-2 duration-500"
    />
  </div> */}

  {/* Content Section */}
  <div className=" mt-6 lg:mt-0 animate__animated animate__fadeInRight text-left space-y-4">
    {/* Title */}
    {intro.length > 0 && (
      <p className="text-green-700 text-4xl font-extrabold mb-4 border-l-4 border-green-700 pl-4">
        &#8213; {intro[0].title}
      </p>
    )}

    {/* Description */}
    {intro.length > 0 && (
      <div
        className="text-gray-700 text-lg leading-relaxed text-justify"
        dangerouslySetInnerHTML={{ __html: intro[0].description }}
      />
    )}

    {/* Button */}
    <button onClick={toggleViewMore} className="mt-6">
      {intro.length > 0 && (
        <Link
          to={`page?id=${intro[0].selectedPage}`}
          className="relative inline-flex items-center px-10 py-3 overflow-hidden text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-800 rounded-full shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-in-out bg-gradient-to-r from-green-800 to-green-600 opacity-0 group-hover:opacity-100"></span>
          <span className="absolute right-0 flex items-center justify-center w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="relative z-10">
            {showMore ? "View Less" : "View More"}
          </span>
        </Link>
      )}
    </button>
  </div>
</div>


      {/* Mission & Vision Section */}
      <div className="bg-[#4e7a02] rounded-xl text-center shadow-lg py-10 px-5 lg:px-16 text-white mb-16">
        <div className="lg:flex justify-between gap-8">
          <div className="lg:w-1/2 mb-6 lg:mb-0 text-left">
            <h2 className="text-3xl font-bold mb-3">Our Mission</h2>
            <p className="leading-relaxed">
              To create opportunities for sustainable development by addressing
              core issues like education, health, agriculture, and women
              empowerment. We aim to uplift rural communities through engagement
              with national and international stakeholders.
            </p>
          </div>
          <div className="lg:w-1/2 text-left">
            <h2 className="text-3xl font-bold mb-3">Our Vision</h2>
            <p className="leading-relaxed">
              Our vision is to develop a peaceful, progressive society by
              connecting individuals, communities, and organizations to
              contribute to Nepal’s growth and development, ensuring that no one
              is left behind.
            </p>
          </div>
        </div>
      </div>

      {/* Members Section */}
      {postDataByCat.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postDataByCat.map((p) => (
            <div
              key={p.post_id}
              className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              <img
                src={`${base}/assets/uploads/${p.featured_image}`}
                className="w-full h-64 object-cover"
                alt={p.post_title}
              />
              <div className="p-6 text-center">
                <h5 className="text-2xl font-bold mb-3">{p.post_title}</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncateText(p.content_section),
                  }}
                ></div>
               <Link
                  to={`/post?id=${p.post_id}`} 
                  className="inline-block py-2 px-6 mt-4 bg-[#087830] text-white rounded-full hover:bg-green-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
