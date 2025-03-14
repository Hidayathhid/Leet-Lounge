import { motion } from "framer-motion";

interface PCSpecsProps {
  specs: {
    processor: string;
    monitor: string;
    ram: string;
    gpu: string;
    extras?: string;
  };
  className?: string;
}

export default function PCSpecs({ specs, className = "" }: PCSpecsProps) {
  return (
    <motion.div 
      className={`bg-background/50 p-3 rounded-lg ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <p className="text-sm font-medium text-gray-300">
        <i className="fas fa-microchip text-blue-500 mr-2"></i> {specs.processor}
      </p>
      <p className="text-sm font-medium text-gray-300">
        <i className="fas fa-desktop text-blue-500 mr-2"></i> {specs.monitor}
      </p>
      <p className="text-sm font-medium text-gray-300">
        <i className="fas fa-memory text-blue-500 mr-2"></i> {specs.ram}
      </p>
      <p className="text-sm font-medium text-gray-300">
        <i className="fas fa-gamepad text-blue-500 mr-2"></i> {specs.gpu}
      </p>
      {specs.extras && (
        <p className="text-sm font-medium text-gray-300">
          <i className="fas fa-microphone text-blue-500 mr-2"></i> {specs.extras}
        </p>
      )}
    </motion.div>
  );
}
