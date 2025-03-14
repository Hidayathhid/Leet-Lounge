import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const pcParts = {
  processors: [
    { name: "Core i5-14400F", price: 100, performance: 70 },
    { name: "Core i7-14700F", price: 200, performance: 85 },
    { name: "Core i9-14900K", price: 300, performance: 100 }
  ],
  gpus: [
    { name: "RTX 3060", price: 150, performance: 65 },
    { name: "RTX 3070 Ti", price: 250, performance: 80 },
    { name: "RTX 4090", price: 500, performance: 100 }
  ],
  ram: [
    { name: "16GB DDR5", price: 50, performance: 60 },
    { name: "32GB DDR5", price: 100, performance: 85 },
    { name: "64GB DDR5", price: 200, performance: 100 }
  ],
  monitors: [
    { name: "165Hz Gaming Monitor", price: 120, performance: 70 },
    { name: "240Hz BENQ Monitor", price: 220, performance: 85 },
    { name: "360Hz BENQ Monitor", price: 350, performance: 100 }
  ],
  extras: [
    { name: "Standard Peripherals", price: 0, performance: 50 },
    { name: "Gaming Peripherals", price: 100, performance: 80 },
    { name: "Pro Peripherals + Streaming Kit", price: 300, performance: 100 }
  ]
};

