import React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const Load = ({ onLoadingComplete }: LoadingScreenProps) => {
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
  return (
    <>
      {!isComplete && (
        <motion.div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="text-7xl font-bold mb-2"
            style={{ color: "white" }}
            key={progress}
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Load;
