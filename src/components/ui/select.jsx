export function Select({ options = [], value, onChange, placeholder = "", className = "" }) {
    return (
      <select
        className={`border px-3 py-2 rounded w-full mb-2 ${className}`}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }
  