interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string; // css 추가할 때 사용
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", className }) => {
  const baseButton = "rounded-button font-medium transition duration-200";
  const styles = {
    primary: "bg-primary text-white px-4 py-2 hover:bg-opacity-90",
    secondary: "bg-lightGray text-darkGray px-4 py-2 hover:bg-opacity-80",
    outline: "border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-white"
  };

  return (
    <button className={`${baseButton} ${styles[variant]} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
