import { React, useState, useEffect, useRef } from "react";
import Dock from "./dock.tsx";
import { motion, spring } from "framer-motion";
interface NavbarProps {
  color: string;
  scale: number; // Add prop type
}

const Hand = ({ color, scale }: NavbarProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [elapsed, setElapsed] = useState("");

  // Timer effect
  useEffect(() => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);
    startDate.setDate(startDate.getDate() - 5);

    const start = startDate.getTime();

    const updateTime = () => {
      const now = Date.now();
      const diff = now - start;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);

      const remainingDays = days % 30;
      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;
      const remainingSeconds = seconds % 60;

      setElapsed(
        `${months} Months, ${remainingDays} Days, ${remainingHours
          .toString()
          .padStart(2, "0")}:${remainingMinutes
          .toString()
          .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const firstCards = [
    {
      id: 1,
      text: "CODING",
      class: "text-[250px] h-100 w-370 left-100 font-bold absolute",
    },
    {
      id: 2,
      text: "LEARNING",
      class: "text-[250px] h-100 w-370 font-bold absolute",
    },
    {
      id: 3,
      text: "JOURNEY",
      class: "text-[250px] h-100 w-370 left-80 font-bold absolute",
    },
    {
      id: 4,
      text: "TIME",
      class: "text-[250px] h-100 w-370 left-150 font-bold absolute",
    },
  ];
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = scale; // same as your transform: scale(0.5)
    setPosition({
      x: (e.clientX - rect.left) / scaleFactor,
      y: (e.clientY - rect.top) / scaleFactor,
    });
  };

  const secondCards = [
    {
      id: 1,
      text: (
        <>
          <motion.p
            className=" w-auto h-auto text-4xl/12 tracking-widest font-semibold "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
            transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
            viewport={{ once: true }}
          >
            I started coding in mid 2025, getting hands on experience on{" "}
            <span
              data-cursor="scale"
              className=" text-5xl/12 font-bold"
              style={{
                color: color,
              }}
            >
              HTML, CSS Java Script and React by building projects and watching
              others projects and making myself more confident on the field of
              technology
            </span>{" "}
            apart from non-tech background. The more I code the more I learn and
            in this fast paced world ,{" "}
            <span className="text-gray-500 text-5xl/15">
              My journey started with curiosity, grew through challenges, and
              continues as I push my creative boundaries
            </span>{" "}
          </motion.p>
        </>
      ),
    },
    {
      id: 2,
      text: (
        <>
          <motion.p
            className=" w-auto h-auto text-4xl/10 tracking-widest font-semibold "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
            transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
          >
            <span className="text-gray-500 text-5xl/12">
              I started learning from youtube, went through many developer'
              projects and carved my skills on self projects
            </span>{" "}
            and coding fundamentals and also AI was always there to solve my
            doubts .{" "}
            <span
              data-cursor="scale"
              className=" text-5xl/15 font-bold"
              style={{
                color: color,
              }}
            >
              {" "}
              It's been a good journey from being a non tech guy to become a
              coder,{" "}
            </span>
            but embracing the ability to grow made things happen and ignited a
            fire in me to deal with tech issues.
          </motion.p>
        </>
      ),
    },
    {
      id: 3,
      text: (
        <>
          <motion.p
            className=" w-auto h-auto text-4xl/10 tracking-widest font-semibold "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
            transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-500 text-5xl/12">
              Its been a good journey of becoming a Front-end developer{" "}
            </span>{" "}
            from a guy who chose management and theories in earlier studies ,
            but was always interested in technology around.
            <span
              data-cursor="scale"
              className=" text-5xl/15 font-bold"
              style={{
                color: color,
              }}
            >
              {" "}
              It was all my interest towards building and creating which led me
              come this route and that fire only made me through .{" "}
            </span>
            I won't say it was tough , nowadays nothing seems impossible and the
            journey never ends , so learning is going on so am I in this field.{" "}
          </motion.p>
        </>
      ),
    },
    {
      id: 4,
      text: (
        <>
          <motion.p
            className="w-500 flex-row items-center justify-center justify-self-center text-8xl font-bold tracking-wider"
            style={{ color: color }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
            transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
            viewport={{ once: true }}
          >
            {" "}
            <span className="text-gray-600 text-5xl">It's been </span>
            <br />
            {elapsed}
            <br />
            <span className="text-white text-5xl">
              {" "}
              since I started my journey{" "}
            </span>
            <br />
          </motion.p>{" "}
        </>
      ),
    },
  ];

  // 👇 Define handler before using in items
  const handleSelect = (id: number) => {
    setSelectedId(id); // updates which card to show
  };

  const items = [
    { text: "coding", label: "Coding", onClick: () => handleSelect(1) },
    { text: "learning", label: "Learning", onClick: () => handleSelect(2) },
    { text: "skills", label: "Skills", onClick: () => handleSelect(3) },
    { text: "time", label: "Time", onClick: () => handleSelect(4) },
  ];

  return (
    <>
      <div className="flex-row items-center bg-transparent w-700 h-auto justify-center justify-self-center gap-10 relative">
        {/* First Cards Stack */}
        <div className="w-500 h-150 bg-transparent flex items-center justify-center relative justify-self-center top-100">
          {firstCards
            .filter((card) => selectedId === null || card.id === selectedId)
            .map((card) => (
              <section
                className="w-300 h-100 text-white bg-transparent rounded-xl font-bold flex items-center justify-center justify-self-center relative"
                onMouseMove={handleMouseMove}
              >
                <h1
                  className="w-300 h-100 flex items-center justify-center justify-self-center text-[250px]"
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
                  {card.text}
                </h1>
              </section>
            ))}
        </div>
        <div className="bg-transparent flex items-center justify-self-center h-300 w-600">
          {/* Second Cards Stack */}
          <div className="relative w-600 h-150 justify-self-center flex items-center justify-center">
            {secondCards
              .filter((card) => selectedId === null || card.id === selectedId)
              .map((card) => (
                <motion.div
                  key={card.id}
                  className="absolute w-400 h-200 inset-0 flex items-center justify-center justify-self-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="w-400 h-250 bg-transparent text-white rounded-xl relative text-center flex items-center justify-self-center">
                    {card.text}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Dock buttons */}
        <section className="relative bg-black w-127 h-50 flex items-center justify-self-center">
          <Dock
            items={items}
            panelHeight={135}
            baseItemSize={100}
            magnification={130}
            color={color}
          />
        </section>
      </div>
    </>
  );
};

export default Hand;
