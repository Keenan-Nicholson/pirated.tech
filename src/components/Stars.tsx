import { useEffect, useState } from "react";
import "../Stars.css";

interface Star {
  id: number;
  size: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  blur: number;
}

export const Stars = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const createStar = (): Star => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    // Randomly decide where the star starts (off-screen)
    const edge = Math.floor(Math.random() * 4); // 0 = top, 1 = right, 2 = bottom, 3 = left
    let startX = null;
    let startY = null;
  
    switch (edge) {
      case 0: // Top
        startX = Math.random() * screenWidth;
        startY = -20;
        break;
      case 1: // Right
        startX = screenWidth + 20;
        startY = Math.random() * screenHeight;
        break;
      case 2: // Bottom
        startX = Math.random() * screenWidth;
        startY = screenHeight + 20;
        break;
      case 3: // Left
        startX = -20;
        startY = Math.random() * screenHeight;
        break;
    }
  
    // Random destination inside the screen
    let endX = Math.random() * screenWidth;
    let endY = Math.random() * screenHeight;
  
    // Ensure a minimum movement distance (avoid stars appearing stuck)
    const minMoveDistance = innerWidth;
    let dx = endX - startX;
    let dy = endY - startY;
    let distance = Math.sqrt(dx * dx + dy * dy);
  
    if (distance < minMoveDistance) {
      endX += minMoveDistance * (dx > 0 ? 1 : -1);
      endY += minMoveDistance * (dy > 0 ? 1 : -1);
      distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    }
  
    // Speed in pixels per second (ensure a reasonable speed range)
    const minSpeed = 40; // Minimum speed (pixels/sec)
    const maxSpeed = 60; // Maximum speed (pixels/sec)
    const speed = Math.random() * (maxSpeed - minSpeed);
  
    // Calculate duration (clamp to avoid extreme values)
    let duration = distance / speed;
    duration = Math.max(1.5, Math.min(duration, 5)); // Clamp duration between 1.5s - 5s
  
    return {
      id: Date.now() + Math.random(),
      size: Math.random() * 3 + 1,
      startX,
      startY,
      endX,
      endY,
      duration,
      blur: Math.random() * 3,
    };
  };
  

  useEffect(() => {
    // Spawn 20 stars at the start
    setStars(Array.from({ length: 20 }, createStar));
  
    const interval = setInterval(() => {
      const newStar = createStar();
      setStars((prevStars) => [...prevStars, newStar]);
  
      // Remove after animation ends
      setTimeout(() => {
        setStars((prevStars) => prevStars.filter((s) => s.id !== newStar.id));
      }, newStar.duration * 1000);
    }, 300); 
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="star-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.startX}px`,
            top: `${star.startY}px`,
            filter: `blur(${star.blur}px)`,
            animation: `move-star ${star.duration}s linear forwards, twinkle 4s infinite alternate`,
            "--end-x": `${star.endX}px`,
            "--end-y": `${star.endY}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
