import { Check, Eye, EyeOff, Heart, Mail, MapPin, RefreshCw, Save, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { addPatient } from '../api/patient';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
const DEFAULT_DATA = {
  firstName: "",
  lastName: "",
  middleName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  contactNumber: "",
  alternateContactNumber: "",
  address: {
    street: "",
    city: "",
    province: "",
    zipCode: "",
    country: "Philippines",
  },
  religion: "",
  nationality: "Filipino",
  maritalStatus: "",
  occupation: "",
  emergencyContact: {
    name: "",
    relationship: "",
    phone: "",
  }
};

const VALIDATION_RULES = {
  firstName: { required: true, minLength: 2, maxLength: 50 },
  lastName: { required: true, minLength: 2, maxLength: 50 },
  dateOfBirth: { required: true },
  gender: { required: true },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  contactNumber: { required: true, pattern: /^(\+63|0)[0-9]{10}$/ },
  'address.city': { required: true, minLength: 2 },
  'address.province': { required: true, minLength: 2 },
  'address.zipCode': { required: true, pattern: /^[0-9]{4}$/ },
  religion: { required: true },
  maritalStatus: { required: true },
};

const PROVINCES = [
  "Metro Manila", "Cebu", "Davao", "Iloilo", "Cavite", "Laguna", "Batangas", 
  "Rizal", "Bulacan", "Pampanga", "Pangasinan", "Nueva Ecija", "Tarlac",
  "Zambales", "Bataan", "Aurora", "Quezon", "Camarines Norte", "Camarines Sur",
  "Albay", "Sorsogon", "Masbate", "Catanduanes"
];

export default function AddPatient() {
  const [form, setForm] = useState(DEFAULT_DATA);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const validateField = (name, value) => {
    const rule = VALIDATION_RULES[name];
    if (!rule) return null;

    if (rule.required && (!value || value.trim() === '')) {
      return 'This field is required';
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      return `Must be no more than ${rule.maxLength} characters`;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      if (name === 'email') return 'Please enter a valid email address';
      if (name === 'contactNumber') return 'Please enter a valid Philippine phone number';
      if (name === 'address.zipCode') return 'Please enter a valid 4-digit ZIP code';
      return 'Invalid format';
    }

    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(VALIDATION_RULES).forEach(field => {
      const value = getNestedValue(form, field);
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Age validation
    const age = calcAge(form.dateOfBirth);
    if (form.dateOfBirth && (age < 0 || age > 120)) {
      newErrors.dateOfBirth = 'Please enter a valid date of birth';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (path) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm(prev => updateByPath(prev, path, value));
    
    // Clear error when user starts typing
    if (errors[path]) {
      setErrors(prev => ({ ...prev, [path]: null }));
    }
  };

  const handleBlur = (path) => () => {
    setTouched(prev => ({ ...prev, [path]: true }));
    const value = getNestedValue(form, path);
    const error = validateField(path, value);
    setErrors(prev => ({ ...prev, [path]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allFields = Object.keys(VALIDATION_RULES);
    const touchedState = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(touchedState);

    if (validateForm()) {
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000));
      await addPatient(form);
      setSubmitted(true);
      setShowPreview(true);
    }
    
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setForm(DEFAULT_DATA);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setShowPreview(false);
  };

  const age = useMemo(() => calcAge(form.dateOfBirth), [form.dateOfBirth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Patient Registration
          </h1>
          <p className="text-slate-600 text-lg">Please fill in all required information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Personal Information */}
            <Section 
              title="Personal Information" 
              icon={<User className="h-5 w-5" />}
              gradient="from-blue-500 to-blue-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField
                  label="First Name"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  error={touched.firstName && errors.firstName}
                  required
                />
                <InputField
                  label="Middle Name"
                  value={form.middleName}
                  onChange={handleChange("middleName")}
                />
                <InputField
                  label="Last Name"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  error={touched.lastName && errors.lastName}
                  required
                />
                <InputField
                  type="date"
                  label="Date of Birth"
                  value={form.dateOfBirth}
                  onChange={handleChange("dateOfBirth")}
                  onBlur={handleBlur("dateOfBirth")}
                  error={touched.dateOfBirth && errors.dateOfBirth}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
                <SelectField
                  label="Gender"
                  value={form.gender}
                  onChange={handleChange("gender")}
                  onBlur={handleBlur("gender")}
                  error={touched.gender && errors.gender}
                  options={["Male", "Female", "Other"]}
                  required
                />
                {/* <div className="flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-1">Current Age</p>
                    <p className="text-2xl font-bold text-green-600">
                      {Number.isFinite(age) ? `${age} years` : "—"}
                    </p>
                  </div>
                </div> */}
              </div>
            </Section>

            {/* Contact Information */}
            <Section 
              title="Contact Information" 
              icon={<Mail className="h-5 w-5" />}
              gradient="from-green-500 to-green-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  type="email"
                  label="Email Address"
                  value={form.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email}
                  placeholder="example@email.com"
                  required
                />
                <InputField
                  type="tel"
                  label="Primary Contact Number"
                  value={form.contactNumber}
                  onChange={handleChange("contactNumber")}
                  onBlur={handleBlur("contactNumber")}
                  error={touched.contactNumber && errors.contactNumber}
                  placeholder="+639123456789"
                  required
                />
                <InputField
                  type="tel"
                  label="Alternate Contact Number"
                  value={form.alternateContactNumber}
                  onChange={handleChange("alternateContactNumber")}
                  placeholder="+639123456789 (optional)"
                />
              </div>
            </Section>

            {/* Address Information */}
            <Section 
              title="Address Information" 
              icon={<MapPin className="h-5 w-5" />}
              gradient="from-purple-500 to-purple-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <InputField
                    label="Street Address"
                    value={form.address.street}
                    onChange={handleChange("address.street")}
                    placeholder="House/Unit Number, Street Name, Barangay"
                  />
                </div>
                <InputField
                  label="City/Municipality"
                  value={form.address.city}
                  onChange={handleChange("address.city")}
                  onBlur={handleBlur("address.city")}
                  error={touched['address.city'] && errors['address.city']}
                  required
                />
                <SelectField
                  label="Province"
                  value={form.address.province}
                  onChange={handleChange("address.province")}
                  onBlur={handleBlur("address.province")}
                  error={touched['address.province'] && errors['address.province']}
                  options={PROVINCES}
                  required
                />
                <InputField
                  label="ZIP Code"
                  value={form.address.zipCode}
                  onChange={handleChange("address.zipCode")}
                  onBlur={handleBlur("address.zipCode")}
                  error={touched['address.zipCode'] && errors['address.zipCode']}
                  placeholder="1234"
                  required
                />
                <SelectField
                  label="Country"
                  value={form.address.country}
                  onChange={handleChange("address.country")}
                  options={["Philippines"]}
                  required
                />
              </div>
            </Section>

            {/* Background Information */}
            <Section 
              title="Background Information" 
              icon={<Heart className="h-5 w-5" />}
              gradient="from-rose-500 to-rose-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="Religion"
                  value={form.religion}
                  onChange={handleChange("religion")}
                  onBlur={handleBlur("religion")}
                  error={touched.religion && errors.religion}
                  options={[
                    "Roman Catholic", "Protestant", "Iglesia ni Cristo", 
                    "Islam", "Buddhism", "Hinduism", "Other", "Prefer not to say"
                  ]}
                  required
                />
                <SelectField
                  label="Nationality"
                  value={form.nationality}
                  onChange={handleChange("nationality")}
                  options={["Filipino", "Dual Citizen", "Foreign"]}
                  required
                />
                <SelectField
                  label="Marital Status"
                  value={form.maritalStatus}
                  onChange={handleChange("maritalStatus")}
                  onBlur={handleBlur("maritalStatus")}
                  error={touched.maritalStatus && errors.maritalStatus}
                  options={["Single", "Married", "Divorced", "Separated", "Widowed"]}
                  required
                />
                <InputField
                  label="Occupation"
                  value={form.occupation}
                  onChange={handleChange("occupation")}
                  placeholder="e.g. Teacher, Engineer, Student"
                />
              </div>
            </Section>

            {/* Emergency Contact */}
            {/* <Section 
              title="Emergency Contact" 
              icon={<AlertCircle className="h-5 w-5" />}
              gradient="from-amber-500 to-amber-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField
                  label="Contact Name"
                  value={form.emergencyContact.name}
                  onChange={handleChange("emergencyContact.name")}
                  placeholder="Full name"
                />
                <SelectField
                  label="Relationship"
                  value={form.emergencyContact.relationship}
                  onChange={handleChange("emergencyContact.relationship")}
                  options={["Parent", "Spouse", "Sibling", "Child", "Friend", "Other"]}
                />
                <InputField
                  type="tel"
                  label="Phone Number"
                  value={form.emergencyContact.phone}
                  onChange={handleChange("emergencyContact.phone")}
                  placeholder="+639123456789"
                />
              </div>
            </Section> */}

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Submit Registration
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-300 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all duration-200 disabled:opacity-50"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Form
              </button>
              
              {submitted && (
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <Check className="h-5 w-5" />
                  Registration submitted successfully!
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Preview Toggle */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Form Preview</h3>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {showPreview ? (
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg whitespace-pre-wrap">
                      {JSON.stringify(form, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm text-center py-8">
                    Click the eye icon to preview form data
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, gradient, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className={`bg-gradient-to-r ${gradient} px-6 py-4`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-lg p-2">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

// function InputField({ 
//   label, 
//   error, 
//   required, 
//   type = "text", 
//   placeholder,
//   className = "",
//   onBlur,
//   ...props 
// }) {
//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-slate-700">
//         {label}
//         {required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         onBlur={onBlur}
//         className={`
//           w-full px-4 py-3 border rounded-xl transition-all duration-200
//           focus:outline-none focus:ring-2 focus:border-transparent
//           ${error 
//             ? 'border-red-300 focus:ring-red-200 bg-red-50' 
//             : 'border-slate-300 focus:ring-blue-200 focus:border-blue-500 bg-white hover:border-slate-400'
//           }
//           ${className}
//         `}
//         {...props}
//       />
//       {error && (
//         <p className="text-sm text-red-600 flex items-center gap-1">
//           <AlertCircle className="h-3 w-3" />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// function SelectField({ 
//   label, 
//   options, 
//   error, 
//   required, 
//   placeholder = "Select an option...",
//   className = "",
//   onBlur,
//   ...props 
// }) {
//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-slate-700">
//         {label}
//         {required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <select
//         onBlur={onBlur}
//         className={`
//           w-full px-4 py-3 border rounded-xl transition-all duration-200
//           focus:outline-none focus:ring-2 focus:border-transparent
//           ${error 
//             ? 'border-red-300 focus:ring-red-200 bg-red-50' 
//             : 'border-slate-300 focus:ring-blue-200 focus:border-blue-500 bg-white hover:border-slate-400'
//           }
//           ${className}
//         `}
//         {...props}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       {error && (
//         <p className="text-sm text-red-600 flex items-center gap-1">
//           <AlertCircle className="h-3 w-3" />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// Utility functions
function updateByPath(obj, path, value) {
  const keys = path.split(".");
  const clone = structuredClone(obj);
  let cur = clone;
  keys.forEach((k, idx) => {
    if (idx === keys.length - 1) {
      cur[k] = value;
    } else {
      if (typeof cur[k] !== "object" || cur[k] === null) cur[k] = {};
      cur = cur[k];
    }
  });
  return clone;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function calcAge(dobStr) {
  if (!dobStr) return NaN;
  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return NaN;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}