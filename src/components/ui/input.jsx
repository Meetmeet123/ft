export function Input({ className = "", ...props }) {
    return (
      <input
        className={`border px-3 py-2 rounded w-full mb-2 ${className}`}
        {...props}
      />
    );
  }
  