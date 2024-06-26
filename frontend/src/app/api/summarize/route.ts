import { NextRequest } from "next/server";

// import { ChatOpenAI } from "@langchain/openai";
// import { PromptTemplate } from "@langchain/core/prompts";
// import { StringOutputParser } from "@langchain/core/output_parsers";

import { getAuthToken } from "@/data/services/get-token";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { fetchTranscript } from "@/lib/youtube-transcript";

function transformData(data: any[]) {
  let text = "";

  data.forEach((item) => {
    text += item.text + " ";
  });

  return {
    data: data,
    text: text.trim(),
  };
}

// const TEMPLATE = `
// INSTRUCTIONS:
//   For the this {text} complete the following steps.
//   Generate the title for based on the content provided
//   Summarize the following content and include 5 key topics, writing in first person using normal tone of voice.

//   Write a youtube video description
//     - Include heading and sections.
//     - Incorporate keywords and key takeaways

//   Generate bulleted list of key points and benefits

//   Return possible and best recommended key words
// `;

// async function generateSummary(content: string, template: string) {
//   const prompt = PromptTemplate.fromTemplate(template);

//   const model = new ChatOpenAI({
//     openAIApiKey: process.env.OPENAI_API_KEY,
//     modelName: process.env.OPENAI_MODEL ?? "gpt-4-turbo-preview",
//     temperature: process.env.OPENAI_TEMPERATURE
//       ? parseFloat(process.env.OPENAI_TEMPERATURE)
//       : 0.7,
//     maxTokens: process.env.OPENAI_MAX_TOKENS
//       ? parseInt(process.env.OPENAI_MAX_TOKENS)
//       : 4000,
//   });

//   const outputParser = new StringOutputParser();
//   const chain = prompt.pipe(model).pipe(outputParser);

//   try {
//     const summary = await chain.invoke({ text: content });
//     return summary;
//   } catch (error) {
//     if (error instanceof Error)
//       return new Response(JSON.stringify({ error: error.message }));
//     return new Response(
//       JSON.stringify({ error: "Failed to generate summary." })
//     );
//   }
// }

export async function POST(req: NextRequest) {
  console.log("FROM OUR ROUTE HANDLER:", req.body);

  const user = await getUserMeLoader();
  const token = await getAuthToken();

  if (!user.ok || !token)
    return new Response(
      JSON.stringify({ data: null, error: "Not Authenticated" }),
      { status: 401 }
    );

  if (user.data.credits < 1)
    return new Response(
      JSON.stringify({
        data: null,
        error: "Insufficient credits",
      }),
      { status: 402 }
    );

  const body = await req.json();
  const { videoId } = body;

  let transcript: Awaited<ReturnType<typeof fetchTranscript>>;

  try {
    transcript = await fetchTranscript(videoId);

    const transFormedData = transformData(transcript);
    console.log("Transcript: ", transFormedData.text);

    // let summary: Awaited<ReturnType<typeof generateSummary>>;

    // summary = await generateSummary(transFormedData.text, TEMPLATE);
    // console.log("summary: ", transFormedData.text);
    return new Response(
      JSON.stringify({ data: transFormedData.text, error: null })
    );
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error }));
    return new Response(JSON.stringify({ error: "Unknown error" }));
  }
}
