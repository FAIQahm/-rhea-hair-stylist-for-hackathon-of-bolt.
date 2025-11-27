import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <GlassCard>
            <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                <strong>Last Updated:</strong> November 26, 2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300 mb-4">
                  By accessing and using Rhea, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
                <p className="text-gray-300 mb-4">
                  Rhea is an AI-powered conversational stylist platform that provides:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Face shape analysis and skin undertone detection</li>
                  <li>Personalized hairstyle and style recommendations</li>
                  <li>AI-generated visualization of potential looks (Pro tier)</li>
                  <li>Digital wardrobe management</li>
                  <li>Shoppable product recommendations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                <p className="text-gray-300 mb-4">
                  To access certain features, you must create an account. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Providing accurate and current information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Subscription and Payment</h2>
                <p className="text-gray-300 mb-4">
                  <strong>Free Tier:</strong> Access to basic features including face analysis and limited wardrobe storage (15 items).
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Pro Tier:</strong> $14.99/month or $99/year. Includes unlimited wardrobe storage, AI visualizations, and premium features. Subscriptions automatically renew unless canceled.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Credits:</strong> Pro tier includes 1,000 credits per month. Each look generation costs 50 credits. Unused credits do not roll over.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Cancellation and Refunds</h2>
                <p className="text-gray-300 mb-4">
                  You may cancel your subscription at any time. Cancellations take effect at the end of the current billing period. Refunds are provided on a case-by-case basis within 7 days of purchase.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. User Content</h2>
                <p className="text-gray-300 mb-4">
                  You retain ownership of content you upload. By uploading content, you grant Rhea a license to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Process and analyze your images for providing services</li>
                  <li>Store your content securely on our servers</li>
                  <li>Use anonymized data to improve our AI models</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  You must not upload content that is illegal, harmful, or infringes on others' rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Acceptable Use</h2>
                <p className="text-gray-300 mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Use the service for any illegal purpose</li>
                  <li>Attempt to reverse engineer or hack the platform</li>
                  <li>Upload malicious content or spam</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Impersonate others or misrepresent your identity</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. AI-Generated Content</h2>
                <p className="text-gray-300 mb-4">
                  AI-generated visualizations are for entertainment and inspiration purposes. Results may not be perfectly accurate. We do not guarantee that generated looks can be exactly replicated in real life.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Affiliate Links</h2>
                <p className="text-gray-300 mb-4">
                  Rhea may include affiliate links to products. We may earn a commission when you purchase through these links at no additional cost to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-300 mb-4">
                  Rhea is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
                <p className="text-gray-300 mb-4">
                  We reserve the right to suspend or terminate your account for violations of these terms or for any other reason at our discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
                <p className="text-gray-300 mb-4">
                  We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
                <p className="text-gray-300 mb-4">
                  For questions about these Terms of Service, contact us at:
                </p>
                <p className="text-gray-300">
                  Email: legal@rhea.app
                </p>
              </section>
            </div>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
