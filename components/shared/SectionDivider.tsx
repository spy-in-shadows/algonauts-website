export default function SectionDivider() {
  return (
    <div className="w-full relative overflow-hidden py-8 pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 1000 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-accent opacity-20"
        preserveAspectRatio="none"
      >
        {/* Horizontal line with a custom bezier swoosh notch in the center */}
        <path
          d="M 0 20 L 440 20 C 470 20, 480 35, 500 35 C 520 35, 530 5, 560 5 C 570 5, 580 20, 600 20 L 1000 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
