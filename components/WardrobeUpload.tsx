'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Shirt, Lock, Clock } from 'lucide-react';

export default function WardrobeUpload() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <GlassCard className="text-center p-12">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-rhea-purple/20 flex items-center justify-center">
              <Shirt className="h-12 w-12 text-rhea-purple" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-rhea-gold/20 flex items-center justify-center border-4 border-gray-900">
              <Clock className="h-5 w-5 text-rhea-gold" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">
              Add Wardrobe Items
            </h2>
            <p className="text-lg text-rhea-purple font-semibold">
              Coming Soon
            </p>
          </div>

          <div className="max-w-md space-y-4 text-gray-300">
            <p className="text-sm leading-relaxed">
              Upload and organize your wardrobe items to get personalized outfit recommendations based on what you already own.
            </p>

            <div className="bg-white/5 rounded-lg p-4 space-y-2 text-left">
              <p className="text-xs font-semibold text-rhea-gold uppercase tracking-wide">
                Upcoming Features:
              </p>
              <ul className="text-sm space-y-1 text-gray-400">
                <li>• Upload wardrobe photos</li>
                <li>• Categorize clothing items</li>
                <li>• Add custom descriptions</li>
                <li>• Smart outfit matching</li>
              </ul>
            </div>

            <p className="text-xs text-gray-500 pt-2">
              Build your digital wardrobe and get AI-powered styling suggestions tailored to your collection!
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400 pt-4">
            <Lock className="h-4 w-4" />
            <span>Feature Available Soon</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
