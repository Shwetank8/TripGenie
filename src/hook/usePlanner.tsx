import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../utils/firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const usePlanner = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);
  const navigate = useNavigate();

  const generateItinerary = async (destination: string, days: number, budget: string, people: string) => {
    const apiKey = import.meta.env.VITE_AI_API_KEY_GEM;
  
    if (!apiKey) {
      setError("The AI API key is missing. Please set it in your environment.");
      return;
    }
  
    const genAI = new GoogleGenerativeAI(apiKey);
  
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };
  
    const prompt = `Provide a day-to-day itinerary for ${destination} for ${days} days. 
      The budget is ${budget}, and the group includes ${people} people. 
      Each day's plan should include:
      - Hotels: { hotelName, hotelPrice, hotelLocation, hotelImage (URL) }
      - Places to Visit: { placeName, placeDescription, placeLocation, travelTime }
      - Format the entire response as valid JSON.`;
  
    try {
      setLoading(true);
      setError(null);
  
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });
  
      const result = await chatSession.sendMessage(prompt);
  
      // Parse the result as JSON
      const itinerary = JSON.parse(result.response.text());
      setResponse(itinerary);
  
      // Save itinerary to Firebase
      const itineraryRef = collection(db, "itineraries");
      const docRef = await addDoc(itineraryRef, {
        destination,
        days,
        budget,
        people,
        itinerary,
        createdAt: new Date(),
      });
      // const docId = docRef.id;
  
      console.log(docRef.id)
      // Redirect to the unique trip page
      navigate(`/trip/${docRef.id}`);
      return itinerary;
    } catch (err: any) {
      setError(err.message || "An error occurred while generating the itinerary.");
    } finally {
      setLoading(false);
    }
  };
  

  return {
    generateItinerary,
    loading,
    error,
    response,
  };
};

export default usePlanner;
