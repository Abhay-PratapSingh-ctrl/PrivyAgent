import { ClassifiedIntent } from './types';

const FORCE_LOCAL_DEMO = false; 

export async function classifyUserInput(text: string): Promise<ClassifiedIntent> {
  const lowerText = text.toLowerCase();
  const startTime = performance.now();

  const systemInstruction = `
    Analyze user input and classify into: 'food_order', 'travel_booking', 'grocery_order', 'data_extraction', or 'unknown'.
    Respond with raw JSON matching the schema strictly:
    {"intent": "food_order" | "travel_booking" | "grocery_order" | "data_extraction" | "unknown", "item": "string description", "estimated_cost": number}
  `;

  // --- 0. FORCE LOCAL OVERRIDE ---
  if (FORCE_LOCAL_DEMO) {
    const fallback = runLocalFallback(text, lowerText);
    return { ...fallback, provider: 'Local Fallback', latency: 0 };
  }

  // --- 1. GEMINI (PRIMARY AI) ---
  try {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) throw new Error('Missing GEMINI_API_KEY');

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey}`;  
    
    const geminiRes = await fetch(geminiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `User request: "${text}"` }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { responseMimeType: 'application/json', temperature: 0.1 },
      }),
    });

    if (!geminiRes.ok) throw new Error(`Gemini API error: ${geminiRes.status}`);

    const data = await geminiRes.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return {
      ...JSON.parse(cleanJson),
      provider: 'Gemini',
      latency: Math.round(performance.now() - startTime)
    };

  } catch (geminiError: any) {
    console.warn('Gemini failed. Routing to Groq Llama 3...', geminiError.message);
    const groqStartTime = performance.now();

    // --- 2. GROQ LLAMA 3 (SECONDARY AI) ---
    try {
      const groqKey = process.env.GROQ_API_KEY;
      if (!groqKey) throw new Error('Missing GROQ_API_KEY');

      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', 
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: `User request: "${text}". Return the output strictly as JSON.` } 
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1
        })
      });

      if (!groqRes.ok) {
        const errText = await groqRes.text();
        throw new Error(`Groq API error: ${groqRes.status} - ${errText}`);
      }

      const groqData = await groqRes.json();
      const groqContent = groqData.choices[0].message.content;
      
      return {
        ...JSON.parse(groqContent),
        provider: 'Groq',
        latency: Math.round(performance.now() - groqStartTime)
      };

    } catch (groqError: any) {
      console.error('Groq fallback failed. Using Ultimate Local Fallback.', groqError.message);

      // --- 3. ULTIMATE LOCAL FALLBACK (TERTIARY) ---
      const fallback = runLocalFallback(text, lowerText);
      return {
        ...fallback,
        provider: 'Local Fallback',
        latency: Math.round(performance.now() - startTime)
      };
    }
  }
}

function runLocalFallback(text: string, lowerText: string) {
  if (lowerText.includes('override') || lowerText.includes('card') || lowerText.includes('hack')) {
    return { intent: 'data_extraction' as const, item: text, estimated_cost: 0 };
  }
  if (lowerText.includes('rolex') || lowerText.includes('watch') || lowerText.includes('car')) {
    return { intent: 'unknown' as const, item: text, estimated_cost: 150000 };
  }
  if (lowerText.includes('flight') || lowerText.includes('travel') || lowerText.includes('ticket')) {
    return { intent: 'travel_booking' as const, item: text, estimated_cost: 8500 };
  }
  if (lowerText.includes('food') || lowerText.includes('pizza') || lowerText.includes('biryani') || lowerText.includes('sandwich') || lowerText.includes('sambhar') || lowerText.includes('order')) {
    return { intent: 'food_order' as const, item: text, estimated_cost: 350 };
  }
  return { intent: 'unknown' as const, item: text, estimated_cost: 0 };
}