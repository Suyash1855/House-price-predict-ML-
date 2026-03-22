/**
 * Footer - Lightweight footer with app attribution.
 */

const Footer = () => {
  return (
    <footer className="border-t border-slate-800/60 py-8 text-center">
      <p className="text-sm font-medium text-slate-500">
        House Price Predictor
      </p>
      <p className="mt-1 text-xs text-slate-600">
        Built with Machine Learning + FastAPI + React
      </p>
    </footer>
  );
};

export default Footer;
