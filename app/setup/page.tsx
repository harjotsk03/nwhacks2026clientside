"use client";

import React, { useState } from "react";
import {
  Building2,
  Users2,
  Target,
  FileText,
  Sparkles,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Info,
  Check,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

// --- Types ---
type BusinessCategory =
  | "coffee-shop"
  | "restaurant"
  | "retail"
  | "salon"
  | "fitness"
  | "other";
type CustomerSegment =
  | "students"
  | "young-professionals"
  | "families"
  | "retirees"
  | "mixed";
type IncomeLevel = "low" | "low-medium" | "medium" | "medium-high" | "high";

type Competitor = {
  id: number;
  name: string;
  distance: string;
};

type FormData = {
  businessName: string;
  businessCategory: BusinessCategory;
  location: string;
  age18_25: number;
  age26_35: number;
  age36_plus: number;
  primarySegment: CustomerSegment;
  incomeLevel: IncomeLevel;
  competitors: Competitor[];
  avgTransaction: string | null;
  uniqueValue: string | null;
  inventoryFile: string;
};

export default function SetupWizard() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const router = useRouter();

  // NEW STATES FOR CUSTOMER CREATION
  const [isCreatingCustomers, setIsCreatingCustomers] = useState(false);
  const [customerProgress, setCustomerProgress] = useState(0);
  const [customerStatus, setCustomerStatus] = useState("");

  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState("");
  const [selectedCompetitors, setSelectedCompetitors] = useState<number[]>([]);

  const [formData, setFormData] = useState<FormData>({
    businessName: "Perugia Italian Caffè",
    businessCategory: "coffee-shop",
    location: "2350 Health Sciences Mall, Vancouver, BC V6T 1Z4",
    age18_25: 60,
    age26_35: 30,
    age36_plus: 10,
    primarySegment: "students",
    incomeLevel: "low-medium",
    competitors: [],
    avgTransaction: null,
    uniqueValue: null,
    inventoryFile: "perugia_inventory_2024.csv",
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    setAnalysisStep("Analyzing location data...");
    await new Promise((r) => setTimeout(r, 1200));
    setAnalysisProgress(25);

    setAnalysisStep("Searching for nearby competitors...");
    await new Promise((r) => setTimeout(r, 1500));
    setAnalysisProgress(50);

    const discoveredCompetitors = [
      { id: 1, name: "Starbucks - UBC Village", distance: "0.3 km" },
      { id: 2, name: "Tim Hortons - Wesbrook Mall", distance: "0.5 km" },
      { id: 3, name: "Blusson Spinal Cord Café", distance: "0.1 km" },
      { id: 4, name: "Trees Organic Coffee", distance: "0.4 km" },
      { id: 5, name: "Breka Bakery & Café", distance: "0.6 km" },
    ];

    updateField("competitors", discoveredCompetitors);
    setSelectedCompetitors([1, 2, 3]);

    setAnalysisStep("Analyzing transaction patterns...");
    await new Promise((r) => setTimeout(r, 1000));
    setAnalysisProgress(75);
    updateField("avgTransaction", "$8.50");

    setAnalysisStep("Identifying unique selling points...");
    await new Promise((r) => setTimeout(r, 1200));
    setAnalysisProgress(100);
    updateField(
      "uniqueValue",
      "Authentic Italian espresso, cozy study atmosphere, locally-sourced pastries",
    );

    await new Promise((r) => setTimeout(r, 500));
    setIsAnalyzing(false);
    setStep(3);
  };

  const handleCreateCustomers = async () => {
    setIsCreatingCustomers(true);
    setCustomerProgress(0);

    const steps = [
      "Synthesizing demographic data...",
      "Generating 'Student' persona agents...",
      "Generating 'Young Professional' agents...",
      "Mapping purchase intent to inventory...",
      "Initializing behavioral models...",
      "Finalizing 500 unique customer agents...",
    ];

    for (let i = 0; i < steps.length; i++) {
      setCustomerStatus(steps[i]);
      await new Promise((r) => setTimeout(r, 1100));
      setCustomerProgress(((i + 1) / steps.length) * 100);
    }

    await new Promise((r) => setTimeout(r, 500));
    setIsCreatingCustomers(false);
    router.push("/dashboard/simulator");
  };

  const toggleCompetitor = (id: number) => {
    setSelectedCompetitors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  if (isAnalyzing || isCreatingCustomers) {
    const isCust = isCreatingCustomers;
    return (
      <div
        className="w-full min-h-screen h-max py-20 flex items-center justify-center bg-white overflow-hidden relative"
        style={{
          backgroundImage: `radial-gradient(#d1d5db 1px, transparent 1px)`,
          backgroundSize: `${20}px ${20}px`,
        }}
      >
        <Card className="w-full max-w-md shadow-lg border-primary/20">
          <CardHeader className="space-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background mb-2 animate-pulse">
              {isCust ? (
                <UserPlus className="h-6 w-6 text-primary" />
              ) : (
                <Sparkles className="h-6 w-6 text-primary" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {isCust ? "Building Agents" : "Analyzing Market"}
            </CardTitle>
            <CardDescription>
              {isCust
                ? "Creating unique AI customer personas for your business..."
                : "Using AI to discover insights about your market..."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 py-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
              <p className="text-sm font-medium text-muted-foreground">
                {isCust ? customerStatus : analysisStep}
              </p>
            </div>
            <div className="w-full space-y-2">
              <Progress
                value={isCust ? customerProgress : analysisProgress}
                className="h-2"
              />
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
                {Math.round(isCust ? customerProgress : analysisProgress)}%
                Complete
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen h-max py-20 flex items-center justify-center bg-white overflow-hidden relative"
      style={{
        backgroundImage: `radial-gradient(#d1d5db 1px, transparent 1px)`,
        backgroundSize: `${20}px ${20}px`,
      }}
    >
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background mb-4">
            {step === 1 && <Building2 className="h-5 w-5" />}
            {step === 2 && <Users2 className="h-5 w-5" />}
            {step === 3 && <Target className="h-5 w-5" />}
            {step === 4 && <FileText className="h-5 w-5" />}
          </div>

          {step === 1 && (
            <>
              <CardTitle className="text-2xl">Business Basics</CardTitle>
              <CardDescription>
                Tell us about your business to build your simulation.
              </CardDescription>
            </>
          )}
          {step === 2 && (
            <>
              <CardTitle className="text-2xl">Customer Demographics</CardTitle>
              <CardDescription>
                Help us build AI personas that match your customers.
              </CardDescription>
            </>
          )}
          {step === 3 && (
            <>
              <CardTitle className="text-2xl">Market Analysis</CardTitle>
              <CardDescription>
                Review the competitive landscape we discovered.
              </CardDescription>
            </>
          )}
          {step === 4 && (
            <>
              <CardTitle className="text-2xl">Inventory & Pricing</CardTitle>
              <CardDescription>
                Your product catalog is ready for simulation.
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="biz-name">Business Name</Label>
                <Input
                  id="biz-name"
                  value={formData.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Business Type</Label>
                <Select
                  value={formData.businessCategory}
                  onValueChange={(v) => updateField("businessCategory", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee-shop">Coffee Shop</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="salon">Salon/Spa</SelectItem>
                    <SelectItem value="fitness">Fitness/Gym</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Used for local market context
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Age Distribution
                </Label>
                {[
                  { label: "18-25 years", field: "age18_25" },
                  { label: "26-35 years", field: "age26_35" },
                  { label: "36+ years", field: "age36_plus" },
                ].map((age) => (
                  <div key={age.field} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{age.label}</span>
                      <span className="font-bold">
                        {(formData as any)[age.field]}%
                      </span>
                    </div>
                    <Slider
                      value={[(formData as any)[age.field]]}
                      max={100}
                      step={5}
                      onValueChange={([val]) =>
                        updateField(age.field as any, val)
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Primary Segment</Label>
                <Select
                  value={formData.primarySegment}
                  onValueChange={(v) => updateField("primarySegment", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="young-professionals">
                      Young Professionals
                    </SelectItem>
                    <SelectItem value="families">Families</SelectItem>
                    <SelectItem value="retirees">Retirees</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label>Nearby Competitors</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 rounded-full p-0"
                        >
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          Competitors found via Google Maps and local
                          directories.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="rounded-lg border divide-y overflow-hidden bg-slate-50/50">
                  {formData.competitors.map((comp) => (
                    <div
                      key={comp.id}
                      className="flex items-center justify-between p-3 transition-colors hover:bg-background"
                    >
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{comp.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {comp.distance}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={
                          selectedCompetitors.includes(comp.id)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => toggleCompetitor(comp.id)}
                        className="h-8"
                      >
                        {selectedCompetitors.includes(comp.id) ? (
                          <>
                            <Minus className="mr-1 h-3 w-3" /> Remove
                          </>
                        ) : (
                          <>
                            <Plus className="mr-1 h-3 w-3" /> Add
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Estimated Transaction</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 rounded-full p-0"
                        >
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          Estimate transaction price was found from Google,
                          Google Reviews,<br></br>and other online sources
                          related to your buisness.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted p-3">
                  <span className="text-xs text-muted-foreground">
                    Market Average
                  </span>
                  <span className="text-lg font-bold">
                    {formData.avgTransaction}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-4 bg-slate-50/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">
                      {formData.inventoryFile}
                    </p>
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    24 products loaded with pricing data
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-slate-900 p-4 text-slate-50">
                <div className="flex gap-3">
                  <Sparkles className="h-5 w-5 shrink-0 text-yellow-400" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Ready to simulate!</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We'll create 500+ AI customer agents based on your
                      demographics to test against your inventory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <div className="flex w-full justify-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? "w-8 bg-primary" : "w-1.5 bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex w-full gap-2">
            {step > 1 && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep((s) => (s === 3 ? 2 : s - 1))}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}

            <Button
              className="flex-1"
              onClick={() => {
                if (step === 2) runAnalysis();
                else if (step === 4) handleCreateCustomers();
                else if (step === 4) console.log("Run simulation", formData);
                else setStep((s) => s + 1);
              }}
            >
              {step === 2 ? (
                <>
                  Analyze Market <Sparkles className="ml-2 h-4 w-4" />
                </>
              ) : step === 4 ? (
                <>
                  Run Simulation <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
