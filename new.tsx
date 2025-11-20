import React, { useRef, useEffect, useCallback } from "react";

interface NavbarProps {
  color: string;
}

const NewCanvas = ({ color }: NavbarProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const targetMousePos = useRef({ x: -100, y: -100 });
  const animationId = useRef<number>();

  // Generate hexagons once with increased spacing
  const hexagons = React.useMemo(() => {
    const hexArray = [];
    const hexWidth = 59.5;
    const hexHeight = 30;
    const cols = 32;
    const rows = 35;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexWidth + (row % 2) * (hexWidth / 2) + hexWidth / 2;
        const y = row * hexHeight + hexHeight / 2;
        hexArray.push({ x, y });
      }
    }
    return hexArray;
  }, []);

  // Helper function to convert hex color to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    // Remove # if present
    hex = hex.replace("#", "");

    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const drawHexagon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    fillColor: string,
    strokeColor: string,
    opacity: number
  ) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const xPos = x + size * Math.cos(angle);
      const yPos = y + size * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(xPos, yPos);
      } else {
        ctx.lineTo(xPos, yPos);
      }
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(1, 1, canvas.width, canvas.height);

    // Smooth mouse movement
    const smoothing = 0.5;
    mousePos.current.x +=
      (targetMousePos.current.x - mousePos.current.x) * smoothing;
    mousePos.current.y +=
      (targetMousePos.current.y - mousePos.current.y) * smoothing;

    // Draw hexagons
    hexagons.forEach((hex) => {
      const dx = mousePos.current.x - hex.x;
      const dy = mousePos.current.y - hex.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 120;

      let size = 15;
      let fillColor = "rgba(255, 255, 255, 0)";
      let strokeColor = "#fefafaff";
      let opacity = 0.2;

      if (distance < maxDistance) {
        const intensity = 1 - distance / maxDistance;
        size = 15 + 3 * intensity;
        // Fix the color format
        fillColor = `${color} (${0.6 * intensity})`;
        strokeColor = distance < maxDistance / 2 ? color : "#333131ff";
        opacity = 0.2 + 0.8 * intensity;
      }

      drawHexagon(ctx, hex.x, hex.y, size, fillColor, strokeColor, opacity);
    });

    animationId.current = requestAnimationFrame(animate);
  }, [hexagons, color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Start animation
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [animate]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      // Calculate mouse position relative to canvas, accounting for scroll
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      // If canvas is positioned absolute, we need to add scroll offset
      if (window.getComputedStyle(canvas).position === "absolute") {
        x = e.clientX + window.scrollX;
        y = e.clientY + window.scrollY;
      }

      // Clamp values to canvas boundaries
      x = Math.max(0, Math.min(x, canvas.width));
      y = Math.max(0, Math.min(y, canvas.height));

      targetMousePos.current = { x, y };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    targetMousePos.current = { x: -100, y: -100 };
  }, []);

  // Add global mouse move listener for better tracking when scrolling
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      // Check if mouse is over canvas area (including scrolled areas)
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (
        mouseX >= 0 &&
        mouseX <= window.innerWidth &&
        mouseY >= 0 &&
        mouseY <= window.innerHeight
      ) {
        // Calculate position accounting for scroll
        let x = mouseX + window.scrollX;
        let y = mouseY + window.scrollY;

        // Only update if within canvas bounds
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          targetMousePos.current = { x, y };
        } else if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
          // Mouse is outside canvas bounds
          targetMousePos.current = { x: -100, y: -100 };
        }
      }
    };

    const handleScroll = () => {
      // Update mouse position on scroll if mouse is in viewport
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: targetMousePos.current.x - window.scrollX,
        clientY: targetMousePos.current.y - window.scrollY,
      });
      handleGlobalMouseMove(mouseEvent);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        cursor: "none",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "auto",
      }}
    />
  );
};

export default NewCanvas;
