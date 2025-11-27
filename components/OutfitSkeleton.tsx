'use client';

import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export default function OutfitSkeleton() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <Card className="aspect-[3/4] border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardContent className="p-0 h-full relative">
          <Skeleton className="w-full h-full" />

          <div className="absolute top-4 right-4">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </CardContent>
      </Card>

      <div className="flex justify-center items-center mt-6 gap-2">
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
      </div>
    </div>
  );
}
