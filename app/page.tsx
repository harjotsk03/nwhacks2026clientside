"use client";
import { Button } from "@/components/ui/button";
import { CardType } from "@/types/Card";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
      className="w-full h-full text-center mx-auto items-center flex flex-col gap-32 bg-white relative"
      style={{
        backgroundImage: `
      radial-gradient(#d1d5db 1px, transparent 0.75px)
    `,
        backgroundSize: "20px 20px",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="w-full h-16 border-b border-stone-200 items-center pr-4 bg-white fixed z-50 flex flex-row justify-between">
        <div className="h-16 flex items-center px-6 text-xl font-bold tracking-tighter border-b border-stone-200">
          <span className="bg-orange-600 text-white px-2 py-0.5 rounded mr-2">
            L
          </span>
          LocalLens
        </div>
        <Button
          onClick={() => {
            router.push("setup");
          }}
        >
          Try LocalLens
        </Button>
      </div>
      <section className="text-center pt-52">
        <h1 className="text-5xl md:text-6xl w-10/12 mx-auto font-bold mb-6">
          Small businesses make pricing decisions that can make or break them
        </h1>
        <p className="text-xl text-stone-700 max-w-3xl mx-auto">
          Yet most have no way to test changes before going live. Inspired by
          high-risk industries like quant firms, we asked: why can’t local
          businesses do the same?
        </p>
        <Button
          onClick={() => {
            router.push("setup");
          }}
          className="mt-10"
        >
          Try LocalLens
        </Button>
      </section>

      {/* What it does */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">What it does</h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl">
          LocalLens lets business owners simulate pricing changes before they
          happen. Using AI-driven customer personas, it shows how real customers
          might react—from loyalty and trust to churn—helping owners understand
          risk, not just revenue.
        </p>
      </section>

      {/* How we built it */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">How we built it</h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl">
          We built a lightweight simulation engine powered by AI agents, each
          representing a customer segment with distinct behaviours and
          constraints. A visual canvas shows customer reactions in real time,
          while a clean dashboard surfaces key metrics and uncertainty ranges.
        </p>
      </section>

      {/* Challenges */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Challenges we ran into
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl">
          Balancing realism with simplicity was our biggest challenge. We needed
          insights that felt trustworthy without overwhelming users, while also
          clearly communicating uncertainty instead of false precision.
        </p>
      </section>

      {/* Accomplishments */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Accomplishments</h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl">
          We turned complex decision science into an intuitive, visual
          experience that non-technical business owners can understand in
          minutes. The customer reaction canvas became a powerful way to make
          abstract pricing risk feel real.
        </p>
      </section>

      {/* What we learned */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">What we learned</h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl">
          Businesses don’t want perfect predictions, they want clarity around
          risk. Showing ranges, reasoning, and customer intent builds more trust
          than exact numbers ever could.
        </p>
      </section>

      {/* What's next */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          What's next for LocalLens
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl">
          We plan to integrate LocalLens as a tool that sits on top of existing
          business tools like POS systems, Shopify, Square, and inventory
          tracking systems to provide more accurate and true data for each
          business.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-orange-600 w-full py-6 text-center text-white text-xs">
        &copy; {new Date().getFullYear()} LocalLens. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
