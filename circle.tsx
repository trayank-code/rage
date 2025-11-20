// Circle.tsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import React from "react";
interface NavbarProps {
  color: string;
}
const Circle: React.FC = ({ color }: NavbarProps) => {
  const cursor = useRef<HTMLDivElement | null>(null);

  const cursorFollower = (e: MouseEvent) => {
    if (cursor.current) {
      gsap.to(cursor.current, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.2,
      });
    }
  };

  const handleEnter = () => {
    if (cursor.current) {
      gsap.to(cursor.current, { scale: 4, duration: 0.3, ease: "power3.out" });
    }
  };

  const handleLeave = () => {
    if (cursor.current) {
      gsap.to(cursor.current, { scale: 1, duration: 0.3, ease: "power3.out" });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", cursorFollower);

    // Function to attach listeners to all spans with data-cursor="scale"
    const bindListeners = () => {
      document.querySelectorAll("[data-cursor='scale']").forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    bindListeners(); // bind initially

    // Watch DOM for new nodes (React re-renders)
    const observer = new MutationObserver(() => {
      bindListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("mousemove", cursorFollower);
      observer.disconnect();
      document.querySelectorAll("[data-cursor='scale']").forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursor}
      className="w-6 h-6 rounded-full fixed pointer-events-none z-200 mix-blend-difference"
      style={{
        backgroundColor: color,
      }}
    ></div>
  );
};

export default Circle;
