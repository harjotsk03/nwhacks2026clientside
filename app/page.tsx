"use client";
import { CardType } from "@/types/Card";
import React, { useState } from "react";

const cards: CardType[] = [
  { id: "1", label: "AI Agent 1", x: 100, y: 100 },
  { id: "2", label: "AI Agent 2", x: 400, y: 200 },
  { id: "3", label: "AI Agent 3", x: 200, y: 400 },
];

const Home: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

  const handleCardClick = (id: string) => {
    alert(`Clicked card ${id}`);
  };

  return (
    <div
      className="w-full h-20 bg-white relative"
      style={{
        backgroundImage: `
      radial-gradient(#d1d5db 1px, transparent 1px)
    `,
        backgroundSize: "20px 20px",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="relative w-full h-max"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="absolute bg-red-50 h-max"
            style={{ left: card.x, top: card.y }}
          >
            <h1>{card.label}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
