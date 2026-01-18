"use client";

import React, { useState, useEffect } from "react";
import { Tag, Play, LineChart, ArrowRight, CheckCircle2 } from "lucide-react";

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

export default function Simulator() {
  const [showTutorial, setShowTutorial] = useState(false);

  // Trigger modal on first render
  useEffect(() => {
    const timer = setTimeout(() => setShowTutorial(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-row h-screen bg-white">
      {/* Tutorial Modal */}
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent className="sm:max-w-[450px] border-none shadow-2xl">
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
      <div className="w-full flex items-center justify-end pr-68 h-16 border-t border-stone-200 bg-white bottom-0 fixed z-50">
        <Button>Run Simulation</Button>
      </div>
      <div className="bg-white px-6 py-2 pt-17 h-full w-5/8 border-r border-stone-200 overflow-auto">
        <ProductsTable />
      </div>
      <div className="h-full w-3/8  pt-17 overflow-hidden bg-slate-50">
        {/* <NodePanel /> */}
        <ParametersPanel />
      </div>
    </div>
  );
}
