'use client';

import React, { useState } from 'react';
import InputBox from '@/components/InputBox';
import AgentView from '@/components/AgentView';
import VaultView from '@/components/VaultView';
import AuditLog from '@/components/AuditLog';
import { AuditLogEntry } from '@/lib/types';

// Helper function to create cinematic delays
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [intentData, setIntentData] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [currentTxnId, setCurrentTxnId] = useState<string>('');
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  
  // State for the cinematic text on the right column
  const [cryptoStatus, setCryptoStatus] = useState<string>('');

  const [mockCredential] = useState<any>({
    did: 'did:t3n:agent_privy_001',
    max_spend: 10000,
    allowed: ['food_order', 'grocery_order', 'travel_booking']
  });

  const handleExecuteAction = async (text: string) => {
    setIsLoading(true);
    setActiveStep(1); 
    setIsAuthorized(null);
    setCurrentTxnId('');
    setCryptoStatus('');
    setIntentData({ status: 'Evaluating semantic intent...' });

    try {
      // 1. Instant LLM Processing (Agent Side)
      const classifyRes = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const parsedIntent = await classifyRes.json();
      setIntentData(parsedIntent);
      
      // 2. Pass to the Enclave (Start Cinematic Delays)
      setActiveStep(2); 
      
      setCryptoStatus('[ ENCLAVE BOOTING ]');
      await sleep(600);

      setCryptoStatus('[ VERIFYING W3C SIGNATURES ]');
      await sleep(800);

      // Hit the actual T3N API route while the UI flashes
      const verifyRes = await fetch('/api/verify-vc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credentialId: 'mock_cred_id_123',
          action: parsedIntent.intent,
          amount: parsedIntent.estimated_cost
        }),
      });
      const authResult = await verifyRes.json();

      setCryptoStatus('[ ANCHORING ZK-PROOF TO ETHEREUM ]');
      await sleep(800);

      // 3. Finalize Result
      setCryptoStatus(''); // Clear the loading text
      setIsAuthorized(authResult.authorized);
      setCurrentTxnId(authResult.txnId || (authResult.authorized ? 'T3N-PROOF-7842' : 'COMPLIANCE_REJECTION'));
      setActiveStep(3); 

      // 4. Record event to the audit trail
      const newLog: AuditLogEntry = {
        timestamp: new Date().toISOString(),
        agent_did: mockCredential.did,
        action: parsedIntent.intent,
        item: parsedIntent.item,
        amount: parsedIntent.estimated_cost,
        authorized: authResult.authorized,
        data_exposed: 'NONE',
        txn_id: authResult.txnId || (authResult.authorized ? 'T3N-PROOF-7842' : 'ERR-403')
      };
      setLogs((prev) => [newLog, ...prev]);

    } catch (err) {
      console.error(err);
      setIntentData({ intent: 'unknown', item: 'Error processing input', estimated_cost: 0 });
      setIsAuthorized(false);
      setCryptoStatus('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-8 font-sans selection:bg-indigo-500/30">
      <header className="mb-10 border-b border-neutral-800 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">PrivyAgent</h1>
          <p className="text-neutral-400 mt-1">Your AI that acts, never sees. Secured by Terminal 3 TEE.</p>
        </div>
        <div className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-mono text-neutral-500 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          TEE Vault Active
        </div>
      </header>

      {/* Main Split-Screen Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-4">Command Center</h2>
            <InputBox onExecute={handleExecuteAction} isLoading={isLoading} />
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 font-mono text-xs space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">Agent Passport Policy</h2>
            <div className="text-neutral-400"><span className="text-neutral-600">DID:</span> {mockCredential.did}</div>
            <div className="text-neutral-400"><span className="text-neutral-600">Spend Cap:</span> ₹{mockCredential.max_spend} INR</div>
            <div className="text-neutral-400"><span className="text-neutral-600">Scopes:</span> food, travel, grocery</div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-4">Cryptographic Audit Log</h2>
            <AuditLog logs={logs} />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1 lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">Hardware Memory Isolation State</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Agent Window */}
            <div className="bg-black/50 border border-neutral-800 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/50"></div>
              
              {/* HEADER WITH NEW TELEMETRY BADGE */}
              <div className="flex justify-between items-center mb-4 border-b border-neutral-900 pb-2">
                <h3 className="text-amber-400 font-mono text-sm">Agent Context View</h3>
                
                {intentData && intentData.provider && (
                  <div className="flex items-center gap-2 text-[10px] font-mono animate-in fade-in zoom-in duration-300">
                    <span className={`px-1.5 py-0.5 rounded border ${
                      intentData.provider === 'Groq' 
                        ? 'bg-amber-950/50 border-amber-800/50 text-amber-500' 
                        : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                    }`}>
                      {intentData.provider}
                    </span>
                    <span className="text-neutral-500">⚡ {intentData.latency}ms</span>
                  </div>
                )}
              </div>

              <AgentView activeStep={activeStep} intentData={intentData} isAuthorized={isAuthorized} />
            </div>

            {/* Enclave Vault */}
            <div className="bg-black/50 border border-neutral-800 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
              <h3 className="text-emerald-400 font-mono text-sm mb-4 border-b border-neutral-900 pb-2">T3N Enclave Vault</h3>
              <VaultView 
                activeStep={activeStep} 
                isAuthorized={isAuthorized} 
                txnId={currentTxnId} 
                cryptoStatus={cryptoStatus}
              />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}