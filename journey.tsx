import React from "react";
import "./but.css";
import { motion } from "framer-motion";
interface navbarProps {
  color: string;
}
const Journey = ({ color }: navbarProps) => {
  return (
    <motion.div
      className="w-420 h-auto flex justify-self-center items-center bg-transparent relative "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
      transition={{ duration: 2, ease: "backInOut" }}
      viewport={{ once: true }}
    >
      <section className="h-200 w-400 tracking-widest font-semibold bg-transparent text-white flex relative items-center text-center text-5xl/15 border-box ">
        <p className="relative left-10">
          I am a management student with{" "}
          <span className="text-gray-500">
            great coding skills and intrigued personality
          </span>{" "}
          with interests on{" "}
          <span
            data-cursor="scale"
            className="font-bold text-6xl/18"
            style={{ color: color }}
          >
            coding, technology, building, interacting, and always prioritize
            learning.
          </span>{" "}
          Here's how I started
        </p>
      </section>
    </motion.div>
  );
};

export default Journey;
