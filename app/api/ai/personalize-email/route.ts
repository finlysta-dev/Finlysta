// app/api/ai/personalize-email/route.ts
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: Request) {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const body = await request.json();
    const {
      recruiterName,
      companyName,
      jobTitle,
      yourName,
      skills,
      specificPoint,
      templateType,
      currentBody,
      currentSubject
    } = body;

    // Construct the prompt for Groq
    const prompt = `
      You are an expert email writer for finance job applications. Personalize this thank you email with the provided details.

      Current Email Subject: ${currentSubject}
      Current Email Body: ${currentBody}

      Personalization Details:
      - Recruiter Name: ${recruiterName}
      - Company Name: ${companyName}
      - Job Title: ${jobTitle}
      - Candidate Name: ${yourName}
      - Skills: ${skills.join(', ')}
      - Key Discussion Point: ${specificPoint}

      Task: Return a JSON object with the following fields:
      1. "skill1" - A more professional/specific version of the first skill
      2. "skill2" - A more professional/specific version of the second skill  
      3. "skill3" - A more professional/specific version of the third skill
      4. "specificPoint" - An improved, more specific version of the key discussion point
      5. "subject" - An improved subject line
      6. "body" - The full personalized email body with all details incorporated naturally

      Make the email sound professional, enthusiastic, and personalized. Keep it concise (120-180 words).
      
      Return ONLY valid JSON, no other text.
    `;

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert email writer for finance job applications. Always return valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile", // You can also use "mixtral-8x7b-32768" or "gemma2-9b-it"
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });

    // Parse the response
    const responseContent = completion.choices[0]?.message?.content || '';
    let result;
    
    try {
      result = JSON.parse(responseContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseContent);
      // Fallback response
      result = {
        skill1: `Advanced ${skills[0] || 'Financial Analysis'}`,
        skill2: `Expert ${skills[1] || 'Excel'}`,
        skill3: `Strategic ${skills[2] || 'Business Intelligence'}`,
        specificPoint: `${companyName}'s innovative approach to ${specificPoint || 'finance'}`,
        subject: currentSubject,
        body: currentBody
      };
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Groq API error:', error);
    
    // Return fallback response on error
    return NextResponse.json({
      skill1: `Advanced Financial Modeling`,
      skill2: `Data Analytics & Visualization`,
      skill3: `Strategic Business Planning`,
      specificPoint: `innovative financial strategies and investment planning`,
      subject: `Thank You for Considering My Application`,
      body: `Dear Hiring Manager,

I hope this email finds you well.

I recently submitted my application and wanted to personally thank you for considering my candidacy.

I'm genuinely excited about the opportunity to contribute to your team. My background in financial analysis and passion for strategic planning align perfectly with what you're looking for.

I've also sent you a LinkedIn connection request to stay connected professionally.

Thank you for your time and consideration. I look forward to hearing from you.

Warm regards,
Candidate`
    });
  }
}