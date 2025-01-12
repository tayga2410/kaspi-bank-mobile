import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <div
        className={`tabs__indicator ${
          activeTab === "history" ? "tabs__indicator--second" : ""
        }`}
      ></div>
      <button
        className={`tabs__button ${activeTab === "myTransfers" ? "active" : ""}`}
        onClick={() => setActiveTab("myTransfers")}
      >
        Мои переводы
      </button>
      <button
        className={`tabs__button ${activeTab === "history" ? "active" : ""}`}
        onClick={() => setActiveTab("history")}
      >
        История
      </button>
    </div>
  );
};

export default Tabs;
