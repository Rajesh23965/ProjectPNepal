import React from "react";
import { motion } from "framer-motion";
import Whatwedo from "../../assets/whatwedo.jpeg";
import Image2 from "../../assets/image2.jpeg";
import WomenNepal from '../../assets/women_nepal.jpg'
import Culture from '../../assets/culture.jpeg'
import EducationalProgram from '../../assets/EducationalProgram.jpeg'
import HealthProgram from '../../assets/healthProgram.jpeg'
import CommunityDevelopment from '../../assets/Community-Devlopment.jpeg'

const initiatives = [
  {
    title: "Community Development",
    description:
      "Empowering local communities through sustainable development activities aimed at improving the living standards of the poor and needy.",
    image: CommunityDevelopment,
    
  },
  {
    title: "Health Services",
    description:
      "Providing essential healthcare services to underprivileged populations, focusing on improving health outcomes in rural areas.",
      image: HealthProgram
  },
  {
    title: "Education Programs",
    description:
      "Ensuring access to quality education for children and adults in underserved areas to promote literacy and life skills.",
    image: EducationalProgram
  },
  {
    title: "Environmental Conservation",
    description:
      "Initiatives focused on protecting the environment, promoting sustainable agricultural practices, and raising awareness about climate change.",
    image: Image2
  },
  {
    title: "Women Empowerment",
    description:
      "Programs designed to empower women, providing them with skills, resources, and opportunities for leadership and self-sufficiency.",
    image: WomenNepal
  },
  {
    title: "Peace and Cultural Preservation",
    description:
      "Promoting peace and preserving the rich cultural heritage of Nepal through community-driven initiatives and international cooperation.",
    image: Culture,
  },
];

const WhatWeDo = () => {
  return (
    <>
      <div className="flex-col md:flex-row justify-between mr-6 lg:ml-10 lg:mt-0">
        {/* Top Banner Section */}
        <section className="relative ">
          <div className="relative overflow-hidden shadow-md">
            <motion.img
              src={Whatwedo}
              className="w-full h-[400px] md:h-[250px] object-cover"
              alt="Top Banner"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/0" />
            <motion.h2
              className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl md:-ml-[35rem] font-bold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              What We Do
            </motion.h2>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 underline  underline-offset-12 decoration-red py-2  border-gray">What We Do</h1>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={initiative.image}
                  alt={initiative.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                  <p className="text-gray-700">{initiative.description}</p>
                  <button className="bg-[#087830] text-lg text-white px-4 py-1 rounded-xl  ">View more</button>

                </div>
               <div className="">
               </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default WhatWeDo;
