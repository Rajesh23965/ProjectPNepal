import React, { useEffect, useState } from "react";
import axios from "axios";

const Directors = ({ base }) => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);

  const truncateText = (text, length = 300) => {
    if (!text) return "";
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

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

    Promise.all([fetchData(30, setDirectors)]).finally(() => setLoading(false));
  }, [base]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <section className="p-8 flex flex-col justify-around items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Board Of Directors / Staff
      </h1>

      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 text-left">S.N.</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Position</th>
              {/* <th className="px-4 py-2 text-left">Education</th> */}
              {/* <th className="px-4 py-2 text-left">Email</th> */}
            </tr>
          </thead>
          <tbody>
            {directors.map((item, index) => (
              <tr
                key={`item-${item.post_id || index}`}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={`${base}/assets/uploads/${item.featured_image}`}
                    alt={item.post_title || "Item Image"}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2 text-black">{item.post_title}</td>
                <td className="px-4 py-2 text-black">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: truncateText(item.content_section),
                    }}
                  ></span>
                </td>
                {/* <td className="px-4 py-2 text-gray-600">{item.education || "N/A"}</td> */}
                {/* <td className="px-4 py-2 text-gray-600">{item.email || "N/A"}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Directors;

{
  /* <img
              src={`${base}/assets/uploads/${item.featured_image}`}
              alt={item.post_title || "Item Image"}
              className="w-full h-54 object-cover"
            />
            <div className="p-6 text-center">
              <h5 className="text-xl font-bold text-teal-600 mb-2">
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
                className="inline-block py-2 px-6 font-bold text-teal-500 border-2 border-teal-500 rounded-full hover:bg-teal-500 hover:text-white transition duration-300"
              >
                Read More
              </Link>
            </div> */
}
