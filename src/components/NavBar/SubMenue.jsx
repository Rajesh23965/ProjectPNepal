import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown,FaChevronRight } from "react-icons/fa";

const SubMenue = ({ isOpen, links, handleTabClick, getSubMenu }) => {
  const [subChildMenuOpen, setSubChildMenuOpen] = useState(null);

  const generateLink = (link) => {
    return link.url_menu === "#"
      ? "/"
      : `/${
          link.content_type == 1
            ? `page?id=${link.content_id}`
            : link.content_type == 2
            ? `post?id=${link.content_id}`
            : link.content_type == 3
            ? `category?id=${link.content_id}`
            : link.content_type == 4
            ? `/${link.url_menu}`
            : ""
        }`;
  };

  const handleSubChildToggle = (childId) => {
    setSubChildMenuOpen(subChildMenuOpen === childId ? null : childId);
  };

  return (
    isOpen && links.length > 0 && (
      <ul className="absolute left-0  xs:h-[200px] sm:h-[200px] lg:h-auto  overflow-auto w-full md:w-60 lg:w-60 bg-white text-gray-800 space-y-2 p-2 rounded-md shadow-lg z-50 border border-gray-200">
        {links.map((link) => (
          <li key={link.label_menu} className="relative border-b-2 ">
            <div
              className="px-4 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer flex justify-between items-center"
              onClick={() => handleTabClick(link.label_menu)}
            >
              <Link to={generateLink(link)} className="hover:text-blue-500 ">
                {link.label_menu}
              </Link>
              {link.has_child === "1" && (
                <FaChevronRight
                  className="ml-2  overflow-auto  transform hover:rotate-90 text-gray-400 hover:text-blue-500 transition duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubChildToggle(link.label_menu);
                  }}
                />
              )}
            </div>

            {/* Right-positioned SubMenu */}
            {link.has_child === "1" && subChildMenuOpen === link.label_menu && (
              <ul className="absolute top-10 h-40 overflow-y-auto w-full bg-white text-gray-800 space-y-2 p-2 rounded-md shadow-lg z-50 border border-gray-200">
                {getSubMenu(link.id_menu).map((subLink) => (
                  <li key={subLink.label_menu} className="relative border-b-2 w-full">
                    <div
                      className="px-4 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                      onClick={() => handleTabClick(subLink.label_menu)}
                    >
                      <Link to={generateLink(subLink)} className="hover:text-blue-500">
                        {subLink.label_menu}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    )
  );
};

export default SubMenue;