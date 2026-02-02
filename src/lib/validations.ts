import { z } from "zod";

// KSA phone number regex - supports formats like +966XXXXXXXXX, 05XXXXXXXX, etc.
const ksaPhoneRegex = /^(\+966|966|05|5)[0-9]{8}$/;

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(ksaPhoneRegex, "Please enter a valid KSA phone number (e.g., 05XXXXXXXX)"),
  numberOfPets: z
    .number()
    .min(1, "You must have at least 1 cat")
    .max(20, "Maximum 20 cats allowed"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
