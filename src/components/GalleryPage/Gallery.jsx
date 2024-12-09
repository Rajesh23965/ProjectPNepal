import { motion } from "framer-motion";
import NepaliChild from "../../assets/NepaliChild.jpeg";
import Image1 from "../../assets/image1.jpeg";
import Image2 from "../../assets/image2.jpeg";

const images = [
  { src: NepaliChild, title: "Empowerment Programs" },
  { src: Image1, title: "Community Initiatives" },
  { src: Image2, title: "Environmental Efforts" },
];

const Gallery = () => {
  return (
    <div className="flex-col md:flex-row justify-between mr-6 lg:ml-10 lg:mt-0">

   
    {/* Top Banner Section */}
    <section className="relative " >
        <div className="relative overflow-hidden  shadow-md">
          <motion.img
            src={NepaliChild}
            className="w-full h-[400px] md:h-[250px] object-cover"
            alt="Top Banner"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/0" />
          <motion.h2
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl  md:-ml-[35rem] font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Gallery
          </motion.h2>
        </div>
      </section>

      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gray-100 py-12"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 underline underline-offset-12 decoration-red py-2 ">
            Our Gallery
          </h2>

          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-lg md:text-xl font-semibold">
                    {image.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Gallery;



