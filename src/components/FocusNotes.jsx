import { useState } from "react";
import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react";
import "./FocusNotes.css";

const slides = [
  {
    id: 1,
    title: "Make today count.",
    text: "A little focus goes a long way.",
    cardLabel: "NEXT UP",
    cardTitle: "Design landing page",
    progress: 62,
  },
  {
    id: 2,
    title: "Small steps, big progress.",
    text: "Keep your priorities in view.",
    cardLabel: "IN PROGRESS",
    cardTitle: "Fix navigation",
    progress: 61,
  },
  {
    id: 3,
    title: "Celebrate the wins.",
    text: "Every completed task moves you forward.",
    cardLabel: "COMPLETED",
    cardTitle: "Onboarding copy",
    progress: 100,
  },
];

function FocusNotes() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <section
      className="focus-notes"
      aria-roledescription="carousel"
      aria-label="Focus notes"
    >
      <div className="focus-content" aria-live="polite">
        <p className="focus-eyebrow">
          <span>FOCUS NOTES</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </p>
        <h2 className="focus-title">{slide.title}</h2>
        <p className="focus-text">{slide.text}</p>
      </div>

      <div className="focus-card-wrap" aria-hidden="true">
        <div className="focus-card-ghost" />
        <div className="focus-card">
          <CircleCheck size={16} className="focus-card-check" />
          <div className="focus-card-body">
            <span className="focus-card-label">{slide.cardLabel}</span>
            <strong className="focus-card-title">{slide.cardTitle}</strong>
            <div className="focus-card-progress">
              <div className="focus-bar">
                <div className="focus-bar-fill" style={{ width: `${slide.progress}%` }} />
              </div>
              <span>{slide.progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="focus-controls">
        <button
          type="button"
          className="focus-arrow focus-arrow-prev"
          aria-label="Previous slide"
          onClick={goPrev}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          className="focus-arrow focus-arrow-next"
          aria-label="Next slide"
          onClick={goNext}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="focus-dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`focus-dot ${i === index ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1} of ${slides.length}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}

export default FocusNotes;