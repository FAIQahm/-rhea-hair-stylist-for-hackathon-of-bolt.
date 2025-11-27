'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function AnimatedButton({
  children,
  loading = false,
  variant = 'primary',
  className,
  disabled,
  onClick,
  type = 'button',
}: AnimatedButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'rhea-gradient text-white shadow-lg shadow-purple-500/50',
    secondary: 'glass-card text-white hover:bg-white/20',
    ghost: 'bg-transparent text-white hover:bg-white/10',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      className={cn(
        baseStyles,
        variantStyles[variant],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading && <Loader2 className="h-5 w-5 animate-spin" />}
      {children}
    </motion.button>
  );
}
