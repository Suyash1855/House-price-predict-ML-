/**
 * App - Root component with a split-screen layout.
 * Left side: Hero content (headline, stats, trust badges).
 * Right side: Prediction form / result / error card.
 * Both visible on first page load — no scrolling required.
 */
import { useState, useRef } from 'react';
import HeroSection from './components/HeroSection';
import PredictForm from './components/PredictForm';
import ResultCard from './components/ResultCard';
import ErrorCard from './components/ErrorCard';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import { predict } from './services/api';

const App = () => {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const formDataRef = useRef(null);

  const handleSubmit = async (formData) => {
    setStatus('loading');
    formDataRef.current = formData;

    try {
      const data = await predict(formData);
      setResult(data);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setResult(null);
    setError('');
    formDataRef.current = null;
  };

  const handleAdjust = () => {
    setStatus('idle');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen">
      {/* ============ MAIN SPLIT-SCREEN SECTION ============ */}
      <section className="hero-gradient grid-pattern relative min-h-screen">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/3 h-56 w-56 rounded-full bg-purple-500/5 blur-3xl" />

        {/* Content: 2-column on desktop, stacked on mobile */}
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-8 px-4 py-10 lg:flex-row lg:gap-12 lg:px-12 lg:py-0">
          {/* LEFT — Hero Content */}
          <div className="flex-1 pt-6 lg:pt-0">
            <HeroSection />
          </div>

          {/* RIGHT — Form Card */}
          <div className="w-full max-w-[480px] flex-shrink-0 lg:w-[480px]">
            <div className="rounded-2xl border border-slate-700/40 bg-navy-800 p-5 shadow-2xl shadow-black/30 sm:p-7">
              {/* Card Header */}
              <div className="mb-5 text-center">
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  {status === 'success'
                    ? 'Your Estimate'
                    : status === 'error'
                      ? 'We Hit a Snag'
                      : 'House Price Predictor'}
                </h2>
                {status === 'idle' && (
                  <p className="mt-1 text-xs text-slate-400">
                    Fill in property details for an instant estimate
                  </p>
                )}
              </div>

              {/* Screen States */}
              {(status === 'idle' || status === 'loading') && (
                <PredictForm
                  onSubmit={handleSubmit}
                  isLoading={status === 'loading'}
                />
              )}

              {status === 'success' && result && (
                <ResultCard
                  predictedPrice={result.predicted_price}
                  inputData={formDataRef.current}
                  onReset={handleReset}
                  onAdjust={handleAdjust}
                />
              )}

              {status === 'error' && (
                <ErrorCard message={error} onRetry={handleReset} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST SECTION ============ */}
      <TrustSection />

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
};

export default App;
