'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';

interface InfoPageLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function InfoPageLayout({ title, children }: InfoPageLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="px-6 py-4 flex items-center justify-between glass-card border-0 border-b border-white/10 rounded-none sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <AnimatedButton variant="secondary" className="px-4 py-2 text-sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </AnimatedButton>
                    </Link>
                </div>
                <h1 className="text-xl font-bold text-white">{title}</h1>
                <div className="w-[140px]" /> {/* Spacer for centering */}
            </nav>

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>

            <footer className="py-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Rhea Style Consultant. All rights reserved.</p>
            </footer>
        </div>
    );
}
