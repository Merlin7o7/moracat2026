"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  Package,
  CreditCard,
  Truck,
  Settings,
  LogOut,
  Cat,
  Bell,
  ShoppingBag,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface DashboardContentProps {
  user: User;
}

const quickActions = [
  {
    icon: Package,
    title: "Current Subscription",
    description: "Quarterly Plan - Active",
    href: "/dashboard/subscription",
    color: "var(--brand-green)",
  },
  {
    icon: Truck,
    title: "Next Delivery",
    description: "Feb 15, 2026",
    href: "/dashboard/deliveries",
    color: "var(--brand-orange)",
  },
  {
    icon: ShoppingBag,
    title: "Order History",
    description: "View past orders",
    href: "/dashboard/orders",
    color: "var(--brand-pink)",
  },
  {
    icon: CreditCard,
    title: "Payment Methods",
    description: "Manage billing",
    href: "/dashboard/billing",
    color: "var(--brand-green)",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    date: "Jan 15, 2026",
    status: "Delivered",
    total: 269,
  },
  {
    id: "ORD-002",
    date: "Dec 15, 2025",
    status: "Delivered",
    total: 269,
  },
];

export function DashboardContent({ user }: DashboardContentProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-[var(--brand-beige)]">
      {/* Dashboard Header */}
      <header className="bg-[var(--brand-green)] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[var(--brand-green)] font-bold text-lg">
                    M
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">Moracat</span>
                  <span className="text-xs text-white/70">مرقط</span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--brand-orange)] rounded-full" />
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[var(--brand-green)] mb-2">
            Welcome back, {user.name?.split(" ")[0] || "Cat Parent"}!
          </h1>
          <p className="text-gray-600">
            Manage your subscription and keep your cats happy.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <Cat className="w-8 h-8 text-[var(--brand-orange)] mb-3" />
            <p className="text-2xl font-bold text-[var(--brand-green)]">2</p>
            <p className="text-gray-600 text-sm">Happy Cats</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <Package className="w-8 h-8 text-[var(--brand-green)] mb-3" />
            <p className="text-2xl font-bold text-[var(--brand-green)]">6</p>
            <p className="text-gray-600 text-sm">Deliveries</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <Calendar className="w-8 h-8 text-[var(--brand-pink)] mb-3" />
            <p className="text-2xl font-bold text-[var(--brand-green)]">8</p>
            <p className="text-gray-600 text-sm">Months Active</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <CreditCard className="w-8 h-8 text-[var(--brand-orange)] mb-3" />
            <p className="text-2xl font-bold text-[var(--brand-green)]">269</p>
            <p className="text-gray-600 text-sm">SAR/month</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-bold text-[var(--brand-green)] mb-4">
              Quick Actions
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${action.color}20` }}
                      >
                        <action.icon
                          className="w-6 h-6"
                          style={{ color: action.color }}
                        />
                      </div>
                      <h3 className="font-semibold text-[var(--brand-green)] mb-1">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {action.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[var(--brand-orange)] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-[var(--brand-green)] mb-4">
              Recent Orders
            </h2>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {recentOrders.map((order, index) => (
                <div
                  key={order.id}
                  className={`p-4 flex items-center justify-between ${
                    index !== recentOrders.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div>
                    <p className="font-medium text-[var(--brand-green)]">
                      {order.id}
                    </p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.total} SAR</p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
              <div className="p-4 bg-gray-50">
                <Link
                  href="/dashboard/orders"
                  className="text-[var(--brand-orange)] font-medium text-sm hover:underline"
                >
                  View all orders
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[var(--brand-beige)] rounded-full flex items-center justify-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-[var(--brand-green)]">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-[var(--brand-green)]">
                  {user.name || "Cat Parent"}
                </h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/dashboard/settings")}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
