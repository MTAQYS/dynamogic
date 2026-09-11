type Props = { className?: string; invert?: boolean };

/** Wordmark-forward mark — Inter only. */
export function Logo({ className = "", invert = false }: Props) {
  const fg = invert ? "#F7F6F3" : "#1A1A1A";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1 16V2l5.5 9.5L12 2v14"
          stroke={fg}
          strokeWidth="1.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M14.5 2v14H17"
          stroke={fg}
          strokeWidth="1.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <span
        className="text-[1.15rem] font-bold leading-none tracking-tight"
        style={{ color: fg }}
      >
        Dynamogic
      </span>
    </span>
  );
}
