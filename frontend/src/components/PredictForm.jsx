/**
 * PredictForm - Two-column form layout with 5 numeric input fields, icons,
 * tooltips, auto-focus, inline validation with shake animation, and smart loading.
 * First 4 fields render in a 2x2 grid; the 5th field spans full width.
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback invoked with form data when the form is valid.
 * @param {boolean} props.isLoading - Whether the form is in a loading/submitting state.
 */
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import LoadingSpinner from './LoadingSpinner';

const FIELDS = [
  {
    name: 'avg_area_income',
    label: 'Area Income',
    placeholder: 'e.g. 79545',
    hint: 'Median income (USD)',
    tooltip: 'The average household income in the neighborhood.',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'avg_area_house_age',
    label: 'House Age',
    placeholder: 'e.g. 5.6',
    hint: 'Avg age in years',
    tooltip: 'The mean age of homes in the area.',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'avg_area_number_of_rooms',
    label: 'Avg Rooms',
    placeholder: 'e.g. 7',
    hint: 'Rooms per house',
    tooltip: 'Total rooms including living, kitchen, bedrooms, etc.',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    name: 'avg_area_number_of_bedrooms',
    label: 'Avg Bedrooms',
    placeholder: 'e.g. 4',
    hint: 'Bedrooms per house',
    tooltip: 'A key factor in determining home value.',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    name: 'area_population',
    label: 'Area Population',
    placeholder: 'e.g. 23000',
    hint: 'Total population of the area',
    tooltip: 'Population density affects demand and pricing.',
    fullWidth: true,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

const PredictForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const firstInputRef = useRef(null);
  const [shakeField, setShakeField] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const onError = (fieldErrors) => {
    const firstErrorField = Object.keys(fieldErrors)[0];
    if (firstErrorField) {
      setShakeField(firstErrorField);
      setTimeout(() => setShakeField(null), 500);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="animate-fade-in">
      {/* Section Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="h-1 w-1 rounded-full bg-blue-500" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Property Details
        </h2>
      </div>

      {/* 2-column grid for fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map(({ name, label, placeholder, hint, tooltip, icon, fullWidth }, index) => {
          const { ref: hookRef, ...registerProps } = register(name, {
            required: `${label} is required`,
            validate: (value) => {
              const num = parseFloat(value);
              if (isNaN(num)) return 'Must be a valid number';
              if (num <= 0) return 'Must be a positive number';
              return true;
            },
          });

          return (
            <div
              key={name}
              className={`transition-all duration-200 ${shakeField === name ? 'animate-shake' : ''} ${fullWidth ? 'sm:col-span-2' : ''}`}
            >
              {/* Label row */}
              <div className="mb-1 flex items-center gap-1.5">
                <span className="text-slate-500">{icon}</span>
                <label htmlFor={name} className="text-xs font-medium text-slate-300">
                  {label}
                </label>
                <button
                  type="button"
                  className="relative ml-auto"
                  onMouseEnter={() => setActiveTooltip(name)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onFocus={() => setActiveTooltip(name)}
                  onBlur={() => setActiveTooltip(null)}
                  aria-label={`Info about ${label}`}
                >
                  <svg className="h-3 w-3 text-slate-600 transition-colors hover:text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  {activeTooltip === name && (
                    <div className="absolute bottom-full right-0 z-10 mb-2 w-48 rounded-lg border border-slate-700 bg-navy-800 p-2.5 text-left text-[11px] text-slate-300 shadow-xl animate-fade-in">
                      {tooltip}
                    </div>
                  )}
                </button>
              </div>

              {/* Input */}
              <input
                id={name}
                type="number"
                step="any"
                placeholder={placeholder}
                disabled={isLoading}
                ref={(el) => {
                  hookRef(el);
                  if (index === 0) firstInputRef.current = el;
                }}
                className={`w-full rounded-lg border bg-navy-900/80 px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 focus:bg-navy-900 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors[name]
                    ? 'border-red-500/60 focus:ring-red-500/40'
                    : 'border-slate-700/60 hover:border-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20'
                }`}
                {...registerProps}
              />

              {/* Hint / Error */}
              {errors[name] ? (
                <p className="mt-1 text-[11px] font-medium text-red-400">{errors[name].message}</p>
              ) : (
                <p className="mt-1 text-[11px] text-slate-600">{hint}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/15 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
      >
        <svg className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
        Predict Price
      </button>
    </form>
  );
};

PredictForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PredictForm;
