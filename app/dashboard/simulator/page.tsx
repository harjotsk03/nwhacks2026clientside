"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  Play,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Loader,
  Loader2,
  Warehouse,
  Utensils,
  Dumbbell,
  Check,
  Sparkles,
} from "lucide-react";

import NodePanel from "@/components/ui/custom/NodePanel";
import { ProductsTable } from "@/components/ui/custom/ProductsTable";

// Shadcn Imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ParametersPanel from "@/components/ui/custom/ParametersPanel";
import Map from "@/components/Map";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartLineMultiple } from "@/components/ui/custom/chart-line-multiple";

type CustomerType = "student" | "middle-aged" | "elderly";

interface Customer {
  id: number;
  x: number;
  y: number;
  status: string;
  type: CustomerType;
}

interface SimConfig {
  employees: { name: string; rate: number; hours: number }[];
  marketingTactics: string[];
  productChanges: Record<string, number>; // e.g., { "Product A": 19.99 }
}

export default function Simulator() {
  const [showTutorial, setShowTutorial] = useState(true);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const AGENT_IDS = [
    "asst_jurpzkjMnwZ0ADG9elkHwAuw",
    "asst_HDsUPN0b1Xu6KCtdN2KYgcFv",
    "asst_W9r2KI3Kc3Ey3TVohFGKT9MF",
    "asst_JrSe3nqeQkc4VQhG62C9bMlP",
    "asst_QtOEf9cHNcSkvwlqr5x7zY5p",
    "asst_CvEWl2Ro8y1j7yJ8e94DBMuo",
    "asst_9sKMlyEvjRvsZTM8LsvTuByF",
    "asst_uQfqc9Kr0kazRAUVaBXtzF8s",
    "asst_zaHjJRqxFXPeqZzYd8a6bKJD",
    "asst_72LbuBqkNAFVtw4LXc51QAeR",
    "asst_Ih2jvVoLaJ13ygtlatqYAins",
    "asst_URsqfGLv3dOy3v54hFLkzsqp",
    "asst_RyImue6hQL0wpnO5XLy6LR6p",
    "asst_UuTF4NGD4CsfMnxXRvChErCq",
    "asst_K9y6NS9YyeJoSzfc5I93qVv1",
    "asst_xGp5HlHLa2iBJuHT3MbslU5w",
    "asst_6TnpGGyzONBNIzPAqOxKn1nh",
    "asst_M3P7cyj0IjYzHBpKTiYDyFBa",
    "asst_kjEiRPr5xgo6Fog9TbbVg7RQ",
    "asst_HikxUOhCb4kXGAUTfKdHDZGm",
  ];

  const [simConfig, setSimConfig] = useState<SimConfig>({
    employees: [],
    marketingTactics: [],
    productChanges: {},
  });

  // Simulation Logic moved to Parent
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunningSim && customers.length < 20) {
      interval = setInterval(() => {
        setCustomers((prev) => {
          if (prev.length >= 20) {
            clearInterval(interval);
            return prev;
          }
          const rand = Math.random() * 100;
          let type: "student" | "middle-aged" | "elderly";

          if (rand < 70) {
            type = "student";
          } else if (rand < 90) {
            type = "middle-aged";
          } else {
            type = "elderly";
          }
          const newCustomer: Customer = {
            id: prev.length,
            x: Math.floor(Math.random() * 80) - 40,
            y: Math.floor(Math.random() * 80) - 40,
            type: type,
            status: ["bg-green-700", "bg-orange-500", "bg-red-700"][
              Math.floor(Math.random() * 3)
            ],
          };
          return [...prev, newCustomer];
        });
      }, 300); // Speed up for better UX
    }

    return () => clearInterval(interval);
  }, [isRunningSim, customers.length]);

  const simComplete = customers.length === 20;

  function SimSummary({
    config,
    isComplete,
  }: {
    config: SimConfig;
    isComplete: boolean;
  }) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-lg font-bold">
            Simulation {isComplete ? "Results" : "Running"}
          </h3>
          <p className="text-sm text-muted-foreground">Active Configuration:</p>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-white rounded-lg border">
            <p className="text-xs font-bold uppercase text-slate-400 mb-2">
              Staffing
            </p>
            {config.employees.length > 0 ? (
              config.employees.map((e) => (
                <div
                  key={e.name}
                  className="flex justify-between text-sm italic"
                >
                  <span>{e.name}</span>
                  <span>{e.hours}h</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">Baseline Staffing</p>
            )}
          </div>

          <div className="p-3 bg-white rounded-lg border">
            <p className="text-xs font-bold uppercase text-slate-400 mb-2">
              Marketing
            </p>
            <div className="flex flex-wrap gap-1">
              {config.marketingTactics.length > 0 ? (
                config.marketingTactics.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-medium"
                  >
                    {t}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-400">Organic Growth</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-row h-screen bg-white">
      {/* Tutorial Modal */}
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent className="sm:max-w-[450px] border-none">
          <DialogHeader className="space-y-3">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-2">
              <Play className="text-white h-6 w-6 fill-current" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Welcome to the Simulator
            </DialogTitle>
            <DialogDescription className="text-base">
              Follow these three simple steps to optimize your business
              strategy.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-sm">
                1
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <p className="font-semibold">Adjust product prices</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Modify individual item prices in the product table to see how
                  they impact margins.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-sm">
                2
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  <p className="font-semibold">Run the simulation</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click the run button to let 500+ AI agents decide what to buy
                  based on your new pricing.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-sm">
                3
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  <p className="font-semibold">Analyze & Tweak</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Understand the potential revenue impact and adjust until you
                  find the sweet spot.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="w-full h-11 text-base font-medium transition-all active:scale-95"
              onClick={() => setShowTutorial(false)}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Layout */}
      <div className="w-full h-16 border-b border-stone-200 bg-white fixed z-50"></div>
      <div className="w-full flex flex-row pt-16 pb-16 h-full">
        {isRunningSim || simComplete ? (
          <>
            {/* Left: Map Side */}
            <div className="w-2/3 p-4 h-full bg-white overflow-scroll">
              {simComplete && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mb-4 group overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50/50 to-white p-4 transition-all "
                >
                  {/* Decorative background glow */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-400/10 blur-2xl transition-all group-hover:bg-orange-400/20" />

                  <div className="relative flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold text-orange-950 tracking-tight">
                          AI Strategy Insights
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-white/50 border-orange-200 text-[10px] uppercase tracking-wider text-orange-700"
                      >
                        Live Analysis
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs leading-relaxed text-orange-900/80">
                        Based on your{" "}
                        <span className="font-semibold text-orange-900">
                          marketing tactics
                        </span>{" "}
                        and{" "}
                        <span className="font-semibold text-orange-900">
                          price shifts
                        </span>
                        , customer retention is projected to increase by{" "}
                        <span className="text-orange-600 font-bold">14.2%</span>{" "}
                        over the next quarter.
                      </p>

                      {/* <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter text-orange-600 hover:text-orange-700 transition-colors">
                      View full breakdown <ArrowRight className="h-3 w-3" />
                    </button> */}
                    </div>
                  </div>
                </motion.div>
              )}
              <Map
                customers={customers}
                isSimulating={isRunningSim && !simComplete}
              />
              <div className="mt-4">
                <ChartLineMultiple />
              </div>
            </div>

            {/* Right: Results Side (The thing you wanted to show when complete) */}
            <div className="w-1/3 border-l border-stone-200 p-6 overflow-auto">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CardTitle>Simulation Parameters</CardTitle>
                <div className="mt-4 space-y-6">
                  {/* Employee Summary */}
                  {simConfig.employees.length > 0 && (
                    <section>
                      <CardDescription className="mb-2">
                        Employee's
                      </CardDescription>
                      {simConfig.employees.map((emp) => (
                        <div
                          key={emp.name}
                          className="flex justify-between text-sm py-2 border rounded-sm px-3 mb-2"
                        >
                          <span>{emp.name}</span>
                          <span className="font-mono">{emp.hours} hrs</span>
                        </div>
                      ))}
                    </section>
                  )}

                  {/* Marketing Summary */}
                  {simConfig.marketingTactics.length > 0 && (
                    <section>
                      <CardDescription className="mb-2">
                        Marketing Tactic's
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {simConfig.marketingTactics.map((t) => (
                          <span
                            key={t}
                            className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Pricing Summary */}
                  <section>
                    <CardDescription className="mb-2">
                      Price Adjustment's
                    </CardDescription>
                    {Object.keys(simConfig.productChanges).length > 0 ? (
                      Object.entries(simConfig.productChanges).map(
                        ([name, price]) => (
                          <div
                            key={name}
                            className="flex justify-between text-sm py-1 border-b"
                          >
                            <span>{name}</span>
                            <span className="font-semibold">${price}</span>
                          </div>
                        ),
                      )
                    ) : (
                      <p className="text-xs text-stone-400 italic">
                        No price changes made.
                      </p>
                    )}
                  </section>
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white px-6 py-2 h-full w-5/8 border-r border-stone-200 overflow-auto">
              <ProductsTable
                onPriceChange={(name, price) =>
                  setSimConfig((prev) => ({
                    ...prev,
                    productChanges: { ...prev.productChanges, [name]: price },
                  }))
                }
              />
            </div>
            <div className="h-full w-3/8 overflow-hidden bg-slate-50">
              {/* <ParametersPanel /> */}
              <ParametersPanel
                onConfigChange={setSimConfig}
                config={simConfig}
              />
            </div>
          </>
        )}
      </div>
      <div className="w-full flex items-center justify-end pr-10 h-16 border-t border-stone-200 bg-white bottom-0 fixed z-50">
        <Button
          className={`mr-58 ${simComplete && "bg-green-600"}`}
          onClick={() => {
            setIsRunningSim(true);
            AGENT_IDS.forEach((asst_id) => {
              // make api call to end point with the asst_id and then store repsonse in an arr
            });
            console.log(simConfig);
          }}
          disabled={isRunningSim}
        >
          {isRunningSim && !simComplete ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Simulating...
            </>
          ) : simComplete ? (
            <>
              <Check className="h-4 w-4" /> Simulation Complete
            </>
          ) : (
            <>
              <Play /> Run Simulation
            </>
          )}
        </Button>
      </div>
    </div>
  );
}