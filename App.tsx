import { motion, AnimatePresence, color, spring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimation } from "framer-motion";
import Navbar from "./navbar";
import Topbar from "./topbar";
import New from "./new";
import Bg from "./bg.tsx";
import Load from "./load.tsx";
import { div, style } from "framer-motion/client";
import Forget from "./forget.tsx";
import Circle from "./circle.tsx";
import Description from "./description.tsx";
import Card from "./card.tsx";
import Experience from "./experience.tsx";
import Journey from "./journey.tsx";
import Hand from "./hand.tsx";
import Fullstack from "./fullstack.tsx";
import Color from "./App.tsx";
import Form from "./form.tsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Images from "./images.tsx";
gsap.registerPlugin(ScrollTrigger);
interface ScrollRevealProps {
  onLoadingComplete: () => void;
}
// gsap.registerPlugin(ScrollTrigger);
const App = ({ onLoadingComplete }: ScrollRevealProps) => {
  const [button, setbutton] = useState(false);
  const [go, setgo] = useState(true);
  const [isNew, setisNew] = useState(false);
  const [yeso, setYeso] = useState({ name: "", description: "" });
  const [imageVariant, setImageVariant] = useState<string>("red");
  const [Color, setColor] = useState<string>(color);
  const [nice, setNice] = useState<string>();
  const controls = useAnimation();

  const [doe, setDoe] = useState(false);

  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Check if page is already loaded
    if (document.readyState === "complete") {
      setIsPageLoaded(true);
    }

    // Listen for page load
    const handleLoad = () => {
      setIsPageLoaded(true);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    let interval: number;

    if (isPageLoaded) {
      // If page is loaded, count quickly to 100
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsComplete(true);
              setTimeout(() => {
                onLoadingComplete();
              }, 600);
            }, 300);
            return 100;
          }
          return prev + 5; // Faster increment when loaded
        });
      }, 30);
    } else {
      // If page not loaded yet, count slower and stop at 90
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 1;
        });
      }, 50);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPageLoaded, onLoadingComplete]);
  // Calculate scale based on screen width
  const calculateScale = (width: number) => {
    const baseWidth = 1920; // Reference width where scale = 0.5
    const baseScale = 0.5;
    const scaleFactor = 0.0003; // Change per pixel

    return Math.max(
      0.2,
      Math.min(1.0, baseScale + (width - baseWidth) * scaleFactor)
    );
  };

  const [scale, setScale] = useState(() => calculateScale(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setScale(calculateScale(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use it everywhere instead of scale(0.5)
  const dynamicScale = {
    transform: `scale(${scale})`,
    transformOrigin: "top center",
  };

  // Then apply: style={dynamicScale}
  // Add this state
  const [containerHeight, setContainerHeight] = useState(3000); // Start with estimated height

  // Update your scale useEffect to also update height
  useEffect(() => {
    const handleResize = () => {
      const newScale = calculateScale(window.innerWidth);
      setScale(newScale);

      // Calculate new height based on actual content
      const baseHeight = 3000; // Adjust this based on your content
      setContainerHeight(baseHeight * newScale);
    };

    handleResize(); // Call immediately
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".img2",
      { opacity: 0, scale: 0, yPercent: 50 }, // ✅ correct
      {
        opacity: 1,
        scale: 1,
        yPercent: 0, // ✅ correct
        duration: 0.5,
        ease: "power1.inOut",

        onComplete: () => {
          setTimeout(() => {
            setbutton(true);
          }, 1000);
        },
      }
    );
    gsap.fromTo(
      ".img3",
      { opacity: 0, scale: 0, yPercent: 50 }, // ✅ correct
      {
        opacity: 1,
        scale: 1,
        yPercent: 0, // ✅ correct
        duration: 2,
        ease: "power1.inOut",
      }
    );

    gsap.fromTo(
      ".good",
      { opacity: 0, yPercent: 50 },
      {
        opacity: 1,
        yPercent: 0,

        duration: 0.5,
        ease: "power1.inOut",
        type: "spring",
      }
    );
    gsap.fromTo(
      ".red",
      { opacity: 0, scale: 0, yPercent: 50 },
      {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        duration: 1,
        ease: "power1.inOut",
        type: "spring",
        repeat: 0,
      }
    );
    gsap.fromTo(
      ".blue",
      { opacity: 0, scale: 0, yPercent: 50 },
      {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        duration: 1,
        ease: "power1.inOut",
        type: "spring",
        repeat: 0,
      }
    );
  }, []);

  useGSAP(() => {
    if (!isNew) return;
    gsap.fromTo(
      ".blue-two",
      { opacity: 0, scale: 0, yPercent: 50 },
      {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        duration: 1,
        ease: "power1.inOut",
        type: "spring",
        repeat: 0,
      }
    );
    gsap.fromTo(
      ".red-two",
      { opacity: 0, scale: 0, yPercent: 50 },
      {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        duration: 1,
        ease: "power1.inOut",
        type: "spring",
        repeat: 0,
      }
    );
    // Wait for elements to be rendered
    const ctx = gsap.context(() => {
      // Animate middle image section down and fade out
      gsap.to(".rev", {
        yPercent: 80,

        opacity: 0,
        scale: 0.2,
        type: "spring",
        ease: "easeInOut",
        scrollTrigger: {
          trigger: ".rev",
          start: "-top 10% ",
          end: "+=180",
          scrub: 0.6,

          // Remove this in production
        },
      });
      gsap.to(".hive", {
        type: "spring",
        ease: "easeInOut",

        scrollTrigger: {
          trigger: ".hive",
          start: "top top",
          end: "+=500",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          fastScrollEnd: true,
        },
      });
      // Animate left text from corner
      gsap.fromTo(
        ".lefty",
        {
          yPercent: -600,
          xPercent: -40,
          opacity: 0,
          scale: 0,
        },
        {
          yPercent: 500,

          xPercent: 0,

          opacity: 1,
          scale: 1,
          type: "spring",
          ease: "easeInOut",
          scrollTrigger: {
            trigger: ".rev",
            start: "top 20%",
            end: "+=220",
            scrub: 0.6,
            fastScrollEnd: true,
          },
        }
      );

      // Animate right text from corner
      gsap.fromTo(
        ".righty",
        {
          yPercent: -400,
          xPercent: 40,
          opacity: 0,
          scale: 0,
        },
        {
          yPercent: 200,
          xPercent: 0,
          opacity: 1,
          scale: 1,
          type: "spring",
          ease: "easeInOut",

          scrollTrigger: {
            trigger: ".rev",
            start: "top 20%",
            end: "+220",
            scrub: 0.6,
            fastScrollEnd: true,
          },
        }
      );

      gsap.fromTo(
        ".heaven",
        {
          yPercent: 150,
          opacity: 0,
          scale: 0,
        },
        {
          yPercent: 30,
          opacity: 1,
          scale: 1,
          type: "spring",
          ease: "easeInOut",

          scrollTrigger: {
            trigger: ".rev",
            start: "top 20%",
            end: "+=260",
            scrub: 0.6,
            fastScrollEnd: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [isNew]);

  return (
    <>
      <div className="bg-black w-screen h-screen absolute ">
        {!isComplete && (
          <motion.div
            className="absolute z-200 flex flex-col items-center"
            style={dynamicScale}
          >
            <motion.div
              className="text-7xl font-bold mb-2"
              style={{ color: "gray" }}
              key={progress}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {progress}%
            </motion.div>
          </motion.div>
        )}
        <AnimatePresence>
          {go && (
            <>
              <motion.div className="w-auto h-auto relative flex justify-center ">
                <motion.section
                  key="initial-screen"
                  className="bg-black w-350 h-350 flex absolute"
                  style={dynamicScale}
                  // Define the exit animation for the entire screen
                >
                  {" "}
                  <motion.img
                    src="./src/assets/hard.png"
                    className="img2 flex relative top-20 w-350 h-350"
                    exit={{
                      opacity: 0,
                      scale: 0,
                      boxShadow: "0 0 0px rgba(255,0,0,0)",
                      transition: {
                        type: "spring",
                        duration: 1,
                        ease: "easeInOut",
                        repeat: 0,
                      },
                    }}
                  ></motion.img>
                  {button && (
                    <div className="w-155 h-50 flex items-center justify-center bg-transparent relative top-120 right-200">
                      <motion.section
                        className="relative w-auto h-auto"
                        exit={{
                          opacity: 0,
                          scale: 0,
                          transition: {
                            duration: 0.5,
                            ease: "easeInOut",
                            type: "spring",
                          },
                        }}
                      >
                        <motion.section
                          className="w-225 h-20 right-70 top-135 relative bg-transparent flex justify-between"
                          exit={{
                            opacity: 0,
                            scale: 0,
                            transition: {
                              type: "spring",
                              duration: 0.5,
                              ease: "easeInOut",
                            },
                          }}
                        >
                          {/* Ring animations together */}
                          <div className="relative w-auto h-auto bg-transparent ">
                            <div id="ring"></div>
                            <div id="ring"></div>
                            <div id="ring"></div>
                            <div id="ring"></div>
                          </div>

                          <div className="relative w-auto h-auto bg-transparent">
                            <div id="ring1" className="relative"></div>
                            <div id="ring1" className="relative"></div>
                            <div id="ring1" className="relative"></div>
                            <div id="ring1" className="relative"></div>
                          </div>
                        </motion.section>

                        <motion.section
                          className="relative top-140 right-50 w-260 h-20 bg-transparent flex justify-between items-center  "
                          exit={{
                            opacity: 0,
                            scale: 0,
                            transition: {
                              type: "spring",
                              duration: 1,
                              ease: "easeInOut",
                            },
                          }}
                        >
                          <motion.button
                            className="red rounded-full bg-red-700 relative w-35 h-18  "
                            whileHover={{
                              scale: 1.1,
                              boxShadow: [
                                "0 0 0px rgba(255, 0, 0, 0)",
                                "0 0 20px rgba(255, 0, 0, 0.8)",
                                "0 0 40px rgba(255, 0, 0, 1)",
                                "0 0 20px rgba(255, 0, 0, 0.8)",
                                "0 0 0px rgba(255, 0, 0, 0)",
                              ],
                              transition: {
                                scale: { duration: 0.2, type: "spring" },
                                boxShadow: {
                                  duration: 0.3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                },
                              },
                            }}
                            initial={{
                              opacity: 1,
                              scale: 0,
                              boxShadow: "0 0 0px rgba(255, 0, 0, 0)",
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              boxShadow: [
                                "0 0 0px rgba(255, 0, 0, 0)",
                                "0 0 20px rgba(255, 0, 0, 0.8)",
                                "0 0 40px rgba(255, 0, 0, 1)",
                                "0 0 20px rgba(255, 0, 0, 0.8)",
                                "0 0 0px rgba(255, 0, 0, 0)",
                              ],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              scale: {
                                type: "spring",
                                visualDuration: 0.5,
                                bounce: 0.4,
                              },
                              ease: "easeInOut",
                            }}
                            onTap={() => {
                              setColor("hsla(0, 100%, 49%, 1.00)");
                              setImageVariant("red");
                              setNice("hsla(239, 61%, 25%, 1.00)");
                              setDoe(true);
                            }}
                          />
                          <motion.button
                            className="blue rounded-full bg-blue-700 relative w-35 h-18  "
                            whileHover={{
                              scale: 1.1,
                              boxShadow: [
                                "0 0 0px rgba(0, 0, 255, 0)",
                                "0 0 20px rgba(0, 0, 255, 0.8)",
                                "0 0 40px rgba(0, 0, 255, 1)",
                                "0 0 20px rgba(0, 0, 255, 0.8)",
                                "0 0 0px rgba(0, 0, 255, 0)",
                              ],
                              transition: {
                                scale: { duration: 0.2, type: "spring" },
                                boxShadow: {
                                  duration: 0.3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                },
                              },
                            }}
                            initial={{
                              opacity: 1,
                              scale: 0,
                              boxShadow: "0 0 0px rgba(255, 0, 0, 0)",
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              boxShadow: [
                                "0 0 0px rgba(0, 0, 255, 0)",
                                "0 0 20px rgba(0, 0, 255, 0.8)",
                                "0 0 40px rgba(0, 0, 255, 1)",
                                "0 0 20px rgba(0, 0, 255, 0.8)",
                                "0 0 0px rgba(0, 0, 255, 0)",
                              ],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              scale: {
                                type: "spring",
                                visualDuration: 0.5,
                                bounce: 0.4,
                              },
                              ease: "easeInOut",
                            }}
                            onTap={() => {
                              setColor("hsla(239, 100%, 51%, 1.00)");
                              setImageVariant("blue");
                              setNice("hsla(0, 93%, 31%, 1.00)");
                              setDoe(true);
                            }}
                          />
                        </motion.section>
                      </motion.section>
                      {doe && (
                        <div className="absolute bg-transparent w-600 h-310 flex items-center justify-center top-20 -right-180 ">
                          <motion.div
                            className="bg-transparent w-600 h-300 relative flex items-center justify-center"
                            exit={{
                              opacity: 0,
                              scale: 0,
                              transition: {
                                duration: 1,
                                ease: "easeInOut",
                                type: "spring",
                              },
                            }}
                          >
                            <Form
                              setgo={setgo}
                              setisNew={setisNew}
                              setdoe={setDoe}
                              setyeso={setYeso}
                            />
                          </motion.div>
                        </div>
                      )}{" "}
                    </div>
                  )}
                </motion.section>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <AnimatePresence></AnimatePresence>
      </div>

      {isNew && (
        <>
          <motion.div
            className="w-screen h-1050
           bg-black cursor-none overflow-y-hidden"
          >
            {/* Fixed background blob */}
            <div
              className=" w-screen h-screen fixed inset-0 z-0 bg-black overflow-x-hidden pointer-events-none overflow-y-hidden"
              style={{ scale: 1.3 }}
            >
              <div
                className="w-screen h-screen flex fixed inset-0 z-0 bg-black relative top-100 "
                style={dynamicScale}
              >
                <div
                  className="absolute w-400 h-200 rounded-full opacity-30 overflow-hidden top-40 left-300"
                  style={{
                    background: `linear-gradient(to left, hsla(0, 0%, 9%, 1.00), ${Color})`,
                    filter: "blur(80px)",
                    animation: "blob 7s infinite",
                    opacity: 0.3,
                  }}
                ></div>
                <div
                  className="absolute w-300 h-160 rounded-full opacity-30 overflow-hidden right-350 -bottom-90"
                  style={{
                    background: `linear-gradient(to left, rgba(12, 12, 12, 1), ${Color})`,
                    filter: "blur(80px)",
                    animation: "blob 7s infinite",
                    opacity: 0.3,
                  }}
                ></div>
                <div
                  className="absolute w-400 h-200 rounded-full opacity-30 overflow-hidden bottom-300 left-350"
                  style={{
                    background:
                      "linear-gradient(to left, rgba(24, 23, 23, 1), rgba(112, 111, 111, 1))",
                    filter: "blur(80px)",
                    animation: "blob 7s infinite",
                    opacity: 0.3,
                  }}
                ></div>
              </div>
            </div>
            <Circle color={Color} />
            <div className="hive w-screen h-screen ">
              {/* Content appears above */}
              <New color={Color} />
            </div>

            <motion.section
              className="bg-transparent top-0 w-1300 h-60 z-100 flex items-center justify-center justify-self-center backdrop-blur-md justify-around fixed absolute "
              style={dynamicScale}
            >
              <motion.section
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 2, type: spring, ease: "easeInOut" }}
              >
                <Topbar color={Color} /> <Navbar color={Color} />{" "}
                <Forget color={Color} />
              </motion.section>
            </motion.section>
            <div className="w-screen h-auto flex-row justify-self-center ">
              <section
                className="h-300 w-250 flex justify-self-center absolute bg-transparent top-40 rev"
                style={dynamicScale}
              >
                <motion.img
                  className="img3 w-250 h-250"
                  src="./src/assets/yo.png"
                  initial={{ opacity: 0, scale: 0, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 2,
                    type: spring,
                    ease: "easeInOut",
                  }}
                ></motion.img>
                <motion.button
                  className="red-two rounded-full absolute text-white w-29 h-15 top-188 right-189 "
                  style={{ backgroundColor: Color }}
                  initial={{ scale: 1 }}
                  animate={{
                    boxShadow: [
                      `0 0 0px rgba(255, 0, 0, 0)`, // no glow
                      `0 0 30px ${Color}`, // medium glow
                      `0 0 120px ${Color}`,

                      `0 0 0px rgba(255, 0, 0, 0)`, // no glow
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.button>
                <motion.button
                  className="blue-two rounded-full absolute text-white w-29 h-15 top-188 left-192 z-40"
                  style={{ backgroundColor: nice }}
                ></motion.button>
              </section>
              <section
                className="w-800 h-screen flex items-center justify-center relative justify-self-center bottom-150"
                style={dynamicScale}
              >
                <motion.section className="border-box bg-black lefty rounded-4xl w-170 h-70 relative flex items-center justify-center bottom-270">
                  <p className="font-bold relative" style={{ color: Color }}>
                    <span className="text-5xl text-gray-600 justify-self-center flex">
                      Hii
                    </span>{" "}
                    <br />
                    <span className="text-4xl justify-self-center flex">
                      {yeso.name}
                    </span>
                  </p>
                </motion.section>
                <div className="relative border-box h-200 w-400 heaven bg-black rounded-4xl flex items-center justify-center">
                  <Images color={Color} />
                </div>
                <motion.section className="border-box bg-black righty rounded-4xl w-170 h-100 relative flex items-center justify-center bottom-130">
                  <p
                    className="text-4xl font-bold relative"
                    style={{ color: Color }}
                  >
                    {yeso.description}
                  </p>
                </motion.section>
              </section>
              <div
                className="relative w-800 h-auto overflow-hidden bottom-170 flex-row items-center justify-center justify-self-center justify-around"
                style={dynamicScale}
              >
                <Description color={Color} scale={scale} />
                <Card color={Color} variant={imageVariant} />
                <Experience color={Color} scale={scale} />
                <Journey color={Color} />
                <Hand color={Color} scale={scale} />
                <Fullstack color={Color} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};
export default App;
