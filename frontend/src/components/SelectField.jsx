import { AlertCircle } from "lucide-react";
export default function SelectField({ 
  label, 
  options, 
  error, 
  required, 
  placeholder = "Select an option...",
  className = "",
  onBlur,
  ...props 
}) {
  const handleCapitalLabel = (option) =>{
    const newOpt = option.charAt(0).toUpperCase() + option.slice(1);
    return newOpt;
  }
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        onBlur={onBlur}
        className={`
          w-full px-4 py-3 border rounded-xl transition-all duration-200
          focus:outline-none focus:ring-2 focus:border-transparent
          ${error 
            ? 'border-red-300 focus:ring-red-200 bg-red-50' 
            : 'border-slate-300 focus:ring-blue-200 focus:border-blue-500 bg-white hover:border-slate-400'
          }
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {handleCapitalLabel(option)}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
