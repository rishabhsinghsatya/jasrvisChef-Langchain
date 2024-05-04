import React, { useState } from "react";
import { quesAnalyzer } from "../utils/quesAnalyzer";
import "./questions.css";

const Question = () => {
  const [questionPara, setQuestionPara] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleInput = (e) => {
    setQuestionPara(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const textResponse = await quesAnalyzer(questionPara);
      if (textResponse) {
        // Log the response to see it in the console.
        console.log("Received text response:", textResponse);

        // Extract questions and answers assuming a specific format.
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
  };

  return (
    <div className="full_view">
      {/* <h2>Generate Questions with Paragraphs</h2> */}
      <div className="text_area">
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={questionPara}
            onChange={handleInput}
            placeholder="Paste your Paragraph.."
          />
          <button className="generate_button" type="submit">
            Generate
          </button>
        </form>
      </div>
      <div className="question_answer">
        {/* {questions.length > 0 && (
          <div>
            {questions.map((item, index) => (
              <div key={index}>
                <h4>
                  Question {index + 1}: {item.question}
                </h4>
                <p>Answer: {item.answer}</p>
              </div>
            ))}
          </div>
        )} */}
        <h4>question</h4>
        <p>answer</p>
        <h4>question</h4>
        <p>answer</p>
        <h4>question</h4>
        <p>answer</p>
      </div>
    </div>
  );
};

export default Question;
//#1d0641
//#799eef
//linear-gradient(to right, #799eef, #18fa0c)
//final (linear-gradient(to right, #1d0641, #799eef))
