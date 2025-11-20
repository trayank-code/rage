import React from "react";
import { motion } from "framer-motion";
interface NavbarProps {
  color: string;
}
const Images = ({ color }: NavbarProps) => {
  return (
    <>
      <div className="w-400 h-400 bg-transparent justify-self-center flex-row p-5 rounded-4xl relative top-100 left-20">
        <section className="w-350 h-300 p-15">
          <p
            data-cursor="scale"
            className="text-white text-center text-7xl font-bold p-6"
            style={{ color: color }}
          >
            Create, Design, Build
          </p>
          <p className="text-white text-center text-5xl font-semibold tracking-widest p-3">
            Welcome to this amzing website where you can imteract with different
            amazing features incarnated in this site and also get to know the
            creator of this page at the same time.
          </p>
          <p className="text-gray-600 text-center text-5xl tracking-widest font-bold p-10">
            Get Along !!!!
          </p>

          <section className="flex justify-around bg-black rounded-4xl relative top-13 cursor-none">
            <motion.button
              data-cursor="scale"
              className=" text-black rounded-full w-50 h-25 font-bold text-4xl p-2 m-2 cursor-none"
              style={{ backgroundColor: color }}
            >
              Get Started
            </motion.button>
            <motion.button
              data-cursor="scale"
              className=" text-black rounded-full w-50 h-25 font-bold text-4xl p-2 m-2 cursor-none"
              style={{ backgroundColor: color }}
            >
              Learn More
            </motion.button>
          </section>
        </section>
      </div>
    </>
  );
};

export default Images;
