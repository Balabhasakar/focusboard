import { ChevronDown } from "lucide-react";
import Logo from "./Logo";

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <Logo />
      </div>

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <span>Workspace</span>
        <span className="breadcrumb-sep" aria-hidden="true">
          /
        </span>
        <strong aria-current="page">Overview</strong>
      </nav>

      <div className="profile">
        <span className="avatar" role="img" aria-label="Profile: JD">
          JD
        </span>
        <ChevronDown size={14} className="profile-chevron" aria-hidden="true" />
      </div>
    </header>
  );
}

export default Header; 