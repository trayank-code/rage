import { useState } from "react";
import "./App.css";
import ScrollReveal from "./App.tsx";
import { motion } from "framer-motion";

interface NavbarProps {
  color: string;
  scale: number; // Add prop type
}

const Description = ({ color, scale }: NavbarProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = scale; // same as your transform: scale(0.5)
    setPosition({
      x: (e.clientX - rect.left) / scaleFactor,
      y: (e.clientY - rect.top) / scaleFactor,
    });
  };

  return (
    <>
      <div className="flex-row w-700 h-auto bg-transparent items-center justify-center relative justify-self-center">
        <div className="w-700 h-100 bg-transparent flex justify-around justify-self-center relative">
          <section
            className="w-400 h-100 bg-transparent font-bold justify-around flex justify-center items-center rounded-4xl relative"
            onMouseMove={handleMouseMove}
          >
            {/* Spotlight Effect (in place of DESCRIPTION text) */}
            <h1
              className="absolute top-10 text-[240px] font-bold select-none"
              style={{
                color: color,
                WebkitMaskImage: `radial-gradient(circle 150px at ${position.x}px ${position.y}px, white, transparent)`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "cover",
                maskImage: `radial-gradient(circle 150px at ${position.x}px ${position.y}px, white, transparent)`,
                maskRepeat: "no-repeat",
                maskSize: "cover",
              }}
            >
              DESCRIPTION
            </h1>
          </section>
        </div>
        <div className="w-350 h-250 bg-transparent relative flex items-center justify-center justify-self-center">
          {/* Rest of your section remains same */}

          <section className=" w-400 h-200 bg-transparent relative flex-row items-center justify-center ">
            <motion.div
              className=" border-box bg-transparent w-250 h-100 p-10 tracking-widest font-semibold text-center text-white flex items-center text-5xl/15 rounded-4xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
              transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
              viewport={{ once: true }}
            >
              <p>
                {" "}
                Dive in to skills{" "}
                <motion.span
                  data-cursor="scale"
                  className="font-bold text-6xl/18 mix-blend-diffrence"
                  style={{
                    color: color,
                  }}
                >
                  aquainted throughout the journey
                </motion.span>
                to build the website by creator.
              </p>
            </motion.div>

            <motion.div
              className=" bg-transparent tracking-widest w-350 relative h-200 text-center text-white flex items-center justify-center justify-self-center text-5xl/15 font-semibold rounded-4xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
              transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
              viewport={{ once: true }}
            >
              <p className="relative justify-self-center">
                <span className="text-gray-500">
                  Cohesively gained insights about relevant skills
                </span>{" "}
                and carved the skills to{" "}
                <motion.span
                  data-cursor="scale"
                  className=" mix-blend-diffrence font-bold text-6xl/18"
                  style={{
                    color: color,
                  }}
                >
                  become better at designing, creating, building not just
                  websites and projects
                </motion.span>{" "}
                but also a better platform which catches the users.
              </p>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Description;
