"use client"
import NodePanel from "@/components/ui/custom/NodePanel";
import { useEffect } from "react";

export default function Customers () {


    useEffect(() => {
    document.addEventListener(
      "wheel",
      function (event) {
        if (event.ctrlKey) {
          event.preventDefault();
        }
      },
      { passive: false },
    );
    },[])
    return (
      <div className="w-full h-screen">
        <div className="w-full h-16 border-b border-stone-200 bg-white fixed z-50"></div>
        <div className="pt-16">
          <NodePanel />
        </div>
      </div>
    );
}