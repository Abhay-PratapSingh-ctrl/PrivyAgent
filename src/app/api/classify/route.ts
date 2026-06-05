import { NextRequest, NextResponse } from 'next/server';
import { classifyUserInput } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'A valid text string is required in the request body.' },
        { status: 400 }
      );
    }

    const result = await classifyUserInput(text);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}