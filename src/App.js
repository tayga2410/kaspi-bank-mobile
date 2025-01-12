import React, { useState } from "react";
import History from "./components/History/History";
import MyTransfers from "./components/MyTransfers/MyTransfers";
import Tabs from "./components/MainTabs";
import Favorite from "./components/Favorites";

const App = () => {
  const [activeTab, setActiveTab] = useState("myTransfers");

  return (
  <>
    <div className="container">
      <h1>Переводы</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "history" ? <History /> : <MyTransfers />}
    </div>
      <Favorite />
      </>
  );
};

export default App;
