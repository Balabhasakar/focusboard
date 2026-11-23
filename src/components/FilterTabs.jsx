import "./TaskList.css";

const tabs = ["All", "To do", "In progress", "Completed"];

function FilterTabs({ active, onChange, counts }) {
  return (
    <div className="filter-tabs" role="group" aria-label="Filter by status">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`filter-tab ${active === tab ? "active" : ""}`}
          aria-pressed={active === tab}
          onClick={() => onChange(tab)}
        >
          {tab === "All" ? `All tasks ${counts.All}` : tab}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;