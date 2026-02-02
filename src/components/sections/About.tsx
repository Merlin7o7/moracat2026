"use client";

import { motion } from "framer-motion";
import { Heart, Award, Users, Leaf } from "lucide-react";

const stats = [
  { icon: Heart, value: "10K+", label: "Happy Cats" },
  { icon: Users, value: "5K+", label: "Cat Parents" },
  { icon: Award, value: "100%", label: "Natural Ingredients" },
  { icon: Leaf, value: "0%", label: "Artificial Additives" },
];

const values = [
  {
    title: "Saudi Quality Standards",
    description:
      "We source our ingredients locally and internationally, meeting the highest Saudi food safety regulations.",
  },
  {
    title: "Vet-Formulated Recipes",
    description:
      "Every recipe is developed in collaboration with veterinary nutritionists for optimal feline health.",
  },
  {
    title: "Sustainable Practices",
    description:
      "From eco-friendly packaging to responsible sourcing, we care for the environment as much as your cats.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[var(--brand-orange)] font-semibold mb-3">
              About Moracat
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-6">
              Born in Saudi Arabia,{" "}
              <span className="text-[var(--brand-orange)]">Made for Cats</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Moracat (مرقط) was founded with a simple mission: to provide
              Saudi cat parents with premium, nutritious food that their feline
              companions truly deserve. We believe every cat is royalty, and
              their diet should reflect that.
            </p>
            <p className="text-gray-600 mb-8">
              Our journey began in Riyadh when our founders, passionate cat
              lovers themselves, couldn&apos;t find cat food that met their high
              standards. Today, we serve thousands of happy cats across the
              Kingdom, delivering gourmet nutrition right to their bowls.
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[var(--brand-orange)]" />
                  <div>
                    <h4 className="font-semibold text-[var(--brand-green)] mb-1">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--brand-beige)] flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-[var(--brand-green)]" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-[var(--brand-green)]">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[var(--brand-green)] rounded-3xl p-8 text-white text-center"
            >
              <div className="text-4xl mb-4">🇸🇦</div>
              <h4 className="text-xl font-bold mb-2">Proudly Saudi</h4>
              <p className="text-white/80 text-sm">
                Supporting local businesses and delivering across all regions of
                the Kingdom - from Riyadh to Jeddah, Dammam to Abha.
              </p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <span className="text-2xl font-bold">مرقط</span>
                <p className="text-white/60 text-xs mt-1">
                  &quot;Spotted&quot; - Like the beautiful patterns on every cat
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
