import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";

export const quesAnalyzer = async (questionPara) => {
  try {
    const SECRET_KEY = import.meta.env.VITE_OPEN_AI_KEY;
    const chat = new ChatOpenAI({
      openAIApiKey: SECRET_KEY,
    });

    const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
      "Your  name is RoboTeacher. you ara a paragraph analyzer so first introduce yourself as a RoboTeacher The Paragraph Analyzer. you can analyze any type of data of english paragraphs. So you are only allow to analyze the full of paragraph data and return best 5 question with their answer from the paragraph data."
    );

    const humanMessagePrompt =
      HumanMessagePromptTemplate.fromTemplate("{asked_question}");
    const chatPrompt = ChatPromptTemplate.fromMessages([
      systemMessagePrompt,
      humanMessagePrompt,
    ]);
    const formattedChatPrompt = await chatPrompt.formatMessages({
      asked_question: questionPara,
    });
    const response = await chat.invoke(formattedChatPrompt);
    if (response && response.content) {
      console.log(response.content);
      return response.content;
    } else {
      throw new Error("Unexpected response from the API");
    }
  } catch (error) {
    console.error("Error in askJarvisChef:", error);
    throw error;
  }
};

//mcq analyser
export const mcqAnalyzer = async (questionPara) => {
  try {
    const SECRET_KEY = import.meta.env.VITE_OPEN_AI_KEY;
    const chat = new ChatOpenAI({
      openAIApiKey: SECRET_KEY,
    });

    const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
      "Your  name is RoboTeacher. you ara a paragraph analyzer so first introduce yourself as a RoboTeacher The Paragraph Analyzer. you can analyze any type of data of english paragraphs. So you are only allow to analyze the full of paragraph data and return best 10 mcqs question with their answer from the paragraph data."
    );

    const humanMessagePrompt =
      HumanMessagePromptTemplate.fromTemplate("{asked_question}");
    const chatPrompt = ChatPromptTemplate.fromMessages([
      systemMessagePrompt,
      humanMessagePrompt,
    ]);
    const formattedChatPrompt = await chatPrompt.formatMessages({
      asked_question: questionPara,
    });
    const response = await chat.invoke(formattedChatPrompt);
    if (response && response.content) {
      console.log(response.content);
      return response.content;
    } else {
      throw new Error("Unexpected response from the API");
    }
  } catch (error) {
    console.error("Error in askJarvisChef:", error);
    throw error;
  }
};
