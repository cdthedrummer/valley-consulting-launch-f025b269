import React from "react";
import SEOHead from "@/components/SEOHead";

const Refunds: React.FC = () => {
  return (
    <div className="min-h-screen bg-warm-cream">
      <SEOHead
        title="Refund Policy | Hudson Valley Consulting"
        description="Detailed refund policy for AI Copilot subscriptions including 7-day free trial and 14-day money-back guarantee."
        canonicalUrl="/refunds"
        keywords="refund policy, money back guarantee, AI Copilot, subscription cancellation, Hudson Valley Consulting"
      />
      
      <header className="bg-club-green text-warm-cream py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-archivo font-bold uppercase tracking-wide text-action-yellow">Refund Policy</h1>
          <p className="text-warm-cream/80 mt-2 font-dm">AI Copilot subscription refund details and guarantees</p>
        </div>
      </header>

      <main className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 prose prose-slate max-w-none font-dm">
          
          <section className="mb-8">
            <h2 className="text-2xl font-archivo font-bold text-action-yellow mb-4">1) Who this applies to</h2>
            <p className="text-gray-700">This policy covers AI Copilot monthly subscriptions purchased directly via Stripe.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">2) Free trial</h2>
            <p className="text-gray-700 mb-3">Most plans include a 7-day free trial.</p>
            <p className="text-gray-700">Cancel before the trial ends and you won't be charged.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">3) 14-day "no-questions-asked" refund</h2>
            <p className="text-gray-700 mb-3">When your trial ends and your first monthly payment is charged, you have 14 calendar days to request a full refund.</p>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-hvcg-blue-dark">
              <p className="text-gray-700 font-medium">Example:</p>
              <p className="text-gray-700">Start trial on the 1st → trial ends on the 7th → first charge on the 8th → full-refund window is the 8th–21st.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">4) Ongoing satisfaction guarantee (prorated refunds anytime)</h2>
            <p className="text-gray-700 mb-3">At any time after the 14-day window, if you're not satisfied, you can cancel and request a prorated refund for the unused portion of your current billing period.</p>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-2">Proration method:</h3>
              <p className="text-gray-700 mb-3">Refund = (Monthly price) × (unused days ÷ total days in billing period).</p>
              <p className="text-gray-700 mb-3">We calculate from the time your request is received.</p>
              
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-hvcg-blue-dark">
                <p className="text-gray-700 font-medium">Example:</p>
                <p className="text-gray-700">$99/month, 30-day cycle. You request a refund with 10 days left → refund is $99 × (10/30) = $33.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">5) How to cancel or request a refund</h2>
            <div className="mb-4">
              <p className="text-gray-700 mb-3"><strong>Fastest:</strong> Use your Stripe Customer Portal link (found in your signup or payment emails) to cancel.</p>
              <p className="text-gray-700 mb-3"><strong>Need help or want a refund processed for you?</strong> Email <a href="mailto:contact@hvcg.com" className="text-hvcg-blue-dark hover:underline">contact@hvcg.com</a> with the email used at checkout.</p>
              <p className="text-gray-700">If you cancel in the portal and want a prorated refund, please send a quick note so we can process it right away.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">6) Effective timing & access</h2>
            <p className="text-gray-700 mb-3">You can choose to cancel immediately (access ends now) or at period end (keep access through the paid month).</p>
            <p className="text-gray-700">Prorated refunds are based on unused time from when you request cancellation/refund. If you choose "at period end," there may be no unused time to refund.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">7) Refund method & timing</h2>
            <p className="text-gray-700 mb-3">Refunds are returned to your original payment method via Stripe.</p>
            <p className="text-gray-700">Banks typically post refunds within 5–10 business days (varies by bank).</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">8) What's not covered</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Purchases made through third-party stores or resellers (request refunds through that platform).</li>
              <li>Chargebacks filed with your bank while a refund is already in progress (we'll work with you, but duplicate processes may delay resolution).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">9) One more thing</h2>
            <p className="text-gray-700 mb-3">"No questions asked" means exactly that—though optional feedback is always appreciated so we can improve.</p>
            <p className="text-gray-700">We reserve the right to investigate and decline refunds in cases of fraud or abuse (e.g., repeated sign-ups to obtain multiple free trials), but this won't affect good-faith requests.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">10) Contact</h2>
            <p className="text-gray-700 mb-3">Questions or a hand with the portal? <a href="mailto:contact@hvcg.com" className="text-hvcg-blue-dark hover:underline">contact@hvcg.com</a></p>
            <p className="text-gray-600 text-sm">Effective date: August 21, 2025</p>
          </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Refunds;