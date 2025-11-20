import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Connect from "./connect.tsx";
interface navbarProps {
  color: string;
}

const Navbar = ({ color }: navbarProps) => {
  const [isconnect, setIsconnect] = useState(false);
  const openConnect = () => {
    setIsconnect(true);
  };

  // ✅ Fixed: Function to close the modal
  const closeConnect = () => {
    setIsconnect(false);
  };
  useEffect(() => {
    if (isconnect) {
      document.documentElement.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
    }

    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, [isconnect]);
  return (
    <>
      {isconnect && (
        <div>
          {" "}
          <Connect onClose={closeConnect} />
        </div>
      )}

      <div className="w-300 h-25 absolute top-16 justify-self-center flex items-center m-6 flex rounded-full bg-black justify-around p-5,5 backdrop-blur-md cursor-none fixed ">
        <motion.button
          data-cursor="scale"
          className="w-50 h-20 text-4xl font-bold cursor-none rounded-4xl overflow-hidden "
          style={{ color: color }}
          whileHover={{
            backgroundColor: color,
            color: "hsla(0, 100%, 0%, 1.00)",
          }}
          animate={{
            backgroundColor: "hsla(0, 0%, 0%, 1.00)",
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            ease: "easeInOut",
          }}
        >
          {" "}
          Me
        </motion.button>
        <motion.button
          data-cursor="scale"
          className="w-50 h-20 text-4xl font-bold cursor-none rounded-4xl "
          style={{ color: color }}
          whileHover={{
            backgroundColor: color,
            color: "hsla(0, 100%, 0%, 1.00)",
          }}
          animate={{
            backgroundColor: "hsla(0, 0%, 0%, 1.00)",
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            ease: "easeInOut",
          }}
        >
          {" "}
          Skills
        </motion.button>
        <motion.button
          data-cursor="scale"
          className="w-50 h-20 text-4xl font-bold cursor-none rounded-4xl overflow-hidden "
          style={{ color: color }}
          whileHover={{
            backgroundColor: color,
            color: "hsla(0, 100%, 0%, 1.00)",
          }}
          animate={{
            backgroundColor: "hsla(0, 0%, 0%, 1.00)",
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            ease: "easeInOut",
          }}
        >
          {" "}
          Experience
        </motion.button>
        <motion.button
          data-cursor="scale"
          className="w-50 h-20 text-4xl font-bold cursor-none rounded-4xl overflow-hidden "
          style={{ color: color }}
          whileHover={{
            backgroundColor: color,
            color: "hsla(0, 100%, 0%, 1.00)",
          }}
          animate={{
            backgroundColor: "hsla(0, 0%, 0%, 1.00)",
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            ease: "easeInOut",
          }}
        >
          {" "}
          Journey
        </motion.button>
        <motion.button
          data-cursor="scale"
          className="w-50 h-20 text-4xl font-bold cursor-none rounded-4xl overflow-hidden "
          style={{ color: color }}
          whileHover={{
            backgroundColor: color,
            color: "hsla(0, 100%, 0%, 1.00)",
          }}
          animate={{
            backgroundColor: "hsla(0, 0%, 0%, 1.00)",
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            ease: "easeInOut",
          }}
          onClick={openConnect}
        >
          Connect
        </motion.button>
      </div>
    </>
  );
};

export default Navbar;
