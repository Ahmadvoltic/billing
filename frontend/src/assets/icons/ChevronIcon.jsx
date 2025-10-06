export const ChevronIcon = ({ direction = "down", className = "w-5 h-5" }) => {
  const rotations = {
    up: "rotate-180",
    down: "rotate-0",
    left: "rotate-90",
    right: "-rotate-90"
  };

  return (
    <svg className={`${className} ${rotations[direction]}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
