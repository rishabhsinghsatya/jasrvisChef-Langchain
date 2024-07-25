import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";

export const hinglishConversion = async (englishPara) => {
  try {
    const SECRET_KEY = import.meta.env.VITE_OPEN_AI_KEY;
    const chat = new ChatOpenAI({
      openAIApiKey: SECRET_KEY,
    });

    const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
      "Your  name is HinglishTeacher. you ara a Hinglish analyzer so first introduce yourself as a Hinglish Teacher The Hinglish Analyzer. i want you to translate the following text into The language Hinglish involves a hybrid mixing of Hindi and English within conversations. Which is a colloquially used way of typing in north india. Some English words are mixed with hindi words based on common usage and latin script is used."
    );

    const humanMessagePrompt =
      HumanMessagePromptTemplate.fromTemplate("{asked_Para}");
    const chatPrompt = ChatPromptTemplate.fromMessages([
      systemMessagePrompt,
      humanMessagePrompt,
    ]);
    const formattedChatPrompt = await chatPrompt.formatMessages({
      asked_Para: englishPara,
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
