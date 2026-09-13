import { Link } from "@tanstack/react-router";
import { Menu, X, RotateCcw, UserCheck, ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useLockin } from "@/lib/lockin/store";

const links = [
  ["/study-dna", "Profile"],
  ["/today", "Today's Plan"],
  ["/session", "Session"],
  ["/feedback", "Calibrate"],
  ["/onboarding", "Diagnostic"],
] as const;

export function LockinHeader() {
  const [open, setOpen] = useState(false);
  const { profile, resetToDefaults } = useLockin();

  return (
    <header className="site-header">
      <div className="flex items-center gap-4">
        <Link to="/" className="wordmark" aria-label="LOCKIN home">
          LOCK<span>IN</span>
          <i>.</i>
        </Link>
      </div>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([to, label]) => (
          <Link key={to} to={to} activeProps={{ className: "active" }}>
            {label}
          </Link>
        ))}
      </nav>

      <Button
        variant="icon"
        size="icon"
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X /> : <Menu />}
      </Button>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="p-2 border-b border-border mb-2 font-mono text-xs">
            <span className="text-muted-foreground block text-[10px]">CURRENT PROFILE:</span>
            <span className="font-bold">{profile.studentName}</span>
          </div>
          {links.map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              resetToDefaults();
              setOpen(false);
            }}
            className="text-left text-xs font-mono p-2 text-destructive border-t border-border mt-2"
          >
            Reset Demo Data
          </button>
        </nav>
      )}
    </header>
  );
}

export function PageShell({ children, bare = false }: { children: ReactNode; bare?: boolean }) {
  return (
    <div className={bare ? "lockin-page bare" : "lockin-page"}>
      <LockinHeader />
      {children}
      <Footer />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}

export function Scribble({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`scribble ${className}`}>{children}</span>;
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span className="wordmark">
          LOCK<span>IN</span>.
        </span>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          AN ADAPTIVE STUDY OPERATING SYSTEM. NO GUILT, JUST EVIDENCE-DRIVEN CALIBRATION.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs text-muted-foreground">
        <span>EVIDENCE ENGINE v2.4</span>
        <span>DETERMINISTIC TELEMETRY</span>
        <small>© 2026 LOCKIN</small>
      </div>
    </footer>
  );
}
