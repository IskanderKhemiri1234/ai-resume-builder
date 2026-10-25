
export const metadata = {
  title: 'Privacy Policy & Terms | ResuMaker AI',
  description:
    'Learn how ResuMaker AI handles information, AI-generated content, payments, cookies, and user responsibilities.',
};

export default function PrivacyTerms() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 font-sans text-slate-300 sm:px-12 lg:px-24">
      <article className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <a
            href="/"
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            ← Back to ResuMaker AI
          </a>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Privacy Policy & Terms of Service
          </h1>

          <p className="text-sm text-slate-400">
            Last updated: October 2026
          </p>

          <p className="leading-relaxed">
            This page explains the general principles for using ResuMaker AI.
            It must be reviewed and updated to reflect the services, data
            practices, payment providers, and legal requirements that actually
            apply to this website.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">
            1. About the service
          </h2>
          <p className="leading-relaxed">
            ResuMaker AI provides career-writing tools intended to help users
            prepare resumes, cover letters, professional profiles, and
            interview practice materials. Generated content may contain errors
            and should be reviewed before use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">
            2. Information you provide
          </h2>
          <p className="leading-relaxed">
            Information submitted to the website may include your name,
            target job, work experience, skills, and other career details.
            Provide only information needed for your task, and avoid submitting
            passwords, identity documents, or other sensitive information.
          </p>
          <p className="leading-relaxed">
            When AI generation is enabled, submitted prompts may be sent to an
            external AI provider to generate a response. The provider's
            processing and retention practices depend on its applicable terms
            and privacy policy. Do not assume that submitted information is
            never stored.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">
            3. How information may be used
          </h2>
          <p className="leading-relaxed">
            Information may be used to provide requested features, respond to
            support inquiries, maintain security, diagnose technical problems,
            and improve the service. Any analytics, mailing lists, advertising,
            or additional data processing should be disclosed here before
            those features are activated.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">
            4. Payments and subscriptions
          </h2>
          <p className="leading-relaxed">
            Paid plans must not be considered available until a payment
            provider and a working checkout process have been configured.
            Where payments are offered, the checkout provider, applicable
            prices, subscription conditions, cancellation procedure, and
            refund policy should be clearly disclosed before purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">
            5. Cookies and advertising
          </h2>
          <p className="leading-relaxed">
            Essential technical storage may be used where required for the
            website to function. Analytics, advertising cookies, and
            third-party advertising should only be described as active when
            they have actually been configured. Any consent requirements that
            apply must be respected.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">
            6. Security and data retention
          </h2>
          <p className="leading-relaxed">
            Reasonable technical and organizational measures should be used
            to protect information. No internet service can guarantee absolute
            security. The final policy should explain how long information is
            retained and how users can request access, correction, or deletion
            where applicable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">
            7. Acceptable use and responsibility
          </h2>
          <p className="leading-relaxed">
            You are responsible for reviewing generated material for accuracy,
            truthfulness, and suitability before submitting it to an employer
            or another person. Do not use the service to fabricate credentials,
            misrepresent employment history, or violate another person's
            rights.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">
            8. Changes to this page
          </h2>
          <p className="leading-relaxed">
            This page may be updated as the service changes. The published
            policy should identify the responsible operator and provide
            accurate contact details and any notices required by applicable
            law.
          </p>
        </section>

        <footer className="space-y-3 border-t border-slate-800 pt-8">
          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p>
            Email:{' '}
            <a
              href="mailto:support@khemiri-resumaker-ai.vercel.app"
              className="text-indigo-400 hover:text-indigo-300"
            >
              support@khemiri-resumaker-ai.vercel.app
            </a>
          </p>
          <p className="text-xs leading-relaxed text-slate-500">
            © 2026 ResuMaker AI. This template is not legal advice and must be
            completed with the actual operator details and practices before
            being treated as a final legal policy.
          </p>
        </footer>
      </article>
    </main>
  );
}
