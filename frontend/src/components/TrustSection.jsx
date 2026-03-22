/**
 * TrustSection - Displays "How it works" and trust signals below the main form.
 * Builds user confidence in the prediction tool.
 */

const STEPS = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    title: 'Enter Details',
    desc: 'Fill in 5 key property features about the area',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'AI Analyzes',
    desc: 'Our model evaluates market patterns and trends',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Get Estimate',
    desc: 'Receive an instant, data-driven price prediction',
  },
];

const TRUST_ITEMS = [
  { label: 'Fast & Free', desc: 'Instant results, no sign-up required' },
  { label: 'Data-Driven', desc: 'Trained on real US housing datasets' },
  { label: 'Consistent', desc: 'Reliable predictions every time' },
];

const TrustSection = () => {
  return (
    <section className="mx-auto mt-20 mb-20 max-w-3xl px-4 pb-10">
      {/* How it works */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-white sm:text-2xl">How It Works</h2>
        <p className="mt-2 text-sm text-slate-400">Three simple steps to your estimate</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {STEPS.map(({ icon, title, desc }, i) => (
          <div
            key={title}
            className="group relative rounded-2xl border border-slate-700/40 bg-navy-800 p-6 text-center transition-all duration-300 hover:border-blue-500/30 hover:bg-navy-800/80"
          >
            {/* Step number */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500/10 px-3 py-0.5 text-xs font-semibold text-blue-400">
              {i + 1}
            </div>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors duration-300 group-hover:bg-blue-500/20">
              {icon}
            </div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="mt-1 text-xs text-slate-400">{desc}</p>
          </div>
        ))}
      </div>

      {/* Trust signals */}
      <div className="mt-16 rounded-2xl border border-slate-700/30 bg-navy-800/50 p-6 sm:p-8">
        <h3 className="text-center text-base font-semibold text-white">Why Trust This Tool?</h3>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TRUST_ITEMS.map(({ label, desc }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500/10">
                <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
