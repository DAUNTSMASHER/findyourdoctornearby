"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  id: string;
  format: string;
  height: number;
  width: number;
  className?: string;
  label?: string;
}

/**
 * AdUnit component for rendering Adsterra iframe ads.
 * It handles the global atOptions configuration and loading the trigger script.
 */
export const AdUnit = ({ id, format, height, width, className, label }: AdUnitProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run if the container exists and hasn't been populated
    if (containerRef.current && containerRef.current.children.length === 0) {
      // Create a unique ID for this instance if needed, but atOptions is usually one-per-placement
      const scriptOptions = document.createElement("script");
      scriptOptions.innerHTML = `
        atOptions = {
          'key' : '${id}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      
      const scriptInvoke = document.createElement("script");
      scriptInvoke.src = `//cardinaltangible.com/${id}/invoke.js`;
      scriptInvoke.async = true;

      containerRef.current.appendChild(scriptOptions);
      containerRef.current.appendChild(scriptInvoke);
    }
  }, [id, height, width]);

  return (
    <div className={`flex flex-col items-center ${className || ""}`}>
      {label && (
        <span className="mb-1 text-[10px] uppercase tracking-widest text-slate-400">
          {label}
        </span>
      )}
      <div 
        ref={containerRef} 
        style={{ width: `${width}px`, height: `${height}px` }}
        className="overflow-hidden rounded-lg bg-slate-100/50 shadow-sm transition-shadow hover:shadow-md"
      />
    </div>
  );
};
