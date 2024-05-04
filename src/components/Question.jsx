import React, { useState } from "react";
import { quesAnalyzer } from "../utils/quesAnalyzer";
import "./questions.css";
import Buddy from "../assets/buddy.png";

const Question = () => {
  const [questionPara, setQuestionPara] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setQuestionPara(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

  return (
    <div className="full_view">
      {/* <h2>Generate Questions with Paragraphs</h2> */}
      <div className="text_area">
        <textarea
          type="text"
          value={questionPara}
          onChange={handleInput}
          placeholder="Paste your Paragraph.."
        />
        <button className="generate_button" onClick={handleSubmit}>
          {loading ? "LOADING..." : "Generate"}
        </button>
      </div>
      {/* <div className="question_answer"> */}
      {questions.length > 0 ? (
        <div className="question_answer">
          {questions.map((item, index) => (
            <div key={index} className="single_tab">
              <h4>
                Question {index + 1}: {item.question}
              </h4>
              <p>Answer: {item.answer}</p>
              {/* <hr /> */}
            </div>
          ))}
        </div>
      ) : (
        // <div className="question_answer">
        <img className="buddy" src={Buddy} height="600px" width="auto" />
        // </div>
      )}

      {/* </div> */}
    </div>
  );
};

export default Question;
//#1d0641
//#799eef
//linear-gradient(to right, #799eef, #18fa0c)
//final (linear-gradient(to right, #1d0641, #799eef))
