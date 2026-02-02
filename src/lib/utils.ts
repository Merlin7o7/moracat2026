import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simulate API call for lead form submission
export async function submitLeadForm(data: {
  name: string;
  email: string;
  phone: string;
  numberOfPets: number;
}): Promise<{ success: boolean; message: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate success (in production, this would POST to Google Sheets or backend)
  console.log("Lead form submitted:", data);

  return {
    success: true,
    message: "Thank you for joining our waitlist! We'll be in touch soon.",
  };
}

// Simulate newsletter subscription
export async function subscribeNewsletter(email: string): Promise<{
  success: boolean;
  message: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Newsletter subscription:", email);

  return {
    success: true,
    message: "You've been subscribed to our newsletter!",
  };
}
