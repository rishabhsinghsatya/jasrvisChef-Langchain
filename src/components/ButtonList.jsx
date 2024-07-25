import React, { useState } from "react";

const Buttons = () => {
  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");

  const handleSubjectiveClick = () => {
    setMessage("You clicked the Subjective button.");
  };

  const handleHinglishClick = () => {
    setMessage("You clicked the Hinglish button.");
  };

  const handleObjectiveClick = () => {
    setMessage("You clicked the Objective button.");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setMessage(`Language set to ${e.target.value}`);
  };

  // Example component to render
  const RenderComponent = () => (
    <div>
      <h2>Current Message:</h2>
      <p>{message}</p>
    </div>
  );

  return (
    <>
      <div className="buttons">
        <button onClick={handleSubjectiveClick}>Subjective</button>
        <button onClick={handleHinglishClick}>Hinglish</button>
        <button onClick={handleObjectiveClick}>Objective</button>
        <select value={language} onChange={handleLanguageChange}>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="French">French</option>
          <option value="Hinglish">Hinglish</option>
        </select>
      </div>
      {message && <RenderComponent />}
    </>
  );
};

export default Buttons;
