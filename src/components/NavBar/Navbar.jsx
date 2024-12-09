import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronRight, FaChevronLeft, FaHome, FaAngleDown } from "react-icons/fa";
import axios from "axios";

const Navbar = ({ base }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [subMenuOpen, setSubMenuOpen] = useState(null);
  const navigate = useNavigate();

  // Fetch menu data from API
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(`${base}/get-front-menu-details`);
        setMenuData(response.data.menu);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchMenuData();
  }, [base]);

  // Toggle main navigation
  const toggleNav = () => {
    setNavOpen(!navOpen);
    setSubMenuOpen(null); // Close any open submenus
  };

  // Handle navigation logic
  const handleNavigation = (menu) => {
    if (menu.url_menu === "#") {
      navigate("/");
    } else if (menu.content_type === "1") {
      navigate(`/page?id=${menu.content_id}`);
    } else if (menu.content_type === "2") {
      navigate(`/post?id=${menu.content_id}`);
    } else if (menu.content_type === "3") {
      navigate(`/category?id=${menu.content_id}`);
    } else {
      navigate(`/${menu.url_menu}`);
    }
    toggleNav(); 
  };

  // Toggle submenu visibility
  const handleSubMenuToggle = (menuId) => {
    setSubMenuOpen(subMenuOpen === menuId ? null : menuId);
  };

  return (
    <header className="bg-[#0e76bd] font-bold text-white sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center px-4 py-6 lg:px-8">
       

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleNav}
        >
          {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-10 text-lg">
          {menuData
            .filter((menu) => menu.parent_id === "0")
            .map((menu) => (
              <div key={menu.id_menu} className="relative group">
                <button
                  onClick={() =>
                    menu.has_child === "1"
                      ? handleSubMenuToggle(menu.id_menu)
                      : handleNavigation(menu)
                  }
                  className="flex items-center hover:text-green-400"
                >
                  {menu.label_menu === "Home" && <FaHome className="mr-2" />}
                  {menu.label_menu}
                  {menu.has_child === "1" && (
                    <FaAngleDown className="ml-1" size={16} />
                  )}
                </button>

                {/* Dropdown for Desktop */}
                {menu.has_child === "1" && subMenuOpen === menu.id_menu && (
                  <div className="absolute left-0 top-full mt-2 bg-white text-black rounded shadow-lg z-10">
                    <ul className="p-2">
                      {menuData
                        .filter((submenu) => submenu.parent_id === menu.id_menu)
                        .map((submenu) => (
                          <li key={submenu.id_menu} className="hover:bg-gray-100 p-2">
                            <button
                              onClick={() => handleNavigation(submenu)}
                              className="w-full text-left"
                            >
                              {submenu.label_menu}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="bg-[#0e76bd] md:hidden">
          <ul className="space-y-4 text-center py-4">
            {menuData
              .filter((menu) => menu.parent_id === "0")
              .map((menu) => (
                <li key={menu.id_menu} className="text-white">
                  <button
                    className="block w-full text-left px-4"
                    onClick={() =>
                      menu.has_child === "1"
                        ? handleSubMenuToggle(menu.id_menu)
                        : handleNavigation(menu)
                    }
                  >
                    {menu.label_menu}
                    {menu.has_child === "1" && (
                      <FaChevronRight className="ml-2 inline" />
                    )}
                  </button>
                  {/* Submenu for Mobile */}
                  {menu.has_child === "1" && subMenuOpen === menu.id_menu && (
                    <ul className="bg-white text-black px-6 py-2">
                      {menuData
                        .filter((submenu) => submenu.parent_id === menu.id_menu)
                        .map((submenu) => (
                          <li
                            key={submenu.id_menu}
                            className="hover:bg-gray-200 p-2"
                          >
                            <button
                              className="w-full text-left"
                              onClick={() => handleNavigation(submenu)}
                            >
                              {submenu.label_menu}
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;



// import React, { useEffect, useState } from "react";
// import { FaBars, FaTimes, FaHome, FaAngleDown } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import SubMenue from "./SubMenue";

// const Navbar = ({ base }) => {
//   const [navOpen, setNavOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("home");
//   const [menuData, setMenuData] = useState([]);
//   const [subMenueOpen, setSubMenueOpen] = useState(null);

//   // Fetch menu data from the API
//   useEffect(() => {
//     const fetchMenudata = async () => {
//       try {
//         const response = await axios.get(`${base}/get-front-menu-details`);
//         setMenuData(response.data.menu);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchMenudata();
//   }, [base]);

//   const handleNavToggle = () => setNavOpen(!navOpen);
//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     setNavOpen(false);
//   };

//   const handleSubMenueToggle = (menuId) => {
//     setSubMenueOpen(subMenueOpen === menuId ? null : menuId);
//   };

//   // Helper function to get child menus by parent ID
//   const getSubMenu = (parentId) => {
//     return menuData.filter((menu) => menu.parent_id === parentId);
//   };

//   return (
//     <nav className="bg-[#18558f] p-4 lg:p-6 flex-col md:flex-row justify-between sticky top-0 z-50 lg:ml-8 lg:mr-8">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-8 text-white uppercase font-bold text-center">
//           {menuData.length > 0 &&
//             menuData
//               .filter((menu) => menu.parent_id === "0")
//               .map((menu) => (
//                 <li
//                   key={menu.id_menu}
//                   onMouseEnter={() => handleSubMenueToggle(menu.id_menu)}
//                   onMouseLeave={() => handleSubMenueToggle(null)}
//                   className={`relative cursor-pointer ${
//                     activeTab === menu.label_menu
//                       ? "border-b-4 border-blue-500"
//                       : "border-b-4 border-transparent hover:border-gray-400"
//                   }`}
//                 >
//                   <Link
//                     to={
//                       menu.url_menu === "#"
//                         ? "/"
//                         : `/${
//                             menu.content_type == 1
//                               ? `page?id=${menu.content_id}`
//                               : menu.content_type == 2
//                               ? `post?id=${menu.content_id}`
//                               : menu.content_type == 3
//                               ? `category?id=${menu.content_id}`
//                               : menu.content_type == 4
//                               ? `get-employee-list=${menu.content_id}`
//                               : menu.content_type == 4
//                               ? `/${menu.url_menu}`
//                               : ""
//                           }`
//                     }get-employee-list
//                     onClick={() => handleTabClick(menu.label_menu)}
//                     className="flex items-center"
//                   >
//                     {menu.label_menu === "Home" && <FaHome className="mr-2" />}
//                     {menu.label_menu}
//                     {menu.has_child === "1" && <FaAngleDown className="ml-1" size={16} />}
//                   </Link>

//                   {/* Render Submenu if the menu has children */}
//                   {menu.has_child === "1" && (
//                     <SubMenue
//                       isOpen={subMenueOpen === menu.id_menu}
//                       links={getSubMenu(menu.id_menu).map((subMenu) => ({
//                         label_menu: subMenu.label_menu,
//                         url_menu: subMenu.url_menu,
//                         content_type: subMenu.content_type,
//                         content_id: subMenu.content_id,
//                       }))}
//                       handleTabClick={handleTabClick}
//                     />
//                   )}
//                 </li>
//               ))}
//         </ul>

//         {/* Mobile menu toggle */}
//         <div className="md:hidden text-white cursor-pointer" onClick={handleNavToggle}>
//           {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//         </div>
//       </div>

//       {/* Mobile menu content */}
//       {navOpen && (
//         <ul className="md:hidden  text-white space-y-4 p-4 uppercase font-bold">
//           {menuData.length > 0 &&
//             menuData
//               .filter((menu) => menu.parent_id === "0")
//               .map((menu) => (
//                 <li
//                   key={menu.id_menu}
//                   onClick={() => handleTabClick(menu.label_menu)}
//                   className={`cursor-pointer ${
//                     activeTab === menu.label_menu
//                       ? "border-b-4 border-blue-500"
//                       : "border-b-4 border-transparent hover:border-gray-400"
//                   }`}
//                 >
//                   <Link
//                     to={
//                       menu.url_menu === "#"
//                         ? "/"
//                         : `/${
//                             menu.content_type == 1
//                               ? `page?id=${menu.content_id}`
//                               : menu.content_type == 2
//                               ? `post?id=${menu.content_id}`
//                               : menu.content_type == 3
//                               ? `category?id=${menu.content_id}`
//                               : menu.content_type == 4
//                               ? `/${menu.url_menu}`
//                               : ""
//                           }`
//                     }
//                     className="flex items-center"
//                   >
//                     {menu.label_menu === "Home" && <FaHome className="mr-2" />}
//                     {menu.label_menu}
//                     {menu.has_child === "1" && <FaAngleDown className="ml-1" size={16} />}
//                   </Link>

//                   {/* Mobile Submenu */}
//                   {menu.has_child === "1" && (
//                     <SubMenue
//                       isOpen={subMenueOpen === menu.id_menu}
//                       links={getSubMenu(menu.id_menu).map((subMenu) => ({
//                         label_menu: subMenu.label_menu,
//                         url_menu: subMenu.url_menu,
//                         content_type: subMenu.content_type,
//                         content_id: subMenu.content_id,
//                       }))}
//                       handleTabClick={handleTabClick}
//                     />
//                   )}
//                 </li>
//               ))}
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
