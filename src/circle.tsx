import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isMask, setIsMask] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const enterMask = () => setIsMask(true);
    const leaveMask = () => setIsMask(false);

    // track mouse
    window.addEventListener("mousemove", move);

    // handle mask hover
    document.querySelectorAll("[data-mask]").forEach((el) => {
      el.addEventListener("mouseenter", enterMask);
      el.addEventListener("mouseleave", leaveMask);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("[data-mask]").forEach((el) => {
        el.removeEventListener("mouseenter", enterMask);
        el.removeEventListener("mouseleave", leaveMask);
      });
    };
  }, []);

  const size = isMask ? 200 : 40;

  return (
    <motion.div
      className="fixed rounded-full pointer-events-none z-50 bg-red-500"
      animate={{
        left: pos.x - size / 2,
        top: pos.y - size / 2,
        width: size,
        height: size,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{
        mixBlendMode: isMask ? "difference" : "normal", // mask-like effect
      }}
    />
  );
}
