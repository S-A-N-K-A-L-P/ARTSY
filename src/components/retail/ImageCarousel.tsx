'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className={cn("relative group overflow-hidden bg-neutral-100", className)}>
      <AnimatePresence mode="wait">
        <motion.div
           key={currentIndex}
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="w-full h-full"
        >
           <img
             src={images[currentIndex]}
             alt={`Slide ${currentIndex}`}
             className="w-full h-full object-cover"
           />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={prev} className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg">
              <ChevronLeft size={16} />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={next} className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg">
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-12 h-1 rounded-full bg-white transition-all duration-500",
                  i === currentIndex ? "opacity-100 shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "opacity-20 hover:opacity-40"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
