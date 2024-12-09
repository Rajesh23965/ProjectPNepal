import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Post = ({ base, categoryId }) => {
  const location = useLocation();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headerInfo, setHeaderInfo] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [categoryData, setCategoryData] = useState(null);

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

  useEffect(() => {
    const fetchPostData = async () => {
      if (postId) {
        try {
          const { data } = await axios.get(
            `${base}/get-front-post-details?id=${postId}`
          );
          setPostData(data.post);
          console.log(data.post)
        } catch (error) {
          console.error("Error fetching post data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPostData();
  }, [postId, base]);

  // Fetch Category Data
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (categoryId) {
        try {
          const response = await axios.get(
            `${base}/get-front-category-details?id=${categoryId}`
          );
          setCategoryData(response.data.category);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching category data:", error);
          setLoading(false);
        }
      }
    };

    fetchCategoryData();
  }, [categoryId, base]);

  const renderFilePreview = (file) => {
    const fileUrl = `${base}/assets/uploads/${file}`;
    if (/\.(jpg|jpeg|png)$/.test(file)) {
      return (
        <img
          src={fileUrl}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-lg shadow-md"
        />
      );
    } else if (/\.pdf$/.test(file)) {
      return <embed src={fileUrl} type="application/pdf" width="100px" height="100px" />;
    } else {
      return <p>File type not supported for preview</p>;
    }
  };

  const truncateText = (text = "", wordLimit = 20) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + " ..."
      : text;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex-col md:flex-row justify-between mr-8 lg:ml-8 lg:mt-0">
      {/* Top-Image in post section */}
      <section className="relative">
        <div className="relative overflow-hidden shadow-md">
          <motion.img
            src={`${base}/assets/uploads/${postData?.featured_image || 'default-image.jpg'}`}
            className="w-full h-[400px] md:h-[250px] object-cover"
            alt="Top Banner"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/0" />
          <motion.h2
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {postData?.post_title}
          </motion.h2>
        </div>
      </section>

      {/* Dynamically fetched post section */}
      <div className="container mx-auto px-4 py-12">
        {/* <h1 className="text-4xl font-bold text-center mb-8 underline underline-offset-12 decoration-red py-2">
          {postData?.post_title}
        </h1> */}
        <motion.div
          className="space-y-8 w-full relative flex items-center justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* flex space-x-10 shadow-xl rounded-lg hover:shadow-2xl cursor-pointer transform hover:border-2 border-[#a19e6f] duration-400 delay-100 transition hover:scale-110 bg-white */}
          <div className="p-6 ">
            {/* <div className="">
              {postData.downloadable_file
                ? renderFilePreview(postData.downloadable_file)
                : headerInfo.map((head, index) => (
                    <img
                      key={index}
                      src={`${base}/assets/uploads/${head.left_logo}`}
                      alt="Logo"
                      className="w-32 h-32 object-contain rounded-lg"
                    />
                  ))}
            </div> */}

            <div className="">
              <h3 className="text-2xl font-semibold">
                <Link to="#">{postData?.post_title}</Link>
              </h3>
              <p className="text-gray-500 text-sm mb-2">{currentTime.toLocaleDateString()}</p>
              <div
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:(postData?.content_section),
                }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Post;
