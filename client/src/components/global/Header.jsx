import React, { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { motion } from 'framer-motion';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const root = window.document.documentElement; //add 'dark class to html root element'
    root.classList.toggle('dark');
  };
  return (
    <header className="sticky top-0 z-40 dark:bg-white bg-[#1d2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
      {/* left */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {
          <>
            {darkMode ? (
              <img
                src="/linkedin.png"
                className="w-[45px] h-[45px]"
                alt="logo"
              />
            ) : (
              <img
                src="/linkedin-white.png"
                className="w-[45px] h-[45px]"
                alt="logo"
              />
            )}
          </>
        }
        <div className="flex  items-center space-x-1  dark:md:bg-gray-700 py-2.5 px-4 w-full rounded">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search ..."
            className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"
          />
        </div>
      </div>

      {/* right */}
      <div className="flex items-center space-x-6">
        {/* Dark Mode Toggle */}
        {
          <div
            // flex-shrink-0 --> prevent from hidden
            className={`${darkMode ? 'justify-end' : 'justify-start'} 
           bg-gray-600 flex items-center rounded-full px-0.5 h-6 w-12 cursor-pointer flex-shrink-0 relative`}
            onClick={() => toggleTheme()}
          >
            <span className="absolute left-0">🌜</span>

            {/* framer-motion */}
            {/* layout: boolean | "position" | "size". If true, this component
             will automatically animate to its new position when its layout changes. */}
            <motion.div
              className="w-5 h-5 bg-white rounded-full z-40"
              layout
              transition={spring}
            />
            <span className="absolute right-0.5">🌞</span>
          </div>
        }
      </div>
    </header>
  );
};

export default Header;

// Stiffness of the spring. Higher values will create more sudden movement. Set to 100 by default.
// Damping Strength of opposing force. If set to 0, spring will oscillate indefinitely. Set to 10 by default.
const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};
