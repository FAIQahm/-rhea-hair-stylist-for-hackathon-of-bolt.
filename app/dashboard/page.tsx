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
import { Menu, Sparkles } from 'lucide-react';

export default function Home() {
  const [showTools, setShowTools] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="px-6 py-4 flex items-center justify-between glass-card border-0 border-b border-white/10 rounded-none">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-300 hover:text-rhea-purple transition-colors">
            About
          </Link>
          <Link href="/" className="text-sm text-gray-300 hover:text-rhea-purple transition-colors">
            Store
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="h-10 w-10 text-gray-300 hover:text-white transition-colors"
            onClick={() => setShowTools(!showTools)}
          >
            <Menu className="h-5 w-5" />
          </motion.button>
          <Link href="/fits">
            <AnimatedButton className="px-6">
              <Sparkles className="h-4 w-4" />
              Try Rhea
            </AnimatedButton>
          </Link>
        </div>
      </nav>

      {showTools ? (
        <div className="flex-1 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="mb-8 bg-white/5 border-b border-white/10 rounded-none h-auto p-0 w-full justify-start">
                <TabsTrigger
                  value="analysis"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-rhea-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm text-gray-400 data-[state=active]:text-white"
                >
                  Face Analysis
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
                <StylistUpload />
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
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-7xl mb-4 font-bold">
              <span className="text-rhea-purple">R</span>
              <span className="text-rhea-gold">h</span>
              <span className="text-rhea-purple">e</span>
              <span className="text-rhea-gold">a</span>
            </h1>
            <p className="text-gray-400 text-lg">Your AI Style Consultant</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-2xl mb-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Ask Rhea for style advice..."
                className="w-full px-6 py-4 rounded-full glass-input focus:border-rhea-purple focus:outline-none transition-all text-base"
                onFocus={() => setShowTools(true)}
              />
              <Sparkles className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-rhea-gold" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 mb-12"
          >
            <AnimatedButton
              variant="secondary"
              onClick={() => setShowTools(true)}
            >
              Style Tools
            </AnimatedButton>
            <Link href="/fits">
              <AnimatedButton variant="secondary">
                I'm Feeling Stylish
              </AnimatedButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-gray-500"
          >
            Powered by advanced AI technology
          </motion.div>
        </div>
      )}

      <footer className="py-4 px-6 border-t border-white/10 glass-card border-0 rounded-none">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-6">
            <a href="#" className="hover:text-rhea-purple transition-colors">Advertising</a>
            <a href="#" className="hover:text-rhea-purple transition-colors">Business</a>
            <a href="#" className="hover:text-rhea-purple transition-colors">How Rhea works</a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-rhea-purple transition-colors">Privacy</a>
            <a href="#" className="hover:text-rhea-purple transition-colors">Terms</a>
            <a href="#" className="hover:text-rhea-purple transition-colors">Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
