'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sparkles, Wand2, Image, Shirt } from 'lucide-react';
import { useAuth } from '@/lib/auth-provider';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="h-12 w-12 text-rhea-purple" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 max-w-4xl"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="text-rhea-purple">AI-Powered</span>{' '}
            <span className="text-white">Style</span>{' '}
            <span className="text-rhea-gold">Consultation</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover your perfect look with advanced face shape analysis and personalized hairstyle recommendations
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <AnimatedButton className="px-8 py-4 text-lg">
                <Sparkles className="h-5 w-5" />
                Get Started
              </AnimatedButton>
            </Link>
            <Link href="/pricing">
              <AnimatedButton variant="secondary" className="px-8 py-4 text-lg">
                View Pricing
              </AnimatedButton>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="text-center h-full">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rhea-purple/20 flex items-center justify-center">
                <Wand2 className="h-8 w-8 text-rhea-purple" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Face Shape Analysis</h3>
              <p className="text-gray-300">
                Advanced AI analyzes your facial structure to determine your unique face shape and skin undertone
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="text-center h-full">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rhea-gold/20 flex items-center justify-center">
                <Image className="h-8 w-8 text-rhea-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Style Visualization</h3>
              <p className="text-gray-300">
                Generate photorealistic previews of hairstyles and looks tailored specifically for you
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="text-center h-full">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rhea-purple/20 flex items-center justify-center">
                <Shirt className="h-8 w-8 text-rhea-purple" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Wardrobe Management</h3>
              <p className="text-gray-300">
                Build your digital wardrobe and get AI-powered outfit recommendations for any occasion
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
