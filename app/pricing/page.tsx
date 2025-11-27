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
      { name: '15 wardrobe items', included: true },
      { name: 'Photorealistic visualizations', included: false },
      { name: 'Unlimited wardrobe storage', included: false },
      { name: 'AI-generated outfit previews', included: false },
      { name: 'Priority support', included: false },
    ],
    pro: [
      { name: 'Face shape analysis', included: true },
      { name: 'Skin undertone detection', included: true },
      { name: 'Text-based style advice', included: true },
      { name: 'Advanced hairstyle recommendations', included: true },
      { name: 'Unlimited wardrobe storage', included: true },
      { name: 'Photorealistic visualizations', included: true },
      { name: 'AI-generated outfit previews', included: true },
      { name: 'Shoppable product links', included: true },
      { name: 'Priority support', included: true },
    ],
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
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-200' : 'text-gray-600'}>
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
            >
              <GlassCard className="h-full flex flex-col border-2 border-rhea-purple relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="bg-rhea-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Pro</h2>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-rhea-purple">$14.99</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-300 mb-2">Full access to AI visualizations</p>
                  <p className="text-sm text-gray-400">or $99/year (save $80)</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.pro.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-rhea-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200">{feature.name}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/dashboard">
                  <AnimatedButton className="w-full">
                    <Sparkles className="h-5 w-5" />
                    Upgrade to Pro
                  </AnimatedButton>
                </Link>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <GlassCard className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Pro Credits System</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-rhea-purple mb-2">50</div>
                  <p className="text-sm text-gray-300">Credits per look generation</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rhea-gold mb-2">1000</div>
                  <p className="text-sm text-gray-300">Credits included monthly</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rhea-purple mb-2">~20</div>
                  <p className="text-sm text-gray-300">Looks per month</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
