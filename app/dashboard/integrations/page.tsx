"use client";

import React, { useState } from "react";
import {
  Store,
  Package,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Zap,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: "POS" | "E-Commerce" | "Inventory" | "Analytics";
  status: "connected" | "disconnected" | "error";
}

const integrationList: Integration[] = [
  {
    id: "shopify",
    name: "Shopify",
    description:
      "Sync online orders and customer profiles directly to the agent matrix.",
    icon: <ShoppingBag className="h-6 w-6 text-green-600" />,
    category: "E-Commerce",
    status: "connected",
  },
  {
    id: "square",
    name: "Square POS",
    description: "Real-time transaction tracking for in-store coffee sales.",
    icon: <CreditCard className="h-6 w-6 text-orange-500" />,
    category: "POS",
    status: "connected",
  },
  {
    id: "inventory-pro",
    name: "Inventory Tracker",
    description:
      "Monitor bean stock levels and trigger automated restock alerts.",
    icon: <Package className="h-6 w-6 text-amber-600" />,
    category: "Inventory",
    status: "disconnected",
  },
  {
    id: "clover",
    name: "Clover",
    description:
      "Connect hardware terminals for high-volume morning rush data.",
    icon: <Store className="h-6 w-6 text-green-500" />,
    category: "POS",
    status: "disconnected",
  },
  {
    id: "meta-ads",
    name: "Meta Analytics",
    description: "Track how social media spend converts to foot traffic.",
    icon: <BarChart3 className="h-6 w-6 text-orange-700" />,
    category: "Analytics",
    status: "error",
  },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(integrationList);

  const toggleStatus = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === "connected" ? "disconnected" : "connected",
          };
        }
        return item;
      }),
    );
  };

  return (
    <div className="w-full h-screen bg-slate-50 relative overflow-hidden flex flex-col font-sans">
      {/* Background Grid Pattern (Matching NodePanel) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Header */}
      <div className="w-full h-16 border-b border-stone-200 bg-white fixed z-50"></div>

      {/* Content */}
      <div className="flex-1 relative overflow-scroll z-10 pt-16">
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((item) => (
              <Card
                key={item.id}
                className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      {item.icon}
                    </div>
                    <Badge
                      variant={
                        item.status === "connected" ? "default" : "secondary"
                      }
                      className={`
                        ${item.status === "connected" && "bg-green-500 hover:bg-green-600"}
                        ${item.status === "error" && "bg-destructive text-white"}
                        text-[10px] uppercase tracking-wider
                      `}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    {item.category}
                  </div>
                </CardContent>

                <Separator className="bg-slate-100" />

                <CardFooter className="py-4 flex justify-between items-center bg-slate-50/50">
                  <span className="text-sm font-medium text-slate-600">
                    {item.status === "connected"
                      ? "Syncing data"
                      : "Connection paused"}
                  </span>
                  <Switch
                    checked={item.status === "connected"}
                    onCheckedChange={() => toggleStatus(item.id)}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Connection Status Summary */}
          <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm font-bold text-slate-700">
                  2 Active Connections
                </span>
              </div>
              <div className="flex items-center gap-2 border-l pl-6 border-slate-200">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-bold text-slate-700">
                  1 Sync Error
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 italic font-medium">
              Last system sync: Just now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
