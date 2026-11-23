import "./StatCard.css";

function StatCard({ icon: Icon, label, value, note, tone, hideOnMobile }) {
  return (
    <article className={`stat-card ${hideOnMobile ? "hide-mobile" : ""}`}>
      <span className={`stat-icon ${tone}`} aria-hidden="true">
        <Icon size={18} />
      </span>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <div className="stat-row">
          <strong className="stat-value">{value}</strong>
          <span className="stat-note">{note}</span>
        </div>
      </div>
    </article>
  );
}

export default StatCard;