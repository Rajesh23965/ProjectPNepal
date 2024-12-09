import React from 'react';
import { motion } from "framer-motion";
import Contactuspage from "../../assets/contactuspage.jpg";
const ContactUs = () => {
  return (

    <div className="flex-col md:flex-row justify-between mr-6 lg:ml-10 lg:mt-0">

    {/* Top Banner Section */}
    <section className="relative " >
        <div className="relative overflow-hidden  shadow-md">
          <motion.img
            src={Contactuspage}
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
            Contact Us
          </motion.h2>
        </div>
      </section>

   
    <div className="bg-gray-100 py-12">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
     
        <h2 className="text-center text-3xl font-extrabold text-[#2c3e50] mb-8 underline underline-offset-12 decoration-red py-2">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Location & Contact</h3>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> New Baneshwor, Kathmandu, Nepal
            </p>
            <p className="text-gray-600 mb-2">
              <strong>GPO Box:</strong> 000000
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Our Hours:</strong>
              <br />
              10:00 AM – 17.00 PM <br />
              Sunday – Friday
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Phone:</strong> +9779800000000
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> <a href="ithomektm4@gmail.com" className="text-[#087830]">ithomektm4@gmail.com</a>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Mobile:</strong> 980000000000
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 shadow-lg rounded-lg md:col-span-1 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Get In Touch</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#087830] focus:border-[#087830]" 
                  placeholder="Enter your name" 
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#087830] focus:border-[#087830]" 
                  placeholder="Enter your email" 
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#087830] focus:border-[#087830]" 
                  placeholder="Type your message" 
                  required
                ></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full px-4 py-2  text-white font-semibold rounded-md shadow-sm bg-[#087830] hover:bg-[#087830] focus:outline-none focus:ring-2 focus:ring-[#087830] focus:ring-offset-2">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="lg:w-[25rem] bg-white p-8 shadow-lg rounded-lg md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Our Location</h3>
            <div className="w-[22rem] h-80">
            
              <iframe 
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.251223202501!2d85.92261359999999!3d26.7494743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec6b1f040b10f1%3A0xb6110c7dbffa850d!2sIT%20HOME%20PVT.%20LTD!5e1!3m2!1sen!2snp!4v1727606569717!5m2!1sen!2snp"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
