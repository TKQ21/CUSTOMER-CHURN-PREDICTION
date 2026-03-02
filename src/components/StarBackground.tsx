import { useMemo } from "react";

const StarBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      
      {/* Nebula blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-neon-magenta/5 blur-3xl" />
      <div className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full bg-neon-purple/5 blur-3xl" />
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.size > 2.5 
              ? "hsl(180 100% 70%)" 
              : star.size > 1.5 
              ? "hsl(270 100% 80%)" 
              : "hsl(0 0% 90%)",
            boxShadow: star.size > 2 
              ? `0 0 ${star.size * 3}px hsl(180 100% 50% / 0.5)` 
              : "none",
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default StarBackground;
