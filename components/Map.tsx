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
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";


const mapPos = (val: number) => `${((val + 50) / 100) * 100}%`;

type CustomerType = "student" | "middle-aged" | "elderly";

interface Customer {
  personaId: number;
  personaName: string;
  archetype: string;
  decision: "Buy" | "Skip" | "Switch";
  reasoning: string;
  emotion: string;
  pricePerception: string;
  position: {
    x: number;
    y: number;
  };
  context: {
    mood: string;
    budgetRemaining: number;
    trust: number;
  };
  personaDetails?: {
    backstory: string;
    quirks: string;
    stats: {
      priceSensitivity: number;
      brandLoyalty: number;
      socialInfluence: number;
      qualityFocus: number;
    };
  };
  error?: boolean;
}

interface MapProps {
  customers: Customer[];
  isSimulating: boolean;
}

// const typeIcons: Record<CustomerType, React.ReactNode> = {
//   student: <GraduationCap className="w-4 h-4 text-white" />,
//   "middle-aged": <Briefcase className="w-4 h-4 text-white" />,
//   elderly: <CandyCane className="w-4 h-4 text-white" />,
// };

const Map = ({ customers, isSimulating }: MapProps) => {
  const shops = [
    { id: 1, name: "Starbucks - UBC Village", x: -30, y: 25 },
    { id: 2, name: "Tim Hortons - Wesbrook Mall", x: -40, y: -20 },
    { id: 3, name: "Blusson Spinal Cord Café", x: 35, y: 15 },
    { id: 4, name: "Trees Organic Coffee", x: 20, y: -35 },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
              <span className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-wrap text-center text-xs font-semibold text-slate-400">
                {shop.name}
              </span>
            </div>
          ))}

          {/* Customer Dots */}
          <TooltipProvider>
            <AnimatePresence>
              {customers.map((customer) => (
                <Tooltip key={customer.personaId}>
                  <TooltipTrigger
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setSheetOpen(true);
                    }}
                    asChild
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      style={{
                        left: mapPos(customer.position.x),
                        top: mapPos(customer.position.y),
                      }}
                      // Added 'flex items-center justify-center' to center the icon
                      className={`absolute z-50 w-5 h-5 rounded-full border-2 border-white cursor-pointer flex items-center justify-center ${
                        customer.decision === "Buy"
                          ? "bg-green-600"
                          : customer.decision === "Skip"
                            ? "bg-orange-500"
                            : "bg-red-500"
                      }`}
                    >
                      {/* Render the icon based on the customer type */}
                      {/* {typeIcons[customer.archetype]} */}
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs">
                      <p className="font-bold">{customer.personaName}</p>
                      <p className="capitalize text-stone-400">
                        {customer.archetype}
                      </p>
                      <p className="capitalize text-white">
                        Click to view more
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </AnimatePresence>
          </TooltipProvider>
        </div>
      </Card>
      <SheetContent
        side="right"
        className="w-[420px] sm:w-[520px] overflow-y-auto"
      >
        {selectedCustomer && (
          <>
            <SheetHeader className="pb-0">
              <SheetTitle className="flex items-center gap-2">
                {selectedCustomer.personaName}
              </SheetTitle>
              <SheetDescription className="capitalize">
                {selectedCustomer.archetype} · {selectedCustomer.emotion}
              </SheetDescription>
            </SheetHeader>

            <Separator />

            {/* Decision */}
            <div className="space-y-1 px-6">
              <p className="text-xs text-muted-foreground">Decision</p>
              <p
                className={`font-semibold ${
                  selectedCustomer.decision === "Buy"
                    ? "text-green-600"
                    : selectedCustomer.decision === "Skip"
                      ? "text-orange-500"
                      : "text-red-500"
                }`}
              >
                {selectedCustomer.decision}
              </p>
            </div>

            <Separator />

            {/* Reasoning */}
            <div className="space-y-2 px-6">
              <p className="text-xs text-muted-foreground">Reasoning</p>
              <p className="text-sm leading-relaxed">
                {selectedCustomer.reasoning}
              </p>
            </div>

            <Separator />

            {/* Context */}
            <div className="space-y-2 px-6">
              <p className="text-xs text-muted-foreground">Context</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium">Mood</span>
                  <p className="capitalize text-muted-foreground">
                    {selectedCustomer.context.mood}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Trust</span>
                  <p className="text-muted-foreground">
                    {selectedCustomer.context.trust}%
                  </p>
                </div>
                <div>
                  <span className="font-medium">Budget Left</span>
                  <p className="text-muted-foreground">
                    ${selectedCustomer.context.budgetRemaining.toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Price Perception</span>
                  <p className="capitalize text-muted-foreground">
                    {selectedCustomer.pricePerception}
                  </p>
                </div>
              </div>
            </div>

            {selectedCustomer.personaDetails && (
              <>
                <Separator />

                {/* Persona Details */}
                <div className="space-y-3 px-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Backstory</p>
                    <p className="text-sm">
                      {selectedCustomer.personaDetails.backstory}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Quirks</p>
                    <p className="text-sm">
                      {selectedCustomer.personaDetails.quirks}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Traits</p>
                    <div className="space-y-1 text-sm">
                      {Object.entries(
                        selectedCustomer.personaDetails.stats,
                      ).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between text-muted-foreground"
                        >
                          <span className="capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>
                          <span>{Math.round(value * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Map;
