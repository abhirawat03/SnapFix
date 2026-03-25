import * as FileSystem from "expo-file-system/legacy";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export const analyzeImage = async (imageUri) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: "base64",
    });

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a programming assistant.

Analyze the programming error in this image and return the result strictly in clean Markdown format.

## Language

<programming language>

## Error Type

<error name>

## Explanation

<simple explanation in 2-4 lines>

## Cause

<root cause in 1-2 lines>

## Fix

<clear actionable steps in bullet points>

## Example Code

\`\`\`javascript
<clean, minimal, production-like code snippet>
\`\`\`

Rules:

* Use ONLY the sections above (no extra sections)
* Always include all sections
* Do NOT add any text before or after the Markdown
* Do NOT wrap the entire response in a code block
* Keep formatting consistent across all responses

Code Rules:

* Use proper indentation
* Add spacing between logical blocks
* Keep comments minimal and only when necessary
* Do NOT over-explain inside code
* Keep code clean, readable, and production-like

`,
                },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: base64,
                  },
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await res.json();

    console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  } catch (err) {
    console.log(err);
    return "Error analyzing image";
  }
};
