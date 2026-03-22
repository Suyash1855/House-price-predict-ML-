/**
 * LoadingSpinner - Smart loading experience with rotating status messages
 * and an animated progress bar to create a "perceived intelligence" feel.
 *
 * @param {Object} props
 * @param {boolean} [props.inline] - If true, renders a compact inline spinner for buttons.
 */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LOADING_MESSAGES = [
  'Analyzing market trends...',
  'Evaluating property factors...',
  'Comparing regional data...',
  'Calculating estimate...',
];

const LoadingSpinner = ({ inline = false }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  if (inline) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <span className="text-sm">{LOADING_MESSAGES[messageIndex]}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 py-8 animate-fade-in">
      {/* Pulsing brain icon */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse-glow" />
        <svg className="relative h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      </div>

      {/* Rotating message */}
      <p className="h-5 text-sm font-medium text-slate-300 transition-all duration-300">
        {LOADING_MESSAGES[messageIndex]}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-[240px] overflow-hidden rounded-full bg-slate-700/50">
        <div className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progress" />
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  inline: PropTypes.bool,
};

export default LoadingSpinner;
