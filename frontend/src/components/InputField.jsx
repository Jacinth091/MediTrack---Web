
export default function InputField({ label, type, ...props }) {
  return (
    <div>
      <div className="space-y-1">
        <input
          type={type}
          placeholder="Type here..."
          className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          {...props}
        />
      </div>
    </div>
  );
}

