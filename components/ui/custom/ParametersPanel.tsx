"use client";
import React, { useState } from "react";
import { Plus, Send, TrendingUp, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "../switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 1. Data Constants
const AVAILABLE_EMPLOYEES = [
  { name: "Alice Johnson", rate: 45 },
  { name: "Bob Smith", rate: 35 },
  { name: "Charlie Davis", rate: 50 },
  { name: "Diana Prince", rate: 40 },
];

export default function ParametersPanel() {
  // State for Employee Tab
  const [isEmployeeEnabled, setIsEmployeeEnabled] = useState(false);
  const [addMarketing, setAddMarketing] = useState(false);
  const [activeStaff, setActiveStaff] = useState([
    { name: "Alice Johnson", rate: 45, hours: 40 },
  ]);
  const [selectedNewStaff, setSelectedNewStaff] = useState("");

  // State for Marketing Tab
  const [chatMessage, setChatMessage] = useState("");

  // Functions
  const addEmployee = () => {
    const staffTemplate = AVAILABLE_EMPLOYEES.find(
      (e) => e.name === selectedNewStaff,
    );
    if (staffTemplate) {
      setActiveStaff([...activeStaff, { ...staffTemplate, hours: 0 }]);
      setSelectedNewStaff("");
    }
  };

  const updateHours = (index: number, hours: string) => {
    const updated = [...activeStaff];
    updated[index].hours = Number(hours);
    setActiveStaff(updated);
  };

  return (
    <div className="bg-white min-h-screen w-full px-4 py-2">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <CardTitle>Adjustment Parameters</CardTitle>
          <CardDescription className="mt-2">
            Simulate changes to test effects on customers and revenue.
          </CardDescription>
        </div>

        <Tabs defaultValue="employee" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-2">
            <TabsTrigger value="employee">Employee</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>

          {/* --- EMPLOYEE TAB --- */}
          <TabsContent value="employee" className="space-y-4">
            <Card>
              <div className="flex items-center justify-between w-11/12 mx-auto">
                <Label htmlFor="airplane-mode">
                  Include Employee Adjustments
                </Label>

                <Switch
                  checked={isEmployeeEnabled}
                  onCheckedChange={(value) => setIsEmployeeEnabled(value)}
                />
              </div>

              {isEmployeeEnabled && (
                <div className="px-4">
                  {/* Add Employee Row */}
                  <div className="flex gap-4 items-end pb-4">
                    <div className="flex-1">
                      <Label className="mb-2.5">Add Team Member</Label>
                      <Select
                        value={selectedNewStaff}
                        onValueChange={setSelectedNewStaff}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee..." />
                        </SelectTrigger>
                        <SelectContent>
                          {AVAILABLE_EMPLOYEES.map((e) => (
                            <SelectItem key={e.name} value={e.name}>
                              {e.name} (${e.rate}/hr)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      size={"sm"}
                      onClick={addEmployee}
                      disabled={!selectedNewStaff}
                    >
                      Add
                    </Button>
                  </div>

                  {/* Employee List */}
                  <div className="space-y-4">
                    {activeStaff.map((staff, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border"
                      >
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-xs text-slate-500">
                            ${staff.rate}/hr
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Label className="text-xs">Hours:</Label>
                          <Input
                            className="w-20 bg-white"
                            value={staff.hours}
                            onChange={(e) => updateHours(idx, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* --- MARKETING TAB --- */}
          <TabsContent value="marketing" className="space-y-4">
            <Card>
              <div className="flex items-center justify-between w-11/12 mx-auto">
                <Label htmlFor="airplane-mode">Add Marketing Tactics</Label>

                <Switch
                  checked={addMarketing}
                  onCheckedChange={(value) => setAddMarketing(value)}
                />
              </div>
              {addMarketing && (
                <div className="px-4 flex flex-col justify-end h-98">
                  <Label>Quick Tactics</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Buy 10 Get 1 Free",
                      "Early Bird 15%",
                      "Free Shipping",
                      "Referral Bonus",
                    ].map((t) => (
                      <Button
                        key={t}
                        variant="outline"
                        size={"sm"}
                        className="justify-start"
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                  <div className="flex flex-row items-center justify-between -mb-1 gap-2 mt-3">
                    <Input
                      placeholder="Ask the chatbot..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                    />
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* --- RECOMMENDED TAB --- */}
          <TabsContent
            value="recommended"
            className="grid grid-cols-1 gap-4"
          >
            <RecommendationCard
              title="Increase Inventory: Logistics"
              desc="Market sentiment shows a 12% rise in demand for local delivery due to recent fuel price drops."
              icon={<TrendingUp className="text-green-600" />}
            />
            <RecommendationCard
              title="Shift Marketing to Social"
              desc="Recent news indicates high engagement in Gen-Z demographics for your product category."
              icon={<Newspaper className="text-blue-600" />}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function RecommendationCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary">
      <CardHeader className="flex flex-row items-center gap-4 py-4">
        <div className="p-2 bg-slate-100 rounded-full">{icon}</div>
        <div>
          <CardTitle className="text-md">{title}</CardTitle>
          <CardDescription className="text-xs leading-relaxed mt-1">
            {desc}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
