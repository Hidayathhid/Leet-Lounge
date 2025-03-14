interface LeetLogoProps {
  size?: number;
  className?: string;
}

export default function LeetLogo({ size = 40, className = "" }: LeetLogoProps) {
  return (
    <div 
      className={`rounded-full bg-blue-500 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-montserrat font-bold" style={{ fontSize: size * 0.5 }}>L</span>
    </div>
  );
}
