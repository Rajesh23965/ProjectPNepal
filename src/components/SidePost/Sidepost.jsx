import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidepost = ({ base }) => {
  const [rules, setRules] = useState([]);
  const [career, setCareer] = useState([]);
  const [member, setMember] = useState([]);
  const [loading, setLoading] = useState(true);

  // Truncate Text Function
  const truncateText = (text, length = 100) => {
    if (!text) return "";
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  // Fetch Data
  useEffect(() => {
    const fetchData = async (catId, setData) => {
      try {
        const { data } = await axios.get(
          `${base}/get-front-postlist-by-category-id-details?catId=${catId}`
        );
        setData(data.postlist || []);
      } catch (error) {
        console.error(`Error fetching posts for category ${catId}:`, error);
      }
    };

    // Fetch all categories concurrently
    Promise.all([
      fetchData(27, setRules),
      fetchData(28, setCareer),
      fetchData(29, setMember),
    ]).finally(() => setLoading(false));
  }, [base]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  // Combine all data
  const allData = [...rules, ...career, ...member];

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Explore Categories
      </h2>

      <div className="flex overflow-x-auto gap-x-4 whitespace-nowrap">
        {allData.map((item, index) => (
          <div
            key={`item-${item.post_id || index}`}
            className="flex-shrink-0 w-64 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={`${base}/assets/uploads/${item.featured_image}`}
              alt={item.post_title || "Item Image"}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h5 className="text-lg font-bold text-teal-600 mb-2">
                {item.post_title}
              </h5>
              <p className="text-gray-600 mb-4">
                <span
                  dangerouslySetInnerHTML={{
                    __html: truncateText(item.content_section),
                  }}
                ></span>
              </p>
              <Link
                to={`/post?id=${item.post_id}`}
                className="inline-block py-2 px-4 font-bold text-teal-500 border-2 border-teal-500 rounded-full hover:bg-teal-500 hover:text-white transition duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sidepost;
