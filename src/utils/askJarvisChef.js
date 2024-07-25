import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts"; //doubt 1

export const askJarvisChef = async (recipeMessage) => {
  try {
    const SECRET_KEY = import.meta.env.VITE_OPEN_AI_KEY;
    const chat = new ChatOpenAI({
      openAIApiKey: SECRET_KEY,
    });
    const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
      // "Your name is Jarvis. You are a Master Chef so first introduce yourself as Jarvis The Master Chef. You can write any type of food recipe which can be made in 5 minutes. You are only allowed to answer food-related queries. If you don't know the answer then tell I don't know the answer."
      // "Your  name is HinglishTeacher. you ara a Hinglish analyzer so first introduce yourself as a Hinglish Teacher The Hinglish Analyzer. i want you to translate the following text into The language Hinglish involves a hybrid mixing of Hindi and English within conversations. Which is a colloquially used way of typing in north india. Some English words are mixed with hindi words based on common usage and latin script is used."
      "i want you to translate the following text into The language Hinglish involves a hybrid mixing of Hindi and English within conversations. Which is a colloquially used way of typing in north india. Some English words are mixed with hindi words based on common usage and latin script is used."
    );
    const humanMessagePrompt =
      HumanMessagePromptTemplate.fromTemplate("{asked_recipe}");
    const chatPrompt = ChatPromptTemplate.fromMessages([
      systemMessagePrompt,
      humanMessagePrompt,
    ]);
    const formattedChatPrompt = await chatPrompt.formatMessages({
      asked_recipe: recipeMessage,
    });
    // console.log("Formatted chat prompt: ", formattedChatPrompt);
    const response = await chat.invoke(formattedChatPrompt);
    if (response && response.content) {
      return response.content;
    } else {
      throw new Error("Unexpected response from the API");
    }
  } catch (error) {
    console.error("Error in askJarvisChef:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
