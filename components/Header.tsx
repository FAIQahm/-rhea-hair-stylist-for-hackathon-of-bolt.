'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between glass-card border-0 border-b border-white/10 rounded-none backdrop-blur-lg">
      <Link href="/" className="flex items-center gap-2 group">
        <Sparkles className="h-6 w-6 text-rhea-purple group-hover:text-rhea-gold transition-colors" />
        <span className="text-xl font-bold text-white">Rhea</span>
      </Link>

      <nav className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm transition-colors',
              pathname === link.href
                ? 'text-rhea-purple font-semibold'
                : 'text-gray-300 hover:text-rhea-purple'
            )}
          >
            {link.label}
          </Link>
        ))}

        <Link href="/dashboard">
          <AnimatedButton variant="secondary" className="px-6">
            Dashboard
          </AnimatedButton>
        </Link>
      </nav>
    </header>
  );
}
