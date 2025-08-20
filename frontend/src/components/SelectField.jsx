
export default function SelectField({ label, options, ...props }) {
  const handleCapitalLabel = (option) =>{
    const newOpt = option.charAt(0).toUpperCase() + option.slice(1);
    return newOpt;
  }


  return (
    <div>
      <div className="space-y-1">
        <label>{label}:</label>
        <select {...props}>
          <option value="">Select {label.toLowerCase()}</option>
          {options.map(opt => (
            <option key={opt} value={opt.toLowerCase()}>
              {handleCapitalLabel(opt)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
