import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Invalid feedback message' 
      }, { status: 400 });
    }
    
    // Log the feedback (in a real app, you might save this to a database)
    console.log('Received feedback:', body.message);
    
    // Simulate a slight delay to make the loading state visible
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return a success response
    return NextResponse.json({ 
      status: 'success', 
      message: 'Feedback received successfully',
      timestamp: new Date().toISOString(),
      feedbackId: `feedback_${Date.now()}`
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing feedback:', error);
    
    // Return an error response
    return NextResponse.json({ 
      status: 'error', 
      message: 'Failed to process feedback',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 