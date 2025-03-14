import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertBookingSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { lounges } from "@/lib/data";

// Extend the schema with additional validations
const bookingFormSchema = insertBookingSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional(),
  date: z.date({ required_error: "Please select a date." }),
  time: z.string().min(1, { message: "Please select a time." }),
  loungeType: z.string({
    required_error: "Please select a lounge type.",
  }),
  hours: z.number().min(1, { message: "Minimum booking is 1 hour." }).max(12, { message: "Maximum booking is 12 hours." }),
  people: z.number().min(1, { message: "Must have at least 1 person." }).max(10, { message: "Maximum 10 people per booking." }),
  message: z.string().optional(),
  savedConfig: z.boolean().optional(),
});

// For time slots display
const timeSlots = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
  "22:00", "23:00", "00:00", "01:00"
];

export default function BookingSystem() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Setup form with zod validation
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      loungeType: "",
      hours: 2,
      people: 1,
      message: "",
      savedConfig: false,
    },
  });

  // Simulated availability query (in a real app, this would fetch from API)
  const { data: availability } = useQuery({
    queryKey: ["availability", selectedDate ? format(selectedDate, "yyyy-MM-dd") : "none"],
    queryFn: async () => {
      // Simulate API call with 500ms delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate "realistic" availability based on date and time
      // In a real app, this would be fetched from the server
      const availabilityMap = {};
      
      timeSlots.forEach(time => {
        const randomStations = Math.floor(Math.random() * 5) + 5; // 5-10 stations available
        availabilityMap[time] = {
          nonSmoking: Math.floor(Math.random() * 5), // 0-4 stations
          smoking: Math.floor(Math.random() * 5),    // 0-4 stations 
          playstation: Math.floor(Math.random() * 3), // 0-2 stations
          vip: Math.floor(Math.random() * 2),        // 0-1 stations
        };
      });
      
      return availabilityMap;
    },
    enabled: !!selectedDate,
  });

  // Create booking mutation
  const bookingMutation = useMutation({
    mutationFn: async (data: z.infer<typeof bookingFormSchema>) => {
      // Convert form data to match the API expectations
      const bookingData = {
        ...data,
        date: new Date(`${format(data.date, "yyyy-MM-dd")}T${data.time}`),
      };
      
      return apiRequest("/api/bookings", {
        method: "POST",
        body: JSON.stringify(bookingData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({
        title: "Booking Successful!",
        description: "Your gaming session has been booked. Check your email for confirmation.",
        variant: "default",
      });
      form.reset();
      setStep(1);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  function onSubmit(data: z.infer<typeof bookingFormSchema>) {
    // If we're on step 1, proceed to step 2
    if (step === 1) {
      setStep(2);
      return;
    }
    
    // On step 2, submit the booking
    const combinedData = {
      ...data,
      time: selectedTime,
    };
    
    bookingMutation.mutate(combinedData);
  }

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-background/95 to-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Book Your <span className="text-blue-500">Gaming Session</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Reserve your spot at LEET Gaming Lounge and experience premium gaming with friends.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-glass rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Step Indicator */}
            <div className="bg-blue-500 p-4">
              <div className="flex justify-center items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 1 ? 'bg-blue-800 text-white' : 'bg-white text-blue-800'} font-bold`}>
                  1
                </div>
                <div className="w-16 h-1 bg-white/30 rounded-full">
                  <div className={`h-full bg-white rounded-full ${step === 2 ? 'w-full' : 'w-0'} transition-all duration-300`}></div>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'bg-blue-800 text-white' : 'bg-white/30 text-blue-900/30'} font-bold`}>
                  2
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-montserrat font-bold">Personal Details</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} className="bg-background/40" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email" type="email" {...field} className="bg-background/40" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} className="bg-background/40" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="people"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of People</FormLabel>
                              <Select 
                                onValueChange={(value) => field.onChange(parseInt(value))}
                                defaultValue={field.value.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-background/40">
                                    <SelectValue placeholder="Select number of people" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num} {num === 1 ? 'person' : 'people'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests (optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any special requests or requirements?" 
                                className="resize-none bg-background/40"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="savedConfig"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-blue-500/30 p-4">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="form-checkbox h-5 w-5 text-blue-500 rounded"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Use my saved PC configuration</FormLabel>
                              <p className="text-sm text-gray-400">
                                Apply the PC configuration you customized earlier
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-montserrat font-bold">Booking Details</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "pl-3 text-left font-normal bg-background/40",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <i className="fas fa-calendar-alt ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                      field.onChange(date);
                                      setSelectedDate(date);
                                      setSelectedTime("");
                                    }}
                                    disabled={(date) => {
                                      // Can't book in the past
                                      return date < new Date(new Date().setHours(0, 0, 0, 0));
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hours"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration (hours)</FormLabel>
                              <Select 
                                onValueChange={(value) => field.onChange(parseInt(value))}
                                defaultValue={field.value.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-background/40">
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(hours => (
                                    <SelectItem key={hours} value={hours.toString()}>
                                      {hours} {hours === 1 ? 'hour' : 'hours'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="loungeType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Select Lounge Type</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                              >
                                {lounges.map((lounge, index) => (
                                  <FormItem key={index} className="flex flex-col items-center space-y-2">
                                    <FormControl>
                                      <RadioGroupItem
                                        value={lounge.name}
                                        id={`lounge-${index}`}
                                        className="sr-only"
                                      />
                                    </FormControl>
                                    <label
                                      htmlFor={`lounge-${index}`}
                                      className={`w-full flex flex-col items-center px-4 py-3 rounded-lg cursor-pointer ${
                                        field.value === lounge.name
                                          ? "bg-blue-500 text-white"
                                          : "bg-background/50 hover:bg-blue-500/20"
                                      }`}
                                    >
                                      <i className={`${lounge.icon} text-2xl mb-2 ${
                                        field.value === lounge.name ? "text-white" : lounge.iconColor
                                      }`}></i>
                                      <FormLabel className="cursor-pointer font-bold">
                                        {lounge.name}
                                      </FormLabel>
                                    </label>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-3">
                        <FormLabel>Select Time</FormLabel>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                          {timeSlots.map((time) => {
                            const isAvailable = availability && availability[time] && 
                              (form.getValues("loungeType") === "PlayStation Lounge" ? availability[time].playstation > 0 :
                              form.getValues("loungeType") === "Smoking Lounge" ? availability[time].smoking > 0 :
                              form.getValues("loungeType") === "Non-Smoking Lounge" ? availability[time].nonSmoking > 0 :
                              form.getValues("loungeType") === "VIP & Streaming" ? availability[time].vip > 0 : false);
                            
                            return (
                              <button
                                key={time}
                                type="button"
                                disabled={!isAvailable}
                                onClick={() => {
                                  setSelectedTime(time);
                                  form.setValue("time", time);
                                }}
                                className={`py-2 rounded-md text-sm ${
                                  selectedTime === time
                                    ? "bg-blue-500 text-white"
                                    : isAvailable
                                    ? "bg-background/50 hover:bg-blue-500/20"
                                    : "bg-gray-800/30 text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                {time}
                                {availability && (
                                  <div className="text-xs mt-1">
                                    {form.getValues("loungeType") === "PlayStation Lounge" && availability[time]
                                      ? `${availability[time].playstation} left`
                                      : form.getValues("loungeType") === "Smoking Lounge" && availability[time]
                                      ? `${availability[time].smoking} left`
                                      : form.getValues("loungeType") === "Non-Smoking Lounge" && availability[time]
                                      ? `${availability[time].nonSmoking} left`
                                      : form.getValues("loungeType") === "VIP & Streaming" && availability[time]
                                      ? `${availability[time].vip} left`
                                      : "0 left"}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {form.formState.errors.time && (
                          <p className="text-red-500 text-sm mt-1">Please select a time slot</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4 mt-6 border-t border-gray-700">
                    {step === 2 && (
                      <Button 
                        type="button" 
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="bg-background/40"
                      >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back
                      </Button>
                    )}
                    <Button 
                      type="submit"
                      className={`${step === 1 ? 'ml-auto' : ''} bg-blue-500 hover:bg-blue-400 px-6`}
                      disabled={bookingMutation.isPending}
                    >
                      {bookingMutation.isPending ? (
                        <span className="flex items-center">
                          <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
                        </span>
                      ) : step === 1 ? (
                        <span className="flex items-center">
                          Continue <i className="fas fa-arrow-right ml-2"></i>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Complete Booking <i className="fas fa-check ml-2"></i>
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}