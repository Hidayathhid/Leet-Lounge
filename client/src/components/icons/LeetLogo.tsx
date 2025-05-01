interface LeetLogoProps {
  size?: number;
  className?: string;
}

export default function LeetLogo({ size = 70, className = "" }: LeetLogoProps) {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        // src="/images/Leet.png"
        src="/images/Let.png" 
        alt="LEET Gaming Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
