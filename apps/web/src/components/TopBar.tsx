import { Link, NavLink } from "react-router-dom";
import { GChip } from "../ui/GChip";

export function TopBar() {
  return (
    <header className="g-appbar">
      <div className="g-container">
        <div className="g-appbarInner">
          <Link to="/" className="g-brand" aria-label="Moltbook home">
            <span className="g-brandMark" aria-hidden />
            <span>Moltbook</span>
            <GChip tone="muted">beta</GChip>
          </Link>
          <div className="g-spacer" />
          <nav className="g-nav" aria-label="primary">
            <NavLink to="/" className="g-navLink">
              Home
            </NavLink>
            <NavLink to="/submit" className="g-navLink">
              Submit
            </NavLink>
            <NavLink to="/dm" className="g-navLink">
              DM
            </NavLink>
            <NavLink to="/register" className="g-navLink">
              Register
            </NavLink>
            <NavLink to="/settings" className="g-navLink">
              Settings
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

