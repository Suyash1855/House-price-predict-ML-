/**
 * ResultCard - Premium result display with animated price reveal,
 * contextual insight, icon-based input breakdown, and action buttons.
 *
 * @param {Object} props
 * @param {number} props.predictedPrice - The predicted price returned by the API.
 * @param {Object} props.inputData - The original form values submitted by the user.
 * @param {Function} props.onReset - Callback invoked when "Predict Another" is clicked.
 * @param {Function} props.onAdjust - Callback invoked when "Adjust Inputs" is clicked.
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, formatNumber } from '../utils/formatters';

const INPUT_LABELS = [
  {
    key: 'avg_area_income',
    label: 'Area Income',
    prefix: '$',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'avg_area_house_age',
    label: 'House Age',
    suffix: ' yrs',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'avg_area_number_of_rooms',
    label: 'Rooms',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    key: 'avg_area_number_of_bedrooms',
    label: 'Bedrooms',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    key: 'area_population',
    label: 'Population',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

/**
 * Returns a contextual insight based on the predicted price.
 */
const getInsight = (price) => {
  if (price >= 1500000) {
    return { text: 'This is a premium property estimate — well above the area average.', tone: 'text-purple-400' };
  }
  if (price >= 1000000) {
    return { text: 'This property falls in the upper range for similar areas.', tone: 'text-blue-400' };
  }
  if (price >= 500000) {
    return { text: 'This falls within the typical price range for this type of area.', tone: 'text-green-400' };
  }
  return { text: 'This estimate is below average — may indicate a developing area.', tone: 'text-amber-400' };
};

const ResultCard = ({ predictedPrice, inputData, onReset, onAdjust }) => {
  const [displayPrice, setDisplayPrice] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const insight = getInsight(predictedPrice);

  // Animated count-up effect
  useEffect(() => {
    setRevealed(true);
    const duration = 1200;
    const steps = 40;
    const increment = predictedPrice / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, predictedPrice);
      setDisplayPrice(Math.round(current));
      if (step >= steps) {
        clearInterval(timer);
        setDisplayPrice(predictedPrice);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [predictedPrice]);

  return (
    <div className={`flex flex-col items-center gap-6 transition-all duration-700 ease-out ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {/* Success badge */}
      <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 animate-scale-in">
        <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs font-medium text-green-300">Prediction Complete</span>
      </div>

      {/* Price Display */}
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
          Estimated Value
        </p>
        <p className="price-glow mt-3 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          {formatCurrency(displayPrice)}
        </p>
      </div>

      {/* Contextual insight */}
      <div className="flex items-start gap-2 rounded-xl border border-slate-700/30 bg-navy-900/60 px-4 py-3">
        <svg className={`mt-0.5 h-4 w-4 flex-shrink-0 ${insight.tone}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
        <p className="text-xs text-slate-400">{insight.text}</p>
      </div>

      {/* Model info */}
      <p className="text-xs text-slate-600">
        Based on Linear Regression analysis of area-level features
      </p>

      {/* Input Breakdown Grid */}
      <div className="w-full rounded-xl border border-slate-700/30 bg-navy-900/60 p-5">
        <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          Input Summary
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {INPUT_LABELS.map(({ key, label, prefix, suffix, icon }) => (
            <div key={key} className="rounded-lg border border-slate-700/20 bg-navy-800/50 p-3">
              <div className="mb-1 text-slate-500">{icon}</div>
              <p className="text-xs text-slate-500">{label}</p>
              <p className="text-sm font-semibold text-white">
                {prefix || ''}{formatNumber(parseFloat(inputData[key]))}{suffix || ''}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full gap-3">
        {onAdjust && (
          <button
            onClick={onAdjust}
            className="flex-1 rounded-xl border border-slate-700/50 bg-navy-900/60 py-3 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-navy-800 hover:text-white active:scale-[0.98]"
          >
            Adjust Inputs
          </button>
        )}
        <button
          onClick={onReset}
          className={`rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/15 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.98] ${onAdjust ? 'flex-1' : 'w-full'}`}
        >
          Predict Another
        </button>
      </div>
    </div>
  );
};

ResultCard.propTypes = {
  predictedPrice: PropTypes.number.isRequired,
  inputData: PropTypes.shape({
    avg_area_income: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    avg_area_house_age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    avg_area_number_of_rooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    avg_area_number_of_bedrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    area_population: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onReset: PropTypes.func.isRequired,
  onAdjust: PropTypes.func,
};

export default ResultCard;
