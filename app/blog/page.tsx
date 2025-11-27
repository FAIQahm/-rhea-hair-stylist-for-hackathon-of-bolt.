'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: 'Understanding Your Face Shape: A Complete Guide',
      excerpt: 'Learn how to identify your face shape and why it matters for choosing the perfect hairstyle.',
      date: 'November 20, 2025',
      category: 'Style Guide',
    },
    {
      title: 'The Science Behind Skin Undertones',
      excerpt: 'Discover how AI analyzes skin undertones and how this affects your color recommendations.',
      date: 'November 15, 2025',
      category: 'Technology',
    },
    {
      title: 'Building Your Digital Wardrobe: Best Practices',
      excerpt: 'Tips for organizing your wardrobe and getting the most out of AI-powered outfit suggestions.',
      date: 'November 10, 2025',
      category: 'Tips & Tricks',
    },
  ];

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
              <span className="text-rhea-purple">Rhea</span>{' '}
              <span className="text-white">Blog</span>
            </h1>
            <p className="text-xl text-gray-300">
              Style tips, technology insights, and fashion trends
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <GlassCard className="h-full flex flex-col hover:border-rhea-purple transition-colors cursor-pointer">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-rhea-gold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
                  <p className="text-gray-300 mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-rhea-purple" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <GlassCard className="text-center">
              <Sparkles className="h-12 w-12 text-rhea-purple mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">More Content Coming Soon</h3>
              <p className="text-gray-300">
                Stay tuned for more style guides, AI technology insights, and fashion trends
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
