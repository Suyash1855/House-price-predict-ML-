/**
 * ErrorCard - Human-friendly error state with a warm tone,
 * retry button, and helpful suggestions.
 *
 * @param {Object} props
 * @param {string} props.message - The error message to display.
 * @param {Function} props.onRetry - Callback invoked when the "Try Again" button is clicked.
 */
import PropTypes from 'prop-types';

const ErrorCard = ({ message, onRetry }) => {
  return (
    <div className="animate-fade-in flex flex-col items-center gap-6 py-4 text-center">
      {/* Animated Error Icon */}
      <div className="relative animate-scale-in">
        <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-pulse-glow" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/5">
          <svg
            className="h-9 w-9 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white">
          Oops! Something didn&apos;t go as planned
        </h2>
        <p className="text-sm text-slate-400">{message}</p>
      </div>

      {/* Suggestion */}
      <div className="flex items-start gap-2 rounded-xl border border-slate-700/30 bg-navy-900/60 px-4 py-3 text-left">
        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
        <p className="text-xs text-slate-400">
          Please check your inputs or try again. If the problem persists, the prediction server may be temporarily unavailable.
        </p>
      </div>

      <button
        onClick={onRetry}
        className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/15 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.98]"
      >
        Try Again
      </button>
    </div>
  );
};

ErrorCard.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorCard;
