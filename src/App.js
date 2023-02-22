import React from "react";
import Header from "./Header";
import Background from "./Background";
import Holiday from "./Holiday";

function App() {

  return (
    <div className="App">
      <Background />
      <div className="container">
        <Header />
        <div className="main">
          <Holiday />

        </div>
      </div>
    </div>
  );
}

export default App;