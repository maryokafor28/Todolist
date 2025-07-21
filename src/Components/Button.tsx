type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "custom";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-xl text-black text-sm font-semibold transition shadow-custom";

  const variantStyles =
    variant === "primary"
      ? "bg-pink-500 hover:bg-pink-600"
      : variant === "custom"
      ? "bg-[#ffc6ff] hover:bg-[#fda6fd]" // custom pinks
      : "bg-gray-400 hover:bg-gray-500";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  const fullWidthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${fullWidthStyle} ${className}`}
    >
      {children}
    </button>
  );
}
