import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="border-t border-border bg-bg py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-fg-muted">Brand layer for AI output.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
            Product
          </p>
          <ul className="mt-3 space-y-2 text-sm text-fg-muted">
            <li><a className="hover:text-fg" href="#demo">Demo</a></li>
            <li><a className="hover:text-fg" href="#pricing">Pricing</a></li>
            <li><a className="hover:text-fg" href="#mcp">MCP</a></li>
            <li><a className="hover:text-fg" href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
            Company
          </p>
          <ul className="mt-3 space-y-2 text-sm text-fg-muted">
            <li><span title="Phase 5">Privacy</span></li>
            <li><span title="Phase 5">Terms</span></li>
            <li><span>Contact (domain TBD)</span></li>
            <li><span>X · LinkedIn (TBD)</span></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-4 text-sm text-fg-muted sm:px-6">
        © {year} MTAQYS · Dynamogic
      </p>
    </footer>
  );
}
