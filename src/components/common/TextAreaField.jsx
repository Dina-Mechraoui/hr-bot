export default function TextAreaField({ label, name, value, onChange }) {
    return (
      <div>
        <label className="font-semibold">{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Enter value..."
          className="w-full border rounded px-4 py-2 mt-1 text-sm min-h-[100px]"
        />
      </div>
    );
  }
