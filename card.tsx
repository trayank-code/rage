import React, { useState, useRef } from "react";
import TiltedCard from "./titlecard.tsx";
import htmlred from "./assets/htmlred.png";
import htmlblue from "./assets/htmlblue.png";
import cssblue from "./assets/cssblue.png";
import cssred from "./assets/cssred.png";
import mtblue from "./assets/mtblue.png";
import mtred from "./assets/mtred.png";
import reactblue from "./assets/reactblue.png";
import reactred from "./assets/reactred.png";
import jsblue from "./assets/jsblue.png";
import jsred from "./assets/jsred.png";
import tailwindblue from "./assets/tailwindblue.png";
import tailwindred from "./assets/tailwindred.png";
import tag from "./assets/tag2.jpeg";
import { motion } from "framer-motion";

interface NavbarProps {
  color: string;
  variant: string;
}
const Card = ({ color, variant }: NavbarProps) => {
  const [pos, setPos] = useState({ rotateX: 0, rotateY: 0 });
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    { id: 1, text: "HTML...." },
    { id: 2, text: "CSS...." },
    { id: 3, text: "JavaScript...." },
    { id: 4, text: "React...." },
  ];
  const images: { [key: string]: string } = {
    htmlred: htmlred,
    htmlblue: htmlblue,
    jsred: jsred,
    jsblue: jsblue,
    cssred: cssred,
    cssblue: cssblue,
    reactred: reactred,
    reactblue: reactblue,
    mtred: mtred,
    mtblue: mtblue,
    tailwindred: tailwindred,
    tailwindblue: tailwindblue,
  };
  // Tilt effect for the whole card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * 20;
    const rotateY = ((x - rect.width / 2) / rect.width) * -20;

    setPos({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setPos({ rotateX: 0, rotateY: 0 });
    // reset all images
    imgRefs.current.forEach((img) => {
      if (img) img.style.transform = "translate3d(0,0,0)";
    });
  };
  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length); // loop back
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length); // loop back
  };
  // Magnet effect only for hovered image
  const handleImageMove = (
    e: React.MouseEvent<HTMLImageElement>,
    index: number
  ) => {
    const img = imgRefs.current[index];
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    img.style.transform = `translate3d(${offsetX * 1.5}px, ${
      offsetY * 1.5
    }px, 0)`;
  };

  const resetImage = (index: number) => {
    const img = imgRefs.current[index];
    if (img) img.style.transform = "translate3d(0,0,0)";
  };

  return (
    <motion.div className="w-550 h-auto bg-transparent flex justify-self-center relative">
      <motion.div
        className="w-500 h-400 flex m-20 bg-black top-20 rounded-3xl flex-wrap p-5 gap-10 justify-center relative flex-row items-center transition-transform duration-200"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${pos.rotateX}deg) rotateY(${pos.rotateY}deg)`,
        }}
      >
        {/* Floating images */}
        <div
          className="bg-transparent relative w-350 h-320 -z-10 top-40 rounded-full overflow-visible"
          style={{ scale: 0.9 }}
        >
          {[
            {
              src: images[`html${variant}`], // Use the lookup
              class: "absolute left-160 bottom-0",
              w: "w-45",
              h: "h-45",
            },
            {
              src: images[`css${variant}`],
              class: "absolute left-295 top-49",
              w: "w-59",
              h: "h-40",
            },
            {
              src: images[`tailwind${variant}`],
              class: " absolute left-300 top-140",
              w: "w-55",
              h: "h-45",
            },
            {
              src: images[`react${variant}`],
              class: " absolute left-20 bottom-30",
              w: "w-35",
              h: "h-35",
            },
            {
              src: images[`js${variant}`],
              class: " absolute top-65 left-20",
              w: "w-30",
              h: "h-30",
            },
            {
              src: images[`mt${variant}`],
              class: " absolute top-100 left-166",
              w: "w-40",
              h: "h-40",
            },
          ].map((img, i) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
              transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
              viewport={{ once: true }}
            >
              <motion.img
                data-cursor="scale"
                key={i}
                ref={(el) => (imgRefs.current[i] = el)}
                className={`${img.w} ${img.h} relative ${img.class} transition-transform duration-150 overflow-visible z-100 `}
                src={img.src}
                alt={`img-${i}`}
                onMouseMove={(e) => handleImageMove(e, i)}
                onMouseLeave={() => resetImage(i)}
              />
            </motion.div>
          ))}
        </div>

        {/* Cards in center */}
        <div
          className="w-250 h-250 bg-black relative rounded-full flex justify-center absolute items-center bottom-245 z-0"
          style={{ scale: 0.9 }}
        >
          <div className="w-100 h-100 absolute inset-0 items-center justify-center rounded-3xl bg-transparent gap-4">
            <button
              data-cursor="scale"
              className=" bg-transparent w-20 h-20 relative left-220 top-120 text-8xl font-bold"
              style={{ color: color }}
              onClick={nextCard}
            >
              »
            </button>
            <button
              data-cursor="scale"
              className=" bg-transparent w-20 h-20 relative top-118 text-black text-8xl font-bold"
              style={{ color: color }}
              onClick={prevCard}
            >
              «
            </button>

            <motion.div className="absolute inset-0 left-65 top-55">
              <TiltedCard
                imageSrc={tag}
                altText="Card"
                captionText={cards[currentIndex].text}
                containerHeight="500px"
                containerWidth="500px"
                imageHeight="500px"
                imageWidth="500px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                color={color}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text font-bold text-2xl relative top-10 left-10">
                    {cards[currentIndex].text}
                  </p>
                }
                selectedId={cards[currentIndex].id}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
