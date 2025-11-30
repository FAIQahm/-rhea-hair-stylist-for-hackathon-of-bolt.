'use client';

import InfoPageLayout from '@/components/InfoPageLayout';
import { GlassCard } from '@/components/ui/glass-card';
import { ScanFace, BrainCircuit, Sparkles } from 'lucide-react';

export default function HowItWorksPage() {
    return (
        <InfoPageLayout title="How Rhea Works">
            <div className="space-y-12">
                <section className="text-center space-y-4">
                    <h2 className="text-4xl font-bold text-white">The Science of Style</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Rhea combines advanced computer vision with expert fashion theory to deliver your perfect look.
                    </p>
                </section>

                <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:pl-0 space-y-12">
                    {[
                        {
                            icon: ScanFace,
                            step: '01',
                            title: 'Biometric Analysis',
                            desc: 'Our computer vision algorithms analyze 68 facial landmarks to determine your precise face shape. We also analyze pixel-level skin tone data to identify your unique undertone (Warm, Cool, or Neutral).',
                        },
                        {
                            icon: BrainCircuit,
                            step: '02',
                            title: 'The Style Graph',
                            desc: 'Your biometric profile is mapped against our proprietary Style Graph—a database of over 10,000 fashion rules curated by top stylists. This filters out 99% of items that wouldn\'t suit you.',
                        },
                        {
                            icon: Sparkles,
                            step: '03',
                            title: 'Generative Recommendation',
                            desc: 'Finally, our generative AI composes complete outfits. It doesn\'t just pick items; it understands context (Casual, Professional, Event) and current trends to build a cohesive look.',
                        },
                    ].map((item, idx) => (
                        <div key={idx} className="relative pl-8 md:pl-0">
                            <div className="md:flex items-center gap-8">
                                <div className="hidden md:flex flex-col items-center w-32 shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-white/5 border border-rhea-gold/30 flex items-center justify-center mb-2 z-10 bg-[#0F0F0F]">
                                        <item.icon className="h-8 w-8 text-rhea-gold" />
                                    </div>
                                    <span className="text-sm font-mono text-rhea-gold">STEP {item.step}</span>
                                </div>

                                {/* Mobile Icon */}
                                <div className="absolute left-[-21px] top-0 md:hidden w-10 h-10 rounded-full bg-[#0F0F0F] border border-rhea-gold/30 flex items-center justify-center z-10">
                                    <item.icon className="h-5 w-5 text-rhea-gold" />
                                </div>

                                <GlassCard className="flex-1 p-8">
                                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </GlassCard>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </InfoPageLayout>
    );
}
