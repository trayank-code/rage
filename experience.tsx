import { useState } from "react";
import { motion, spring } from "framer-motion";
import jyotiImg from "./assets/jyoti.jpeg";
import hyvImg from "./assets/hyv.jpeg";
import kuikImg from "./assets/kuik.png";
import { cover } from "three/src/extras/TextureUtils.js";

interface NavbarProps {
  color: string;
  scale: number;
}

const Experience = ({ color, scale }: NavbarProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [get, setGet] = useState<number | null>(1);
  const [hover, setHover] = useState(false);
  const firstimages = [
    {
      id: 1,
      src: jyotiImg,
      class: "relative w-140 h-140 bg-white rounded-4xl z-0  ",
      text: (
        <>
          <p className="text-5xl w-150 h-100 text-white font-semibold">
            I have done my schooling from{" "}
            <span data-cursor="scale" style={{ color: color }}>
              Jyoti higher secondary english medium school, charoda, durg
              chhattisgarh
            </span>
            . I ended up scoring 90% on my 10th and 78% on my 12th taking
            commerce as my studies
          </p>
        </>
      ),
    },
    {
      id: 2,
      src: hyvImg,
      class: "w-140 h-140 bg-white relative rounded-4xl z-0 hover: -z-10",
      text: (
        <>
          <p className="text-5xl w-250 h-70 text-white font-semibold">
            I have completed my graduation from{" "}
            <span data-cursor="scale" style={{ color: color }}>
              Rungta college of science and technology , kohka
            </span>{" "}
            . I took BBA as my graduation degree and completed my studies with
            60% as my overall percentage.
          </p>
        </>
      ),
    },
    {
      id: 3,
      src: kuikImg,
      class: "w-140 h-140 bg-white relative rounded-4xl z-0 hover: -z-10",
      text: (
        <>
          <p className="text-5xl w-250 h-70 font-semibold text-white">
            I worked as a{" "}
            <span data-cursor="scale" style={{ color: color }}>
              Brand Support Intern in Brand Kuik Logistics{" "}
            </span>
            for around three months, carving my communication skills,
            interpersonal skills , and customer support.
            <span className="text-gray-600">
              {" "}
              I aided in escalating orders and resolving pod issues reducing
              daily order breaches.
            </span>
          </p>
        </>
      ),
    },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = scale + 0.1; // same as your transform: scale(0.5)
    setPosition({
      x: (e.clientX - rect.left) / scaleFactor,
      y: (e.clientY - rect.top) / scaleFactor,
    });
  };
  const selected = (id: number) => {
    setGet(id);
  };
  return (
    <div className="w-700 h-auto bg-transparent flex-row items-center justify-self-center justify-around relative">
      <section
        className="w-900 h-150 bg-transparent font-bold justify-self-center flex items-center justify-center rounded-4xl relative top-20 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight Effect (in place of DESCRIPTION text) */}
        <h1
          className="absolute top-30 text-[250px] w-800 font-bold text-red-500 select-none justify-self-center flex items-center justify-center "
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
          EXPERIENCE
        </h1>
      </section>
      <div className="w-400 h-200 flex items-center justify-around relative justify-self-center bg-black/20 rounded-3xl">
        <div
          className="w-350 h-150 bg-transparent relative flex items-center justify-center rounded-3xl "
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {firstimages
            .filter((age) => get === null || age.id === get)
            .map((age) => (
              <motion.p
                className="absolute top-40 bg-transparent text-3xl w-290 h-100 left-20 -z-1 flex items-center justify-center"
                style={{ color: color }}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  hover
                    ? { zIndex: 0, opacity: 1, scale: 1 }
                    : {
                        objectFit: "cover",
                      }
                }
                transition={{ duration: 0.5, ease: "backInOut" }}
              >
                {age.text}
              </motion.p>
            ))}
          {firstimages
            .filter((age) => get === null || age.id === get)
            .map((age) => (
              <motion.img
                key={age.id}
                src={age.src}
                className={age.class}
                animate={
                  hover
                    ? { width: 100, height: 100, bottom: 200, right: 420 }
                    : {
                        objectFit: "cover",
                      }
                }
                transition={{ duration: 0.3, ease: "backInOut" }}
              ></motion.img>
            ))}
        </div>
        <div className="w-150 h-180 text-white bg-transparent p-10 flex-row items-center justify-around relative rounded">
          <motion.button
            data-cursor="scale"
            className=" w-80 h-40 bg-transparent relative left-18 rounded-full cursor-none justify-center font-bold text-3xl text-center justify-center m-8"
            style={{ color: color }}
            onClick={() => selected(1)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
            transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
            viewport={{ once: true }}
          >
            SCHOOLING
          </motion.button>
          <motion.button
            data-cursor="scale"
            className="  w-80 h-40 bg-transparent relative left-18 rounded-full cursor-none justify-center font-bold text-3xl text-center justify-center m-8 "
            style={{ color: color }}
            onClick={() => selected(2)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
            transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
            viewport={{ once: true }}
          >
            GRADUATION
          </motion.button>
          <motion.button
            data-cursor="scale"
            className="  w-80 h-40 bg-transparent relative left-18 rounded-full cursor-none justify-center font-bold text-3xl text-center justify-center m-8 "
            style={{ color: color }}
            onClick={() => selected(3)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
            transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
            viewport={{ once: true }}
          >
            EXPERIENCE
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
