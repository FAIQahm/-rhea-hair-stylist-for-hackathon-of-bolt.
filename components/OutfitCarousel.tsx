'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart } from 'lucide-react';
import Image from 'next/image';

interface OutfitItem {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
  items: Array<{
    name: string;
    price: number;
    link: string;
  }>;
}

interface OutfitCarouselProps {
  outfits: OutfitItem[];
  onShopNow?: (outfit: OutfitItem) => void;
}

export default function OutfitCarousel({ outfits, onShopNow }: OutfitCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const constraintsRef = useRef(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === outfits.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? outfits.length - 1 : prevIndex - 1;
      }
    });
  };

  const toggleLike = (outfitId: string) => {
    setLiked((prev) => ({
      ...prev,
      [outfitId]: !prev[outfitId],
    }));
  };

  if (outfits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No outfits available</p>
      </div>
    );
  }

  const currentOutfit = outfits[currentIndex];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl" ref={constraintsRef}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentOutfit.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            <Card className="h-full border-0 shadow-xl">
              <CardContent className="p-0 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />

                <img
                  src={currentOutfit.imageUrl}
                  alt={currentOutfit.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4 z-20">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(currentOutfit.id)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        liked[currentOutfit.id]
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-700'
                      }`}
                    />
                  </motion.button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                  <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-white/30">
                    {currentOutfit.category}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2">{currentOutfit.title}</h3>
                  <p className="text-sm text-white/80 mb-4">
                    {currentOutfit.items.length} items
                  </p>
                  <Button
                    onClick={() => onShopNow?.(currentOutfit)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg"
                    size="lg"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6 px-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </motion.button>

        <div className="flex gap-2">
          {outfits.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                scale: index === currentIndex ? 1.2 : 1,
                backgroundColor: index === currentIndex ? '#9333ea' : '#e5e7eb',
              }}
              className="h-2 w-2 rounded-full"
            />
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </motion.button>
      </div>
    </div>
  );
}
