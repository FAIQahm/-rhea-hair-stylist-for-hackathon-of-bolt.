import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <GlassCard>
            <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                <strong>Last Updated:</strong> November 26, 2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                <p className="text-gray-300 mb-4">
                  Rhea collects the following types of information to provide and improve our AI-powered style consultation services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Profile photos for face shape analysis</li>
                  <li>Wardrobe item images uploaded by users</li>
                  <li>User preferences and style selections</li>
                  <li>Account information and authentication data</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-300 mb-4">
                  We use the collected information to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Provide personalized style recommendations</li>
                  <li>Generate AI-powered visualizations and outfit suggestions</li>
                  <li>Improve our machine learning models and services</li>
                  <li>Communicate with you about your account and updates</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Data Storage and Security</h2>
                <p className="text-gray-300 mb-4">
                  Your data is stored securely using industry-standard encryption methods. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Third Parties</h2>
                <p className="text-gray-300 mb-4">
                  We do not sell your personal information. We may share data with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Service providers who assist in operating our platform</li>
                  <li>AI service providers for image analysis and generation</li>
                  <li>Affiliate partners when you click on shoppable links</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
                <p className="text-gray-300 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data in a portable format</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
                <p className="text-gray-300 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
                <p className="text-gray-300 mb-4">
                  Rhea is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
                <p className="text-gray-300 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                <p className="text-gray-300 mb-4">
                  If you have questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <p className="text-gray-300">
                  Email: privacy@rhea.app
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
