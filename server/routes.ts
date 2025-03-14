import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { z } from "zod";
import { insertBookingSchema, insertContactSchema } from "@shared/schema";

// Create contact form schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please provide a valid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

// Session User Type
interface SessionUser {
  id: number;
  username: string;
}

// Declare session with user property
declare module 'express-session' {
  interface SessionData {
    user?: SessionUser;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication Middleware
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
  };

  // Contact form handling
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate form data
      const validData = contactSchema.parse(req.body);
      
      // Configure transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || "default_email",
          pass: process.env.EMAIL_PASS || "default_password"
        }
      });
      
      // Email content
      const emailContent = {
        from: `"LEET Gaming Contact Form" <${process.env.EMAIL_USER || "noreply@leetgaming.com"}>`,
        to: "info@leetgaming.com",
        subject: `Contact Form: ${validData.subject}`,
        text: `
          Name: ${validData.name}
          Email: ${validData.email}
          
          Message:
          ${validData.message}
        `,
        html: `
          <h3>New contact form submission</h3>
          <p><strong>Name:</strong> ${validData.name}</p>
          <p><strong>Email:</strong> ${validData.email}</p>
          <p><strong>Subject:</strong> ${validData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validData.message.replace(/\n/g, '<br>')}</p>
        `
      };
      
      // Only attempt to send in production
      if (process.env.NODE_ENV === "production") {
        await transporter.sendMail(emailContent);
      } else {
        console.log("Email would be sent in production:", emailContent);
      }
      
      res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ success: false, message: "Failed to send message" });
    }
  });

  // Booking system routes
  app.post('/api/bookings', async (req, res) => {
    try {
      // Validate booking data
      const bookingData = insertBookingSchema.parse(req.body);
      
      // In a real app, this would save to the database
      // For now, we'll just return success
      res.status(200).json({ 
        success: true, 
        message: "Booking created successfully",
        booking: {
          id: Math.floor(Math.random() * 1000) + 1,
          ...bookingData,
          status: "pending",
          createdAt: new Date()
        }
      });
    } catch (error) {
      console.error("Booking error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ success: false, message: "Failed to create booking" });
    }
  });

  // Get all bookings (admin only)
  app.get('/api/bookings', requireAuth, (req, res) => {
    // In a real app, this would fetch from database
    // For demo, return mock data
    const mockBookings = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        loungeType: "VIP & Streaming",
        date: new Date().toISOString(),
        hours: 3,
        people: 2,
        message: "Looking forward to streaming!",
        status: "confirmed",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        loungeType: "Non-Smoking Lounge",
        date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        hours: 2,
        people: 4,
        message: "Birthday celebration",
        status: "pending",
        createdAt: new Date().toISOString()
      }
    ];
    
    res.status(200).json(mockBookings);
  });

  // Authentication Routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // In a real app, validate credentials against database
      // For demo purposes
      if (username === "admin" && password === "leet123") {
        const user = { id: 1, username: "admin" };
        req.session.user = user;
        
        return res.status(200).json({
          success: true,
          message: "Login successful",
          user
        });
      }
      
      res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Login failed" });
    }
  });
  
  app.post('/api/auth/register', async (req, res) => {
    try {
      // In a real app, this would call storage.createUser
      // For demo, just validate and return success
      
      // Example only - actual implementation would store in database
      res.status(200).json({
        success: true,
        message: "Registration successful",
        user: { id: 2, username: req.body.username }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, message: "Registration failed" });
    }
  });
  
  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
      
      res.status(200).json({ success: true, message: "Logged out successfully" });
    });
  });
  
  app.get('/api/auth/status', (req, res) => {
    if (req.session.user) {
      return res.status(200).json({
        authenticated: true,
        user: req.session.user
      });
    }
    
    res.status(200).json({ authenticated: false });
  });

  // Stations Availability API (simulated)
  app.get('/api/stations', requireAuth, (req, res) => {
    // In a real app, this would be fetched from a database
    // For demo, we'll return simulated data
    res.status(200).json({
      success: true,
      message: "Station data retrieved successfully",
      // Data would be returned here in a real implementation
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
