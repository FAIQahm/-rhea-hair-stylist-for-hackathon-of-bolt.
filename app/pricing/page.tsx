'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sparkles, Check, X } from 'lucide-react';

export default function PricingPage() {
  const features = {
    free: [
      { name: 'Face shape analysis', included: true },
      { name: 'Skin undertone detection', included: true },
      { name: 'Text-based style advice', included: true },
      { name: 'Basic hairstyle recommendations', included: true },
    ],
    pro: [] // Empty for locked state
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-rhea-purple">Simple,</span>{' '}
              <span className="text-white">Transparent</span>{' '}
              <span className="text-rhea-gold">Pricing</span>
            </h1>
            <p className="text-xl text-gray-300">
              Choose the plan that works best for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="h-full flex flex-col">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Free</h2>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-white">$0</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-300">Perfect for exploring AI style advice</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.free.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200">
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/dashboard">
                  <AnimatedButton variant="secondary" className="w-full">
                    Get Started
                  </AnimatedButton>
                </Link>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <GlassCard className="h-full flex flex-col border-2 border-white/10 relative overflow-hidden opacity-75 grayscale-[0.5]">
                {/* Locked Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6">
                  <div className="bg-white/10 p-4 rounded-full mb-4">
                    <Sparkles className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
                  <p className="text-gray-300">Pro features are currently locked.</p>
                </div>

                <div className="mb-6 blur-sm select-none">
                  <h2 className="text-2xl font-bold text-white mb-2">Pro</h2>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-rhea-purple">$14.99</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-300 mb-2">Full access to AI visualizations</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1 blur-sm select-none">
                  {/* Placeholder items to give the look of content behind the lock */}
                  {[1, 2, 3, 4, 5].map((_, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">Locked Feature</span>
                    </li>
                  ))}
                </ul>

                <div className="blur-sm select-none pointer-events-none">
                  <AnimatedButton className="w-full bg-gray-700 text-gray-400 cursor-not-allowed">
                    Upgrade to Pro
                  </AnimatedButton>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
