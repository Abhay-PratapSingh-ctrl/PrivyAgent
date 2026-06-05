import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { credentialId, action, amount } = await request.json();

    if (!credentialId || !action || amount === undefined) {
      return NextResponse.json({ error: 'Missing required validation fields.' }, { status: 400 });
    }

    // T3N Hackathon Demo Logic: 
    // In production, this hits verifyActionProof() from '@/lib/t3n'
    // For the UI demo, we evaluate against our mock Agent Passport limits
    const allowedActions = ['food_order', 'grocery_order', 'travel_booking'];
    const maxSpend = 10000;

    const isActionAllowed = allowedActions.includes(action);
    const isAmountAllowed = amount <= maxSpend;

    if (isActionAllowed && isAmountAllowed) {
      // Simulate successful TEE Anchor Proof
      return NextResponse.json({ 
        authorized: true, 
        txnId: `T3N-PROOF-${Math.floor(Math.random() * 9000) + 1000}` 
      });
    } else {
      // Simulate TEE rejecting the action (e.g., Rolex is over budget, or intent is unknown)
      return NextResponse.json({ 
        authorized: false, 
        reason: 'ACTION_HALTED_SCOPE_EXCEEDED' 
      }, { status: 200 }); 
    }
  } catch (error: any) {
    return NextResponse.json({ 
      authorized: false, 
      reason: error.message || 'Action unauthorized by enclave boundaries.' 
    }, { status: 500 });
  }
}