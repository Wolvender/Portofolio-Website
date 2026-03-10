import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OptimizedImage({ src, alt, className, priority = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Handle path correction if needed (dealing with base paths)
  const cleanSrc = src.startsWith("/") ? src : `/${src}`;

  return (
    <div className={`relative overflow-hidden bg-black/20 ${className}`}>
      {/* Loading Skeleton / Placeholder */}
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-(--surface) z-10"
          >
            <div className="w-8 h-8 border-2 border-(--accent)/20 border-t-(--accent) rounded-full animate-spin mb-2" />
            <span className="text-[10px] font-mono text-(--accent) opacity-40 tracking-tighter uppercase">
              FETCHING_ASSET...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-950/20 z-10 text-red-500 font-mono text-[10px]">
          [!] ASSET_NOT_FOUND
        </div>
      )}

      {/* The Actual Image/GIF */}
      <img
        src={cleanSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-md"
        }`}
      />

      {/* Subtle Scanline Overlay for "System" feel */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
    </div>
  );
}
