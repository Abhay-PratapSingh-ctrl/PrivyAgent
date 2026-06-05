import { NextRequest, NextResponse } from 'next/server';
import { issueScopedCredential } from '@/lib/t3n';

export async function POST(request: NextRequest) {
  try {
    const { userId, allowedActions, maxSpendInr } = await request.json();

    const scope = {
      allowed_actions: allowedActions || ['food_order', 'grocery_order', 'travel_booking'],
      max_spend_inr: maxSpendInr || 10000,
      data_access: {
        card_number: 'FORBIDDEN' as const,
        delivery_address: 'FORBIDDEN' as const,
        phone: 'FORBIDDEN' as const
      },
      payment_via: 'T3N_TEE_ONLY'
    };

    const credentialData = await issueScopedCredential(userId, scope);
    return NextResponse.json({ success: true, credentialId: credentialData.credential_id, scope });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Credential issuance failed' }, { status: 500 });
  }
}