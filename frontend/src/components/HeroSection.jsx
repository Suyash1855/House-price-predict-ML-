/**
 * HeroSection - Left-side hero content: badge, headline, subtitle, stats.
 * Designed to sit beside the form in a split-screen layout.
 * On mobile, stacks above the form.
 */

const HeroSection = () => {
  return (
    <div className="flex flex-col justify-center">
      {/* Badge */}
      <div className="animate-fade-in-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">
        <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse-glow" />
        <span className="text-xs font-medium text-blue-300">AI-Powered Predictions</span>
      </div>

      {/* Headline */}
      <h1 className="animate-fade-in-up text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
        Estimate Your{' '}
        <br className="hidden sm:block" />
        House Price{' '}
        <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Instantly
        </span>
      </h1>

      {/* Subheadline */}
      <p className="animate-fade-in-up-delay mt-4 max-w-md text-sm text-slate-400 sm:text-base">
        AI-powered predictions based on real-world housing data. Get accurate estimates in seconds.
      </p>

      {/* Stats row */}
      <div className="animate-fade-in-up-delay-2 mt-8 grid grid-cols-3 gap-4 sm:gap-6">
        {[
          { value: '<2s', label: 'Prediction Time' },
          { value: '95%+', label: 'Accuracy Rate' },
          { value: '5', label: 'Key Features' },
        ].map(({ value, label }) => (
          <div key={label} className="rounded-xl border border-slate-700/30 bg-navy-800/50 px-3 py-3 text-center">
            <p className="text-lg font-bold text-white sm:text-xl">{value}</p>
            <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="animate-fade-in-up-delay-2 mt-6 flex flex-wrap items-center gap-4">
        {['Data-Driven', 'Fast & Free', 'No Sign-up'].map((text) => (
          <div key={text} className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-xs text-slate-400">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
