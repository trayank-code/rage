import type { SpringOptions } from "motion/react";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface TiltedCardProps {
  imageSrc: React.ComponentProps<"img">["src"];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties["height"];
  containerWidth?: React.CSSProperties["width"];
  imageHeight?: React.CSSProperties["height"];
  imageWidth?: React.CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  color: string;
  selectedId?: number;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  color,
  selectedId,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [got, setGot] = useState(false);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });
  const happy = [
    {
      id: 1,
      text: (
        <>
          <p className="text-black font-semibold tracking-widest ">
            HTML stands for HyperText Markup Language, and it is the standard
            markup language for creating and structuring web pages and their
            content, defining the meaning and layout of text, images, and links
            using tags that a web browser interprets to display the content
          </p>
        </>
      ),
    },
    {
      id: 2,
      text: (
        <>
          <p className="text-black font-semibold tracking-widest ">
            CSS, or Cascading Style Sheets, is a stylesheet language used to
            describe the presentation of a document written in a markup language
            like HTML. It separates the content (HTML) from the visual styling,
            allowing for greater flexibility and efficiency in web development.
          </p>
        </>
      ),
    },
    {
      id: 3,
      text: (
        <>
          <p className="text-black font-semibold tracking-widest ">
            JavaScript is a programming language primarily used to make web
            pages interactive and dynamic. While HTML provides the structure of
            a webpage and CSS handles its styling, JavaScript adds the
            "behavior."
          </p>
        </>
      ),
    },
    {
      id: 4,
      text: (
        <>
          <p className="text-black font-semibold tracking-widest ">
            React is a front-end JavaScript library. React was developed by the
            Facebook Software Engineer Jordan Walke. React is also known as
            React.js or ReactJS.
          </p>
        </>
      ),
    },
  ];
  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative rounded-4xl w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative rounded-4xl [transform-style:preserve-3d]"
        onHoverStart={() => setGot(true)}
        onHoverEnd={() => setGot(false)}
        initial={{
          boxShadow: "0 0 0px rgba(0,0,0,0)", // no shadow by default
        }}
        whileHover={{
          boxShadow: [
            `0 0 55px ${color}`, // no glow
          ],
          transition: {
            scale: { type: "spring" }, // ✅ no repeat
            boxShadow: {
              ease: "easeInOut",
            }, // ✅ glow speeds up
          },
        }}
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute rounded-[15px] will-change-transform [transform:translateZ(0)]"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={
            got ? { opacity: 1, scale: 0.3, y: -145 } : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.5, ease: "circInOut" }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute rounded-4xl top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
        <div>
          {happy
            .filter((hog) => selectedId === undefined || hog.id === selectedId)
            .map((hog) => (
              <motion.div
                key={hog.id}
                className="relative bg-white h-125 flex items-center justify-center rounded-4xl"
                initial={{ opacity: 0, scale: 0, zIndex: -1 }}
                animate={
                  got ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.6, ease: "circInOut" }}
              >
                <div className="relative top-20 w-400 h-150 text-2xl p-4 bg-transparent text-white rounded-xl text-center flex items-center justify-center rounded-4xl">
                  {hog.text}
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
