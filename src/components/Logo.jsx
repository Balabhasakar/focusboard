import { LayoutGrid } from "lucide-react";

function Logo() {
  return (
    <div className="logo">
      <span className="logo-mark" aria-hidden="true">
        <LayoutGrid size={18} />
      </span>
      <span className="logo-text">FocusBoard</span>
    </div>
  );
}

export default Logo;