export default function InfoField({ label, value, icon, multiline = false }) {
  return (
    <div className="flex flex-col gap-2 space-y-1">
      <label className="text-sm text-left font-medium text-slate-600">{label}</label>
      <div className="flex items-start gap-2">
        {icon && <div className="text-slate-400 mt-0.5">{icon}</div>}
        <p className={`text-slate-900 ${multiline ? 'leading-relaxed' : ''}`}>
          {value || 'Not provided'}
        </p>
      </div>
    </div>
  );
}