import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Schema for login
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

// Schema for registration
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

interface AdminAuthProps {
  onAuthenticated: (user: any) => void;
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const { toast } = useToast();
  const [tab, setTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  
  // Registration form
  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: ""
    }
  });
  
  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/auth/login", {
        body: JSON.stringify({
          username: data.username,
          password: data.password
        })
      });
      
      if (response.success) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
          variant: "default",
        });
        onAuthenticated(response.user);
      } else {
        toast({
          title: "Login failed",
          description: response.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "Failed to connect to the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/auth/register", {
        body: JSON.stringify({
          username: data.username,
          password: data.password
        })
      });
      
      if (response.success) {
        toast({
          title: "Registration successful",
          description: "You can now log in with your credentials",
          variant: "default",
        });
        setTab("login");
        loginForm.setValue("username", data.username);
      } else {
        toast({
          title: "Registration failed",
          description: response.message || "Username may already be taken",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration error",
        description: "Failed to connect to the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  function onLoginSubmit(data: LoginForm) {
    handleLogin(data);
  }
  
  function onRegisterSubmit(data: RegisterForm) {
    handleRegister(data);
  }
  
  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-background/90 flex items-center justify-center px-4 py-12">
      <motion.div 
        className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Info Section */}
        <div className="p-6 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              LEET <span className="text-blue-500">Gaming</span> Lounge
            </h1>
            <h2 className="text-2xl font-semibold mb-6">Admin Portal</h2>
            
            <div className="space-y-6 text-gray-400">
              <p>Welcome to the administrative interface for LEET Gaming Lounge. This secured area allows staff to:</p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Monitor real-time station usage and availability</li>
                <li>Manage bookings and reservations</li>
                <li>View analytics and reports</li>
                <li>Update system configuration</li>
              </ul>
              
              <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg mt-8">
                <h3 className="font-semibold text-white mb-2">📌 Staff Note</h3>
                <p className="text-sm">
                  For demo, use username: <span className="font-mono bg-gray-800 px-1 rounded">admin</span> and 
                  password: <span className="font-mono bg-gray-800 px-1 rounded">leet123</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Auth Form */}
        <div className="order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-blue-800/30 bg-black/50 backdrop-blur shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Admin Authentication</CardTitle>
                <CardDescription>
                  Login to access the admin dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  
                  {/* Login Form */}
                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-blue-600 hover:bg-blue-500"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center">
                              <i className="fas fa-circle-notch fa-spin mr-2"></i>
                              Logging in...
                            </span>
                          ) : "Login"}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  {/* Registration Form */}
                  <TabsContent value="register">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Choose a username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Create a password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Confirm your password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-blue-600 hover:bg-blue-500"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center">
                              <i className="fas fa-circle-notch fa-spin mr-2"></i>
                              Registering...
                            </span>
                          ) : "Register"}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
                <p className="text-sm text-gray-400">
                  {tab === "login" ? (
                    <>Don't have an account? <button onClick={() => setTab("register")} className="text-blue-400 hover:underline">Register</button></>
                  ) : (
                    <>Already have an account? <button onClick={() => setTab("login")} className="text-blue-400 hover:underline">Login</button></>
                  )}
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}