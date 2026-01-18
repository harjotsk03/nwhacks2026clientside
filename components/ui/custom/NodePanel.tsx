"use client";

import { CardType } from "@/types/Card";

import { useState } from "react";

import { CardDemo } from "./CardDemo";
import { Button } from "../button";
import { Minus, Plus, RefreshCcw } from "lucide-react";

export default function NodePanel() {
  const cards: CardType[] = [
    { id: "1", label: "AI Agent 1", x: 20, y: 20 },

    { id: "2", label: "AI Agent 2", x: 280, y: 20 },

    { id: "3", label: "AI Agent 3", x: 540, y: 20 },
  ];

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [dragging, setDragging] = useState(false);

  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(0.7);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.1));
  };

  const handleResetZoom = () => {
    setZoom(0.7);

    setOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);

    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const delta = e.deltaY * -0.001;

    const newZoom = Math.min(Math.max(0.1, zoom + delta), 3);

    // Get mouse position relative to the canvas

    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;

    const mouseY = e.clientY - rect.top;

    // Calculate the point under the mouse before zoom

    const pointX = (mouseX - offset.x) / zoom;

    const pointY = (mouseY - offset.y) / zoom;

    // Calculate new offset to keep the point under the mouse

    const newOffsetX = mouseX - pointX * newZoom;

    const newOffsetY = mouseY - pointY * newZoom;

    setZoom(newZoom);

    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  const handleCardClick = (id: string) => {
    alert(`Clicked card ${id}`);
  };

  return (
    <div
      className="w-full h-full bg-white overflow-hidden relative"
      style={{
        backgroundImage: `radial-gradient(#d1d5db 0.75px, transparent 0.75px)`,

        backgroundSize: `${20 * zoom}px ${20 * zoom}px`,

        backgroundPosition: `${offset.x}px ${offset.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        className="w-full h-full"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,

          transformOrigin: "0 0",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="absolute"
            style={{ left: card.x, top: card.y }}
          >
            <CardDemo card={card} />
          </div>
        ))}
      </div>

      {/* Zoom Controls */}

      <div className="absolute h-max bottom-4 right-4 flex flex-row gap-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
        <Button onClick={handleZoomIn}>
          <Plus />
        </Button>
        <Button variant={"ghost"} className="hover:cursor-default hover:bg-transparent">{Math.round(zoom * 100)}%</Button>
        <Button onClick={handleZoomOut}>
          <Minus />
        </Button>

        <Button onClick={handleResetZoom}>
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
}
