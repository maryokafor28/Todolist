// src/Components/Input.tsx
type InputProps = {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className = "",
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 rounded-full bg-white shadow-custom focus:outline-none ${className}`}
    />
  );
};

export default Input;
