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
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className={cn("relative group overflow-hidden bg-neutral-100", className)}>
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full h-full object-cover"
        />
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
                  "h-1 rounded-full transition-all duration-500",
                  i === index ? "w-6 bg-neutral-900" : "w-1.5 bg-neutral-300"
                )} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
