"use client";

import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui";

const products = [
  {
    id: 1,
    name: "Royal Salmon Feast",
    description: "Wild-caught salmon with essential omega-3 for a shiny coat",
    price: 89,
    rating: 4.9,
    image: "🐟",
    tag: "Best Seller",
    tagColor: "var(--brand-orange)",
  },
  {
    id: 2,
    name: "Premium Chicken Delight",
    description: "Free-range chicken with vegetables for complete nutrition",
    price: 79,
    rating: 4.8,
    image: "🍗",
    tag: "Popular",
    tagColor: "var(--brand-green)",
  },
  {
    id: 3,
    name: "Gourmet Tuna Mix",
    description: "Premium tuna blend with added vitamins and minerals",
    price: 85,
    rating: 4.7,
    image: "🐠",
    tag: null,
    tagColor: null,
  },
  {
    id: 4,
    name: "Lamb & Rice Formula",
    description: "Gentle on sensitive stomachs with premium lamb protein",
    price: 95,
    rating: 4.9,
    image: "🍖",
    tag: "Premium",
    tagColor: "var(--brand-pink)",
  },
  {
    id: 5,
    name: "Kitten Starter Pack",
    description: "Specially formulated for growing kittens up to 12 months",
    price: 75,
    rating: 4.8,
    image: "🐱",
    tag: "For Kittens",
    tagColor: "var(--brand-orange)",
  },
  {
    id: 6,
    name: "Senior Care Blend",
    description: "Tailored nutrition for cats 7+ years with joint support",
    price: 92,
    rating: 4.7,
    image: "👴",
    tag: "Senior",
    tagColor: "var(--brand-green)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Products() {
  return (
    <section id="products" className="py-20 md:py-32">
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
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            Premium Cat Food Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Carefully crafted recipes using only the finest ingredients.
            Each product is designed to provide complete, balanced nutrition.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-[var(--brand-beige)] to-white flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </span>

                {/* Tag */}
                {product.tag && (
                  <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: product.tagColor || undefined }}
                  >
                    {product.tag}
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[var(--brand-pink)] hover:text-white transition-colors duration-300"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-[var(--brand-orange)] text-[var(--brand-orange)]" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>

                {/* Name & Description */}
                <h3 className="text-lg font-bold text-[var(--brand-green)] mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[var(--brand-green)]">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">SAR</span>
                  </div>
                  <Button variant="secondary" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
