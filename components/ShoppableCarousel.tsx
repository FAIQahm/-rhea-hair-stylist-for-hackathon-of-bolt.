'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShoppableItem {
  title: string;
  price: number;
  link: string;
  category?: string;
  brand?: string;
  imageUrl?: string;
}

interface ShoppableCarouselProps {
  items: ShoppableItem[];
  onItemClick?: (item: ShoppableItem) => void;
}

export default function ShoppableCarousel({ items, onItemClick }: ShoppableCarouselProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const handleClick = (item: ShoppableItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-normal text-gray-900 flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-gray-600" />
          Shoppable Look
        </h3>
        <Badge className="bg-gray-100 text-gray-700 text-xs font-normal">
          {items.length} items
        </Badge>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex-shrink-0 w-72 snap-start"
          >
            <Card className="border border-gray-300 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-0">
                {item.imageUrl && (
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-4 space-y-3">
                  {item.brand && (
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 font-normal">
                      {item.brand}
                    </Badge>
                  )}

                  <div>
                    <h4 className="font-medium text-gray-900 text-base mb-1 line-clamp-2">
                      {item.title}
                    </h4>
                    {item.category && (
                      <p className="text-xs text-gray-500">{item.category}</p>
                    )}
                  </div>

                  <div className="flex items-end justify-between pt-2">
                    <div>
                      <p className="text-2xl font-normal text-[#1a73e8]">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleClick(item)}
                    className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium shadow-sm rounded-md"
                    size="default"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
