import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation";

export function ParticleBackground() {
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    // Generate particles
    const particleCount = Math.min(Math.floor(width * height / 10000), 100);
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.25})` // Blue with random opacity
      });
    }
    
    setParticles(newParticles);
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      for (let i = 0; i < newParticles.length; i++) {
        const p = newParticles[i];
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
        
        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections
        for (let j = i + 1; j < newParticles.length; j++) {
          const p2 = newParticles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - distance / 120) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
}

export function FloatingIcons() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => {
        const icons = ["fas fa-gamepad", "fas fa-keyboard", "fas fa-headset", "fas fa-trophy", "fas fa-desktop"];
        const icon = icons[i % icons.length];
        const size = Math.random() * 20 + 10; // 10-30px
        const xPos = `${Math.random() * 100}%`;
        const delay = Math.random() * 10;
        const duration = Math.random() * 15 + 20; // 20-35s
        
        return (
          <motion.i
            key={i}
            className={`${icon} text-blue-500 absolute opacity-5`}
            initial={{ 
              x: xPos, 
              y: "110vh", 
              fontSize: `${size}px`,
              rotate: Math.random() * 180 - 90
            }}
            animate={{ 
              y: "-10vh",
              rotate: Math.random() * 360 - 180
            }}
            transition={{ 
              duration,
              delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
}

export function MouseTrailer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearTimeout(timeout);
    };
  }, []);
  
  return (
    <motion.div
      className="fixed w-12 h-12 rounded-full pointer-events-none z-50 mix-blend-screen opacity-70"
      style={{
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, rgba(59, 130, 246, 0) 70%)",
        x: mousePosition.x - 24,
        y: mousePosition.y - 24
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: isVisible ? [0.5, 0.7, 0.5] : 0
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

export function AnimatedText({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      variants={fadeIn("up", delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlowingButton({ children, className = "", onClick = () => {} }) {
  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg px-6 py-3 font-bold ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-blue-500"
        animate={{
          boxShadow: [
            "0 0 5px 2px rgba(59, 130, 246, 0.3)",
            "0 0 10px 5px rgba(59, 130, 246, 0.5)",
            "0 0 5px 2px rgba(59, 130, 246, 0.3)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
}

export function AnimatedCounter({ value, duration = 2, className = "" }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const startVal = 0;
    const endVal = value;
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * (endVal - startVal) + startVal);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);
  
  return <span className={className} ref={countRef}>{count}</span>;
}

export function ShimmerEffect({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 z-10"
        style={{ skewX: "-20deg" }}
        animate={{ x: ["calc(-100% - 50px)", "calc(100% + 50px)"] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

export function AnimatedBackground() {
  return (
    <>
      <ParticleBackground />
      <FloatingIcons />
    </>
  );
}

export default {
  ParticleBackground,
  FloatingIcons,
  MouseTrailer,
  AnimatedText,
  GlowingButton,
  AnimatedCounter,
  ShimmerEffect,
  AnimatedBackground
};