export default function PCConfigurator() {
  const { toast } = useToast();
  const [hours, setHours] = useState(2);
  const [selectedParts, setSelectedParts] = useState({
    processor: pcParts.processors[1],
    gpu: pcParts.gpus[1],
    ram: pcParts.ram[1],
    monitor: pcParts.monitors[0],
    extras: pcParts.extras[0]
  });

  const calculateTotalPrice = () => {
    const partsTotal = Object.values(selectedParts).reduce((total, part) => total + part.price, 0);
    const hourlyRate = 5; // $5 per hour base rate
    return partsTotal / 20 + hourlyRate * hours; // Divide by 20 to convert to hourly premium
  };

  const calculatePerformanceScore = () => {
    const scores = Object.values(selectedParts).map(part => part.performance);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(average);
  };

  const handleBookNow = () => {
    toast({
      title: "PC Configuration Saved!",
      description: "Your custom PC configuration has been saved. Proceed to booking.",
      variant: "default",
    });
  };

  const handlePartChange = (category, part) => {
    setSelectedParts(prev => ({
      ...prev,
      [category]: part
    }));
  };

  return (
    <section id="pc-configurator" className="py-20 bg-gradient-to-b from-background to-background/95 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Interactive <span className="text-blue-500">PC Configurator</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Customize your gaming experience by selecting your preferred hardware specifications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Options */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Processor Selection */}
            <div className="bg-glass p-6 rounded-xl">
              <h3 className="text-xl font-montserrat font-bold mb-4">
                <i className="fas fa-microchip text-blue-500 mr-2"></i> Processor
              </h3>
              <RadioGroup 
                defaultValue={selectedParts.processor.name}
                onValueChange={(value) => {
                  const processor = pcParts.processors.find(p => p.name === value);
                  if (processor) handlePartChange('processor', processor);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pcParts.processors.map((processor) => (
                    <div key={processor.name} className="flex items-start space-x-2">
                      <RadioGroupItem value={processor.name} id={`processor-${processor.name}`} />
                      <div className="grid gap-1.5">
                        <Label htmlFor={`processor-${processor.name}`} className="font-bold">{processor.name}</Label>
                        <p className="text-sm text-gray-400">Performance: {processor.performance}%</p>
                        <p className="text-sm text-blue-500">${processor.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* GPU Selection */}
            <div className="bg-glass p-6 rounded-xl">
              <h3 className="text-xl font-montserrat font-bold mb-4">
                <i className="fas fa-gamepad text-blue-500 mr-2"></i> Graphics Card
              </h3>
              <RadioGroup 
                defaultValue={selectedParts.gpu.name}
                onValueChange={(value) => {
                  const gpu = pcParts.gpus.find(g => g.name === value);
                  if (gpu) handlePartChange('gpu', gpu);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pcParts.gpus.map((gpu) => (
                    <div key={gpu.name} className="flex items-start space-x-2">
                      <RadioGroupItem value={gpu.name} id={`gpu-${gpu.name}`} />
                      <div className="grid gap-1.5">
                        <Label htmlFor={`gpu-${gpu.name}`} className="font-bold">{gpu.name}</Label>
                        <p className="text-sm text-gray-400">Performance: {gpu.performance}%</p>
                        <p className="text-sm text-blue-500">${gpu.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* RAM Selection */}
            <div className="bg-glass p-6 rounded-xl">
              <h3 className="text-xl font-montserrat font-bold mb-4">
                <i className="fas fa-memory text-blue-500 mr-2"></i> Memory (RAM)
              </h3>
              <RadioGroup 
                defaultValue={selectedParts.ram.name}
                onValueChange={(value) => {
                  const ram = pcParts.ram.find(r => r.name === value);
                  if (ram) handlePartChange('ram', ram);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pcParts.ram.map((ram) => (
                    <div key={ram.name} className="flex items-start space-x-2">
                      <RadioGroupItem value={ram.name} id={`ram-${ram.name}`} />
                      <div className="grid gap-1.5">
                        <Label htmlFor={`ram-${ram.name}`} className="font-bold">{ram.name}</Label>
                        <p className="text-sm text-gray-400">Performance: {ram.performance}%</p>
                        <p className="text-sm text-blue-500">${ram.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Monitor Selection */}
            <div className="bg-glass p-6 rounded-xl">
              <h3 className="text-xl font-montserrat font-bold mb-4">
                <i className="fas fa-desktop text-blue-500 mr-2"></i> Monitor
              </h3>
              <RadioGroup 
                defaultValue={selectedParts.monitor.name}
                onValueChange={(value) => {
                  const monitor = pcParts.monitors.find(m => m.name === value);
                  if (monitor) handlePartChange('monitor', monitor);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pcParts.monitors.map((monitor) => (
                    <div key={monitor.name} className="flex items-start space-x-2">
                      <RadioGroupItem value={monitor.name} id={`monitor-${monitor.name}`} />
                      <div className="grid gap-1.5">
                        <Label htmlFor={`monitor-${monitor.name}`} className="font-bold">{monitor.name}</Label>
                        <p className="text-sm text-gray-400">Performance: {monitor.performance}%</p>
                        <p className="text-sm text-blue-500">${monitor.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Extras Selection */}
            <div className="bg-glass p-6 rounded-xl">
              <h3 className="text-xl font-montserrat font-bold mb-4">
                <i className="fas fa-plus-circle text-blue-500 mr-2"></i> Peripherals & Extras
              </h3>
              <RadioGroup 
                defaultValue={selectedParts.extras.name}
                onValueChange={(value) => {
                  const extras = pcParts.extras.find(e => e.name === value);
                  if (extras) handlePartChange('extras', extras);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pcParts.extras.map((extra) => (
                    <div key={extra.name} className="flex items-start space-x-2">
                      <RadioGroupItem value={extra.name} id={`extra-${extra.name}`} />
                      <div className="grid gap-1.5">
                        <Label htmlFor={`extra-${extra.name}`} className="font-bold">{extra.name}</Label>
                        <p className="text-sm text-gray-400">Performance: {extra.performance}%</p>
                        <p className="text-sm text-blue-500">${extra.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Hours Slider */}
            <div className="bg-glass p-6 rounded-xl">
              <h3 className="text-xl font-montserrat font-bold mb-4">
                <i className="fas fa-clock text-blue-500 mr-2"></i> Gaming Hours
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>1 hour</span>
                  <span>{hours} hours</span>
                  <span>8 hours</span>
                </div>
                <Slider
                  defaultValue={[hours]}
                  max={8}
                  min={1}
                  step={1}
                  onValueChange={(value) => setHours(value[0])}
                />
              </div>
            </div>
          </motion.div>

          {/* Configuration Summary */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="sticky top-20">
              <Card className="bg-glass-dark border-blue-500/30 overflow-hidden">
                <div className="bg-blue-500 p-4">
                  <h3 className="text-xl font-montserrat font-bold text-white">Your Configuration</h3>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="text-lg font-bold mb-2">Selected Components</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-400">Processor:</span>
                        <span>{selectedParts.processor.name}</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-400">Graphics Card:</span>
                        <span>{selectedParts.gpu.name}</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-400">Memory:</span>
                        <span>{selectedParts.ram.name}</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-400">Monitor:</span>
                        <span>{selectedParts.monitor.name}</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-400">Extras:</span>
                        <span>{selectedParts.extras.name}</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-400">Hours:</span>
                        <span>{hours} hours</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-bold">Performance</h4>
                      <div className="w-32 bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full" 
                          style={{ width: `${calculatePerformanceScore()}%` }} 
                        />
                      </div>
                      <span className="font-bold">{calculatePerformanceScore()}%</span>
                    </div>
                    
                    <div className="mt-4 flex justify-between text-xl font-bold">
                      <span>Total Price:</span>
                      <span className="text-blue-500">${calculateTotalPrice().toFixed(2)}/hour</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">For {hours} hours: ${(calculateTotalPrice() * hours).toFixed(2)}</p>
                  </div>

                  <Button 
                    onClick={handleBookNow}
                    className="w-full bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-lg font-bold mt-4 flex justify-center items-center gap-2"
                  >
                    <i className="fas fa-save"></i>
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}