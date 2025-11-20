import React from "react";
import { motion } from "framer-motion";
interface NavbarProps {
  color: string;
}
const Forget = ({ color }: NavbarProps) => {
  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="flex relative items-center w-1000 h-20 justify-center bottom-45"
      style={{ backgroundColor: color }}
    >
      <motion.p className="sgroll w-250 h-20 flex relative items-center justify-center justify-self-center h-10 text-4xl text-black font-semibold tracking-widest overflow-hidden">
        Press Connect for any query 🚀🚀🚀
      </motion.p>
    </motion.div>
  );
};

export default Forget;
