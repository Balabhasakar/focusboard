import { Search } from "lucide-react";
import "./TaskList.css";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search size={14} aria-hidden="true" />
      <input
        type="search"
        placeholder="Find a task..."
        aria-label="Search tasks by title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;