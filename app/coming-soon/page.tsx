'use client';

import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function ComingSoon() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rhea-purple/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rhea-gold/10 rounded-full blur-3xl" />
            </div>

            <GlassCard className="max-w-md w-full p-12 text-center border-rhea-gold/20">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-rhea-gold/30">
                        <Sparkles className="h-8 w-8 text-rhea-gold" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
                <p className="text-gray-400 mb-8">
                    We are currently crafting this experience. Stay tuned for something extraordinary.
                </p>

                <Link href="/dashboard">
                    <AnimatedButton className="w-full">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Dashboard
                    </AnimatedButton>
                </Link>
            </GlassCard>
        </div>
    );
}
