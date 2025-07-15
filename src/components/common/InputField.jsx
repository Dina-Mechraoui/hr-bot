export default function InputField({ label, name, value, onChange }) {
    return (
      <div>
        <label className="font-semibold">{label}</label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Enter value..."
          className="w-full border rounded px-4 py-2 mt-1 text-sm"
        />
      </div>
    );
  }