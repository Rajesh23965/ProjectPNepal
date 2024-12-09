import Header from "./components/Header/Header";
import TopBar from "./components/TopBar/TopBar";
import Navbar from "./components/NavBar/Navbar";
import Carousel from "./components/Mainbody/Crousal";
import About from "./components/Mainbody/About";
import Member from "./components/Mainbody/Member";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUs from "./components/ContactPage/Contact";
import Gallery from "./components/GalleryPage/Gallery";
import WhatWeDo from "./components/WhatWeDO/WhatWeDo";
import Post from "./components/Post";
import Page from "./components/Page";
import Category from "./components/Category";
import Footer from "./components/Footar/Footar";
import { useState } from "react";
import SidebarCrousal from "./components/Mainbody/SidebarCrousal";
import Sidepost from "./components/SidePost/Sidepost";
import Directors from "./components/Directors/Directors";

const lightModeColors = {
  primaryBg: "bg-[#087840]",
  primaryText: "text-[#087840]",
  secondaryText: "text-gray-500",
};

const darkModeColors = {
  primaryBg: "bg-red-600",
  primaryText: "text-white",
  secondaryText: "text-green-500",
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colorScheme = isDarkMode ? darkModeColors : lightModeColors;
  // const base = "https://app.pnepal.org.np/";
 const base="http://localhost:8080/"

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BrowserRouter>
      <div>
        <TopBar base={base}/>
        <Header base={base}/>
        <Navbar base={base}/>

        <Routes>
          <Route
            path="/"
            element={
              <>
              {/* <SidebarCrousal base={base}/> */}
              <Carousel base={base}/>
      
                <About base={base} />
                <Sidepost base={base}/>
              </>
            }
          />
        <Route path="/get-employee-list" element={<Member base={base} />} />
        <Route path="/contact" element={<ContactUs base={base} />} />
          <Route path="/gallery" element={<Gallery base={base} />} />
          <Route path="/what-we-do" element={<WhatWeDo base={base} />} />
          <Route path="/post" element={<Post base={base} />} />
          <Route path="/page" element={<Page base={base} />} />
          <Route path="/board-of-directors-staff" element={<Directors base={base} />} />
          {/* <Route path="/sidepost" element={<Sidepost/>}/> */}
        </Routes>

        <Footer base={base} />
      </div>
    </BrowserRouter>
  );
}

export default App;
