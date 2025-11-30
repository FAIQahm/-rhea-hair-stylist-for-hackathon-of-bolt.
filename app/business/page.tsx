'use client';

import InfoPageLayout from '@/components/InfoPageLayout';
import { GlassCard } from '@/components/ui/glass-card';
import { Building2, Lock } from 'lucide-react';

export default function BusinessPage() {
    return (
        <InfoPageLayout title="Rhea for Business">
            <div className="space-y-12">
                <section className="text-center space-y-4">
                    <h2 className="text-4xl font-bold text-white">Enterprise Style Intelligence</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Power your retail experience with the world's most advanced style recommendation engine.
                    </p>
                </section>

                <GlassCard className="p-12 border-rhea-gold/20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <Lock className="h-10 w-10 text-rhea-gold" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">API Access Coming Soon</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                We are currently optimizing our Style Graph API for enterprise scale.
                                Access will be available in the next release.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                            <Building2 className="h-4 w-4" />
                            <span>Enterprise Solutions Locked</span>
                        </div>
                    </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 pointer-events-none grayscale">
                    <GlassCard className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2">Virtual Try-On</h3>
                        <p className="text-gray-400 text-sm">AR-powered visualization for your catalog.</p>
                    </GlassCard>
                    <GlassCard className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2">Inventory Optimization</h3>
                        <p className="text-gray-400 text-sm">Predict trends based on aggregate user data.</p>
                    </GlassCard>
                    <GlassCard className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2">In-Store Kiosks</h3>
                        <p className="text-gray-400 text-sm">Bring the digital stylist to your physical locations.</p>
                    </GlassCard>
                </div>
            </div>
        </InfoPageLayout>
    );
}
