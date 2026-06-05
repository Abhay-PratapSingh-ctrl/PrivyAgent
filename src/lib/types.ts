export type IntentCategory = 'food_order' | 'travel_booking' | 'grocery_order' | 'data_extraction' | 'unknown';

export interface ClassifiedIntent {
  intent: IntentCategory;
  item: string;
  estimated_cost: number;
  provider: 'Gemini' | 'Groq' | 'Local Fallback';
  latency: number;
}

export interface T3NCredentialScope {
  allowed_actions: IntentCategory[];
  max_spend_inr: number;
  data_access: {
    card_number: 'ALLOWED' | 'FORBIDDEN';
    delivery_address: 'ALLOWED' | 'FORBIDDEN';
    phone: 'ALLOWED' | 'FORBIDDEN';
  };
  payment_via: string;
}

export interface AuditLogEntry {
  timestamp: string;
  agent_did: string;
  action: string;
  item: string;
  amount: number;
  authorized: boolean;
  data_exposed: 'NONE' | 'PARTIAL' | 'FULL';
  txn_id: string;
  reason?: string;
}