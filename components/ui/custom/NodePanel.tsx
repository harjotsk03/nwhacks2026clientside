"use client";

import { CardType } from "@/types/Card";

import { useMemo, useState } from "react";

import { CardDemo } from "./CardDemo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type DashboardTab = "market" | "profit" | "customers";

export default function NodePanel() {
  const cards: CardType[] = [
    { id: "1", label: "AI Agent 1", x: 20, y: 20 },

    { id: "2", label: "AI Agent 2", x: 280, y: 20 },

    { id: "3", label: "AI Agent 3", x: 540, y: 20 },
  ];

  const tabs = useMemo(
    () =>
      [
        { id: "market" as const, label: "Market Analytics" },
        { id: "profit" as const, label: "Profit Margin" },
        { id: "customers" as const, label: "Customer Insights" },
      ] as const,
    []
  );

  const [activeTab, setActiveTab] = useState<DashboardTab>("market");

  return (
    <div className="w-full h-full bg-white p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="p-0">
              <div className="flex items-center gap-1 p-2">
                {tabs.map((tab) => {
                  const isActive = tab.id === activeTab;
                  return (
                    <Button
                      key={tab.id}
                      type="button"
                      size="sm"
                      variant={isActive ? "default" : "ghost"}
                      aria-pressed={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className="rounded-md"
                    >
                      {tab.label}
                    </Button>
                  );
                })}
              </div>
            </TableHead>
          </TableRow>

          <TableRow>
            {activeTab === "market" && (
              <>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
              </>
            )}

            {activeTab === "profit" && (
              <>
                <TableHead>Product</TableHead>
                <TableHead>Margin</TableHead>
              </>
            )}

            {activeTab === "customers" && (
              <>
                <TableHead>Segment</TableHead>
                <TableHead>Score</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {activeTab === "market" && (
            <>
              <TableRow>
                <TableCell>Trend Snapshot</TableCell>
                <TableCell>—</TableCell>
              </TableRow>
            </>
          )}

          {activeTab === "profit" && (
            <>
              <TableRow>
                <TableCell>Product A</TableCell>
                <TableCell>—</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product B</TableCell>
                <TableCell>—</TableCell>
              </TableRow>
            </>
          )}

          {activeTab === "customers" && (
            <>
              <TableRow>
                <TableCell>New Users</TableCell>
                <TableCell>—</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Returning Users</TableCell>
                <TableCell>—</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
