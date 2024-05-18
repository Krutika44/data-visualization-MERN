import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-teal-500 bg-opacity-40 p-4 fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center">
            <a href="#" className="text-black font-bold text-xl font-serif">
              BlackCoffer
            </a>
          </div>
          <div className="hidden md:flex">
            <a href="#" className="text-black mr-4">
              Home
            </a>
            <a href="#" className="text-black mr-4">
              About
            </a>
            <a href="#" className="text-black mr-4">
              Services
            </a>
            <a href="#" className="text-black mr-4">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
