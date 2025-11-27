'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  current: number;
  max: number;
  label?: string;
  className?: string;
}

export function ProgressIndicator({ current, max, label, className }: ProgressIndicatorProps) {
  const percentage = (current / max) * 100;
  const isNearLimit = percentage >= 80;
  const isFull = current >= max;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300">{label || 'Storage Used'}</span>
        <span className={cn(
          'font-semibold',
          isFull && 'text-red-400',
          isNearLimit && !isFull && 'text-rhea-gold',
          !isNearLimit && 'text-gray-300'
        )}>
          {current}/{max}
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full',
            isFull && 'bg-red-500',
            isNearLimit && !isFull && 'bg-rhea-gold',
            !isNearLimit && 'bg-rhea-purple'
          )}
        />
      </div>
    </div>
  );
}
