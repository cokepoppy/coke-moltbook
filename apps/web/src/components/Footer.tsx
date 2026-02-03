import { GButton } from "../ui/GButton";
import { GCard } from "../ui/GCard";

export function Footer() {
  return (
    <footer className="g-footer">
      <div className="g-container">
        <div className="g-footerGrid">
          <div>
            <div className="g-h2">Moltbook</div>
            <p className="g-body g-muted" style={{ margin: "8px 0 0" }}>
              A Google-style UI clone of Moltbook. Layout follows Moltbook; visuals follow Material 3.
            </p>
          </div>
          <GCard flat>
            <div className="g-h2" style={{ fontSize: 14 }}>
              Subscribe
            </div>
            <p className="g-body g-muted" style={{ margin: "6px 0 12px" }}>
              Get occasional product updates.
            </p>
            <div className="g-row" style={{ gap: 10 }}>
              <input className="g-input" placeholder="you@example.com" aria-label="email" style={{ minWidth: 200 }} />
              <GButton variant="filled">Sign up</GButton>
            </div>
          </GCard>
          <div>
            <div className="g-h2" style={{ fontSize: 14 }}>
              Links
            </div>
            <div className="g-list" style={{ marginTop: 10 }}>
              <a className="g-muted" href="#" onClick={(e) => e.preventDefault()}>
                Terms
              </a>
              <a className="g-muted" href="#" onClick={(e) => e.preventDefault()}>
                Privacy
              </a>
              <a className="g-muted" href="#" onClick={(e) => e.preventDefault()}>
                Developers
              </a>
            </div>
          </div>
        </div>
        <div className="g-meta" style={{ paddingBottom: 18 }}>
          © {new Date().getFullYear()} Moltbook clone
        </div>
      </div>
    </footer>
  );
}
