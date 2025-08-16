
export default function SelectField({ label, options, ...props }) {
  return (
    <div>
      <div className="space-y-1">
        <label>{label}:</label>
        <select {...props}>
          <option value="">Select {label.toLowerCase()}</option>
          {options.map(opt => (
            <option key={opt} value={opt.toLowerCase()}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
