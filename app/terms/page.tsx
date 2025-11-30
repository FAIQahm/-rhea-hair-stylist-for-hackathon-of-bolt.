'use client';

import InfoPageLayout from '@/components/InfoPageLayout';
import { GlassCard } from '@/components/ui/glass-card';

export default function TermsPage() {
  return (
    <InfoPageLayout title="Terms of Service">
      <div className="space-y-8">
        <GlassCard className="p-8 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              By accessing or using the Rhea application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. AI Recommendations</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Rhea uses artificial intelligence to generate style recommendations. While we strive for accuracy, fashion is subjective. We do not guarantee that every recommendation will perfectly suit your personal taste or fit. Purchases made based on our recommendations are at your own discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. User Conduct</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              You agree not to misuse our services, including but not limited to: uploading inappropriate content, attempting to reverse engineer our AI models, or using the service for unauthorized commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              The design, code, and "Style Graph" technology are the exclusive property of Rhea. You retain ownership of the photos you upload, but grant us a limited license to process them for the purpose of providing the service.
            </p>
          </section>
        </GlassCard>
      </div>
    </InfoPageLayout>
  );
}
