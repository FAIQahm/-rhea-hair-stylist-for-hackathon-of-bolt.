'use client';

import InfoPageLayout from '@/components/InfoPageLayout';
import { GlassCard } from '@/components/ui/glass-card';

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy Policy">
      <div className="space-y-8">
        <GlassCard className="p-8 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Data Collection</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, upload photos, or communicate with us. This includes biometric data derived from your facial images, which is used solely for the purpose of providing style recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Use of Facial Data</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your facial data is processed in real-time to determine face shape and skin undertone.
              <strong className="text-white"> We do not store raw facial scans permanently.</strong>
              Once the analysis is complete (typically within seconds), the biometric map is discarded, and only the resulting style attributes (e.g., "Oval Face", "Warm Undertone") are saved to your profile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Information Sharing</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We do not sell your personal data. We may share aggregated, non-personally identifiable information with our retail partners to improve inventory recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Your Rights</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              You have the right to access, correct, or delete your personal data at any time. You can delete your entire account and all associated data directly from the Settings page.
            </p>
          </section>

          <div className="pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500">Last Updated: November 2025</p>
          </div>
        </GlassCard>
      </div>
    </InfoPageLayout>
  );
}
