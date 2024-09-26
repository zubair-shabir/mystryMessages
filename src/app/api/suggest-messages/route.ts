import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
    const body = { contents: [{ parts: [{ text: prompt }] }] };

    // Gemini API endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      // Return the generated response
      return NextResponse.json(
        responseData.candidates[0].content.parts[0].text.split("||")
      ); //responseData.candidates[0].content.parts[0].text
    } else {
      // Handle API errors
      console.log(responseData);
      return NextResponse.json(
        { error: responseData.message || "Failed to generate text" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    throw error;
  }
}
