'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StylistUpload from '@/components/StylistUpload';
import WardrobeUpload from '@/components/WardrobeUpload';
import WardrobeGallery from '@/components/WardrobeGallery';
import LookGenerator from '@/components/LookGenerator';
import { Sparkles } from 'lucide-react';

export default function Home() {
  // We removed the showTools state to default to the tools view
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="px-6 py-4 flex items-center justify-between glass-card border-0 border-b border-white/10 rounded-none">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-300 hover:text-rhea-purple transition-colors">
            Back to Home
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* Menu button removed as per user request */}
        </div>
      </nav>

      <div className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="mb-8 bg-white/5 border-b border-white/10 rounded-none h-auto p-0 w-full justify-start">
              <TabsTrigger
                value="analysis"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-rhea-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm text-gray-400 data-[state=active]:text-white"
              >
                Style Consultation
              </TabsTrigger>
              <TabsTrigger
                value="generator"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-rhea-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm text-gray-400 data-[state=active]:text-white"
              >
                Pro Generator
              </TabsTrigger>
              <TabsTrigger
                value="wardrobe"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-rhea-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm text-gray-400 data-[state=active]:text-white"
              >
                Add Items
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-rhea-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm text-gray-400 data-[state=active]:text-white"
              >
                My Wardrobe
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="flex justify-center mt-8">
              <StylistUpload initialQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="generator" className="flex justify-center mt-8">
              <LookGenerator />
            </TabsContent>

            <TabsContent value="wardrobe" className="flex justify-center mt-8">
              <WardrobeUpload />
            </TabsContent>

            <TabsContent value="gallery" className="mt-8">
              <WardrobeGallery />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="py-4 px-6 border-t border-white/10 glass-card border-0 rounded-none">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-6">
            <Link href="/advertising" className="hover:text-rhea-purple transition-colors">Advertising</Link>
            <Link href="/business" className="hover:text-rhea-purple transition-colors">Business</Link>
            <Link href="/how-it-works" className="hover:text-rhea-purple transition-colors">How Rhea works</Link>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-rhea-purple transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-rhea-purple transition-colors">Terms</Link>
            <Link href="/settings" className="hover:text-rhea-purple transition-colors">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
