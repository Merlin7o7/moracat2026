"use client";

import { motion } from "framer-motion";
import { Sparkles, Package, Truck } from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    number: "01",
    title: "Personalize",
    description:
      "Tell us about your cat's age, breed, preferences, and dietary needs. We'll create a custom nutrition plan just for them.",
    color: "var(--brand-orange)",
  },
  {
    icon: Package,
    number: "02",
    title: "Choose Plan",
    description:
      "Select from our flexible subscription plans - monthly, quarterly, or annual. Save more with longer commitments.",
    color: "var(--brand-green)",
  },
  {
    icon: Truck,
    number: "03",
    title: "Fast Delivery",
    description:
      "Fresh, premium cat food delivered right to your door across KSA. Free shipping on all subscription orders.",
    color: "var(--brand-pink)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[var(--brand-orange)] font-semibold mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Getting premium cat food delivered to your door is as easy as 1, 2, 3.
            We handle the rest so you can focus on what matters - your cat!
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-1 bg-gradient-to-r from-[var(--brand-orange)] via-[var(--brand-green)] to-[var(--brand-pink)] opacity-20" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative text-center"
            >
              {/* Step Card */}
              <div className="bg-[var(--brand-beige)] rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300">
                {/* Icon Container */}
                <div className="relative mx-auto w-20 h-20 mb-6">
                  <div
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{ backgroundColor: step.color }}
                  />
                  <div
                    className="absolute inset-2 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span
                      className="text-sm font-bold"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[var(--brand-green)] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {/* Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-400 transform rotate-90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
