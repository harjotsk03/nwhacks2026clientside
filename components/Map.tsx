"use client";

import React from "react";
import { Briefcase, CandyCane, Check, Coffee, GraduationCap, Loader2, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import PegLogo from "../app/Perugia-Logo.png";

const mapPos = (val: number) => `${((val + 50) / 100) * 100}%`;

type CustomerType = "student" | "middle-aged" | "elderly";

interface Customer {
  id: number;
  x: number;
  y: number;
  status: string;
  type: CustomerType;
}

interface MapProps {
  customers: Customer[];
  isSimulating: boolean;
}

const typeIcons: Record<CustomerType, React.ReactNode> = {
  student: <GraduationCap className="w-4 h-4 text-white" />,
  "middle-aged": <Briefcase className="w-4 h-4 text-white" />,
  elderly: <CandyCane className="w-4 h-4 text-white" />,
};

const Map = ({ customers, isSimulating }: MapProps) => {
  const shops = [
    { id: 1, name: "Starbucks - UBC Village", x: -30, y: 25 },
    { id: 2, name: "Tim Hortons - Wesbrook Mall", x: -40, y: -20 },
    { id: 3, name: "Blusson Spinal Cord Café", x: 35, y: 15 },
    { id: 4, name: "Trees Organic Coffee", x: 20, y: -35 },
  ];

  return (
    <Card className="relative w-full aspect-square h-120 overflow-hidden bg-white border">
      {/* Status Indicators */}
      <div className="absolute top-4 left-4 z-50">
        <AnimatePresence mode="wait">
          {isSimulating ? (
            <motion.div
              key="simulating"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex text-xs items-center gap-2 bg-orange-400/10 border border-orange-500 text-orange-600 px-3 py-1.5 rounded-lg backdrop-blur-md"
            >
              <Loader2 className="h-3 w-3 animate-spin" /> Agents are
              deciding...
            </motion.div>
          ) : customers.length >= 20 ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex text-xs items-center gap-2 bg-green-400/10 border border-green-500 text-green-600 px-3 py-1.5 rounded-lg backdrop-blur-md"
            >
              <Check className="h-3 w-3" /> Agents have made up their minds
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
        {/* Main Store (0,0) */}
        <div
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
        >
          <div className="bg-stone-300 w-16 h-16 flex items-center justify-center rounded-xl border-2 border-white">
            <Image
              src={PegLogo}
              alt="Logo"
              width={50}
              height={50}
              className="rounded-md"
            />
          </div>
          <span className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-sm text-stone-800">
            Perugia Italian Caffè
          </span>
        </div>

        {/* Other Shops */}
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: mapPos(shop.x), top: mapPos(shop.y) }}
          >
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <Coffee className="text-slate-600 w-4 h-4" />
            </div>
            <span className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-slate-400">
              {shop.name}
            </span>
          </div>
        ))}

        {/* Customer Dots */}
        <TooltipProvider>
          <AnimatePresence>
            {customers.map((customer) => (
              <Tooltip key={customer.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{
                      left: mapPos(customer.x),
                      top: mapPos(customer.y),
                    }}
                    // Added 'flex items-center justify-center' to center the icon
                    className={`absolute z-50 w-8 h-8 rounded-full border-2 border-white cursor-pointer flex items-center justify-center ${customer.status}`}
                  >
                    {/* Render the icon based on the customer type */}
                    {typeIcons[customer.type]}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    <p className="font-bold">Agent ID: {customer.id}</p>
                    <p className="capitalize text-stone-400">{customer.type}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </AnimatePresence>
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default Map;
