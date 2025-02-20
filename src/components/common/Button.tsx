interface ButtonProps  {
  label : string;
  onClick : ()=> void;
  variant?: "primary" | "secondary"| "outline"
  className?: string; // css 추가할 때 사용
}

const Button:React.FC<ButtonProps> = ({label, onClick, variant = "primary", className })=>{
const baseButton = "px-4 py-2 rounded-full transition text-white";
const styles = {
  primary: "bg-purple-500 hover:bg-purple-600",
    secondary: "bg-gray-700 hover:bg-gray-800",
    outline: "border border-gray-700 text-gray-700 hover:bg-gray-200",
};



  return (
  <button className={`${baseButton} ${styles[variant]} ${className}`} onClick={onClick}>{label}
  </button>
  );

};

export default Button