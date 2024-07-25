import React, { useState } from "react";
import {
  hinglishAnalyzer,
  mcqAnalyzer,
  quesAnalyzer,
} from "../utils/quesAnalyzer";
import "./questions.css";
import Buddy from "../assets/buddy.png";

const Question = () => {
  const [loading, setLoading] = useState(false);
  const [questionPara, setQuestionPara] = useState("");
  const [activeAnalysis, setActiveAnalysis] = useState(""); // Track active analysis type

  // subjective questions
  const [questions, setQuestions] = useState([]);

  // objective questions
  const [mcq, setMcq] = useState([]);

  // hinglish paragraph
  const [hinglish, setHinglish] = useState("");

  const handleInput = (e) => {
    setQuestionPara(e.target.value);
  };

  const generateQuestions = async (e) => {
    e.preventDefault();
    setLoading(true);
    setActiveAnalysis("questions");
    try {
      const textResponse = await quesAnalyzer(questionPara);
      if (textResponse) {
        console.log("Received text response:", textResponse);
        const questionsStartIndex =
          textResponse.indexOf(
            "Here are the top 5 questions extracted from the paragraph you provided:"
          ) + 74;
        const questionsText = textResponse.slice(questionsStartIndex);
        const questionsArray = questionsText.split(/\n\d\./).slice(1); // Split by newline and number, remove the first empty string

        const formattedQuestions = questionsArray.map((qa) => {
          const splitIndex = qa.indexOf("Answer:");
          return {
            question: qa.slice(0, splitIndex).trim(),
            answer: qa.slice(splitIndex + 7).trim(),
          };
        });

        setQuestions(formattedQuestions);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
    setLoading(false);
  };

  const generateMCQ = async (e) => {
    e.preventDefault();
    setLoading(true);
    setActiveAnalysis("mcq");
    try {
      const mcq_response = await mcqAnalyzer(questionPara);
      console.log(mcq_response);
      setMcq(mcq_response);
    } catch (error) {
      console.error("API call failed:", error);
    }
    setLoading(false);
  };

  const generateHinglish = async (e) => {
    e.preventDefault();
    setLoading(true);
    setActiveAnalysis("hinglish");
    try {
      const hinglish_response = await hinglishAnalyzer(questionPara);
      setHinglish(hinglish_response);
    } catch (error) {
      console.error("API call failed:", error);
    }
    setLoading(false);
  };

  return (
    <div className="full_view">
      <div className="text_area">
        <textarea
          type="text"
          value={questionPara}
          onChange={handleInput}
          placeholder="Paste your Paragraph here to get your questions..."
        />
        <div className="button_list" style={{ display: "flex", gap: "1rem" }}>
          <button className="generate_button" onClick={generateQuestions} disabled={loading && activeAnalysis === "questions"}>
            {loading && activeAnalysis === "questions" ? "LOADING..." : "QUESTIONS"}
          </button>
          <button className="generate_button" onClick={generateMCQ} disabled={loading && activeAnalysis === "mcq"}>
            {loading && activeAnalysis === "mcq" ? "LOADING..." : "MCQs"}
          </button>
          <button className="generate_button" onClick={generateHinglish} disabled={loading && activeAnalysis === "hinglish"}>
            {loading && activeAnalysis === "hinglish" ? "LOADING..." : "HINGLISH"}
          </button>
        </div>
      </div>
      <div className="question_answer">
        {activeAnalysis === "questions" && questions.length > 0 && (
          <div>
            {questions.map((item, index) => (
              <div key={index} className="single_tab">
                <h4>Question {index + 1}: {item.question}</h4>
                <p>Answer: {item.answer}</p>
              </div>
            ))}
          </div>
        )}
        {activeAnalysis === "mcq" && mcq.length > 0 && (
          <div>
            <div>{mcq}</div>
          </div>
        )}
        {activeAnalysis === "hinglish" && hinglish.length > 0 && (
          <div>
            <div>{hinglish}</div>
          </div>
        )}
        {!(activeAnalysis === "questions" && questions.length > 0) &&
         !(activeAnalysis === "mcq" && mcq.length > 0) &&
         !(activeAnalysis === "hinglish" && hinglish.length > 0) && (
          <img className="buddy" src={Buddy} height="600px" width="auto" />
        )}
      </div>
    </div>
  );
};

export default Question;
