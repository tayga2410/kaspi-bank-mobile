import React, { useState } from "react";

const AccordionItem = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <button
        className="accordion__item"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="accordion__header">
          <img src={icon} alt={`${title} icon`} className="accordion__icon" />
          <span className="accordion__title">{title}</span>
        </div>
        <svg
          className={`accordion__arrow ${isOpen ? "accordion__arrow--open" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`accordion__content ${isOpen ? "accordion__content--open" : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;
