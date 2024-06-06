import React, { useState } from "react";
import {
  hinglishAnalyzer,
  mcqAnalyzer,
  quesAnalyzer,
} from "../utils/quesAnalyzer";
import "./questions.css";
import Buddy from "../assets/buddy.png";
import ButtonList from "./ButtonList";

const Question = () => {
  const [loading, setLoading] = useState(false);
  const [questionPara, setQuestionPara] = useState("");

  //subjective questions
  const [questions, setQuestions] = useState([]);

  //objective questions
  const [mcq, setMcq] = useState([]);

  //hinglish paragraph
  const [hinglish, setHinglish] = useState("");
  const handleInput = (e) => {
    setQuestionPara(e.target.value);
  };

  const generateQuestions = async (e) => {
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

  const generateMCQ = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(questionPara);
    const mcq_response = await mcqAnalyzer(questionPara);
    console.log(mcq_response);
    setMcq(mcq_response);
    setLoading(false);
  };

  const generateHinglish = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(questionPara);
    const hinglish_response = await hinglishAnalyzer(questionPara);
    setHinglish(hinglish_response);
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
          <button className="generate_button" onClick={generateQuestions}>
            {loading ? "LOADING..." : "QUESTIONS"}
          </button>
          <button className="generate_button" onClick={generateMCQ}>
            {loading ? "LOADING..." : "MCQs"}
          </button>
          <button className="generate_button" onClick={generateHinglish}>
            {loading
              ? // (
                //   <div class="lds-ellipsis">
                //     <div></div>
                //     <div></div>
                //     <div></div>
                //     <div></div>
                //   </div>
                // )
                "Loading"
              : "HINGLISH"}
          </button>
        </div>
        {/* <ButtonList /> */}
      </div>
      {hinglish.length > 0 ? (
        <div className="question_answer">
          {/* {questions.map((item, index) => (
            <div key={index} className="single_tab">
              <h4>
                Question {index + 1}: {item.question}
              </h4>
              <p>Answer: {item.answer}</p>
            </div>
          ))} */}
          <div>{hinglish}</div>
        </div>
      ) : (
        <img className="buddy" src={Buddy} height="600px" width="auto" />
      )}
    </div>
  );
};

export default Question;
//#1d0641
//#799eef
//linear-gradient(to right, #799eef, #18fa0c)
//final (linear-gradient(to right, #1d0641, #799eef))
