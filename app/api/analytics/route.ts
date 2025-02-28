import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward the request to Plausible
    const response = await fetch('https://plausible.z3n.sh/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'User-Agent': request.headers.get('user-agent') || '',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Plausible API responded with status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to forward analytics' },
      { status: 500 }
    );
  }
}
