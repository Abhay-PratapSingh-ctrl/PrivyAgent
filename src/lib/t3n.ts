import { T3NCredentialScope } from './types';

const BASE_URL = 'https://api.terminal3.io/v1';

// Helper to get the API key on the server side
const getAuthHeaders = () => {
  const apiKey = process.env.T3N_API_KEY;
  if (!apiKey) throw new Error('Missing T3N_API_KEY in environment variables.');
  return {
    'Content-Type': 'application/json',
    'X-API-Token': apiKey,
  };
};

/**
 * Step 1: Create a secure user identity (DID)
 */
export async function createAgentIdentity(name: string, email: string) {
  const response = await fetch(`${BASE_URL}/user`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, email }),
  });
  
  if (!response.ok) throw new Error(`T3N User Creation Failed: ${response.statusText}`);
  return response.json(); // Returns { user_id, did }
}

/**
 * Step 2: Issue a Verifiable Credential with strictly scoped limits
 */
export async function issueScopedCredential(userId: string, scope: T3NCredentialScope) {
  const response = await fetch(`${BASE_URL}/credential`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ 
      user_id: userId, 
      credential: { ...scope } 
    }),
  });

  if (!response.ok) throw new Error(`T3N Credential Issuance Failed: ${response.statusText}`);
  return response.json(); // Returns { credential_id }
}

/**
 * Step 3: Verify the credential before executing a sensitive action
 */
export async function verifyActionProof(credentialId: string, action: string, amount: number) {
  const response = await fetch(`${BASE_URL}/presentation`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ 
      credential_id: credentialId, 
      action, 
      amount 
    }),
  });

  if (!response.ok) {
    // If it fails, we want to know why (e.g., SCOPE_EXCEEDED)
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Action verification failed.');
  }
  
  return response.json(); // Returns { proof, authorized: true }
}