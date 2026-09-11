import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="border-t border-border py-12 sm:py-16">
      <div className="site-wrap flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-fg-muted">
            Brand layer for AI output.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
            <li>
              <a className="hover:text-fg" href="#demo">
                Demo
              </a>
            </li>
            <li>
              <a className="hover:text-fg" href="#pricing">
                Pricing
              </a>
            </li>
            <li>
              <a className="hover:text-fg" href="#mcp">
                MCP
              </a>
            </li>
            <li>
              <a className="hover:text-fg" href="#faq">
                FAQ
              </a>
            </li>
            <li>
              <span title="Phase 5">Privacy</span>
            </li>
            <li>
              <span title="Phase 5">Terms</span>
            </li>
          </ul>
        </nav>
      </div>
      <p className="site-wrap mt-10 text-[13px] text-fg-muted">
        © {year} MTAQYS · Dynamogic
      </p>
    </footer>
  );
}
