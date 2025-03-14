import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { z } from "zod";

// Create contact form schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please provide a valid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}
