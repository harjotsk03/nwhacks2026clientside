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
    return(
        <div className="w-full h-screen">
            <NodePanel />
        </div>
    )
}