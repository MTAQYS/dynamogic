type Props = { className?: string; invert?: boolean };

/** Placeholder wordmark + geometric mark — founder replaces later. */
export function Logo({ className = "", invert = false }: Props) {
  const fg = invert ? "#FAFAFA" : "#0A0A0A";
  const bg = invert ? "#FAFAFA" : "#0A0A0A";
  const markFg = invert ? "#0A0A0A" : "#FAFAFA";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill={bg} />
        <path
          d="M8 22V10l4.5 8L17 10v12"
          stroke={markFg}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 10v12h4"
          stroke={markFg}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-[15px] font-semibold tracking-tight"
        style={{ color: fg }}
      >
        Dynamogic
      </span>
    </span>
  );
}
