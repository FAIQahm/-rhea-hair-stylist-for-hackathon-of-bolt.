'use client';

import InfoPageLayout from '@/components/InfoPageLayout';
import { GlassCard } from '@/components/ui/glass-card';
import { TrendingUp, Users, Zap } from 'lucide-react';

export default function AdvertisingPage() {
    return (
        <InfoPageLayout title="Advertising">
            <div className="space-y-12">
                <section className="text-center space-y-4">
                    <h2 className="text-4xl font-bold text-white">Reach the Future of Fashion</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Connect with a highly engaged audience of style-conscious individuals actively seeking their next look.
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Users, title: 'High Engagement', desc: 'Users spend an average of 15 minutes per session exploring styles.' },
                        { icon: TrendingUp, title: 'Purchase Intent', desc: '70% of users click through to purchase recommended items.' },
                        { icon: Zap, title: 'AI Targeting', desc: 'Precise placement based on face shape, undertone, and style preferences.' },
                    ].map((item, idx) => (
                        <GlassCard key={idx} className="p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                <item.icon className="h-6 w-6 text-rhea-gold" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </GlassCard>
                    ))}
                </div>

                <GlassCard className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Partnership Opportunities</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-rhea-gold shrink-0" />
                            <div>
                                <h4 className="text-lg font-semibold text-white">Native Product Integration</h4>
                                <p className="text-gray-400">Have your products recommended directly within our AI's style suggestions.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-rhea-gold shrink-0" />
                            <div>
                                <h4 className="text-lg font-semibold text-white">Brand Takeovers</h4>
                                <p className="text-gray-400">Exclusive sponsorship of specific style archetypes or seasonal collections.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10 text-center space-y-4">
                        <p className="text-gray-300 mb-4">Ready to partner with Rhea?</p>

                        <div className="flex flex-col items-center gap-4">
                            <a
                                href="https://wa.me/message/LKPSFIL36ZEPE1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 inline-flex bg-[#25D366] text-white shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 w-full md:w-auto"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                Chat on WhatsApp
                            </a>

                            <a
                                href="mailto:faiqahmedsiddiqui06@gmail.com"
                                className="px-8 py-3 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 inline-flex rhea-gradient text-white shadow-lg shadow-purple-500/50 hover:scale-105 active:scale-95 w-full md:w-auto"
                            >
                                faiqahmedsiddiqui06@gmail.com
                            </a>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </InfoPageLayout>
    );
}
