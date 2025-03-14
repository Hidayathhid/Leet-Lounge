import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0.1 
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView 
        ? { opacity: 1, y: 0 } 
        : { opacity: 0, y: 30 }
      }
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
