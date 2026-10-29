import { GoogleGenAI, Content, Part } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message, Role } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-3-pro-preview for better coding and reasoning capabilities
const MODEL_NAME = "gemini-3-pro-preview";

export const sendMessageStream = async (
  history: Message[],
  newMessage: string,
  onChunk: (text: string) => void
): Promise<string> => {
  try {
    // Convert app history to Gemini SDK format
    // Filter out initial empty states or errors if any
    const contents: Content[] = history
      .filter(msg => !msg.isThinking && msg.content.trim() !== "")
      .map((msg) => ({
        role: msg.role === Role.USER ? "user" : "model",
        parts: [{ text: msg.content }] as Part[],
      }));

    // Start a chat session
    const chat = ai.chats.create({
      model: MODEL_NAME,
      history: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balanced creativity and precision for teaching
        // Using a moderate thinking budget to allow the model to plan explanations for complex algos
        thinkingConfig: {
            thinkingBudget: 1024, 
        }
      },
    });

    const resultStream = await chat.sendMessageStream({ message: newMessage });

    let fullText = "";

    for await (const chunk of resultStream) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(fullText);
      }
    }

    return fullText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};