'use client';

import React from 'react';
import { EyeOff } from 'lucide-react';

interface AgentViewProps {
  activeStep: number;
  intentData: any;
  isAuthorized: boolean | null;
}

export default function AgentView({ activeStep, intentData, isAuthorized }: AgentViewProps) {
  if (activeStep === 0) {
    return <div className="text-xs text-neutral-600 font-mono italic">Waiting for agent command initialization...</div>;
  }

  return (
    <div className="space-y-4 font-mono text-xs">
      <div>
        <span className="text-neutral-500">{"// Parsed LLM Payload"}</span>
        <pre className="mt-1 bg-black/40 p-2 rounded text-amber-400 border border-neutral-900 overflow-x-auto">
          {JSON.stringify(intentData || { status: 'processing...' }, null, 2)}
        </pre>
      </div>

      <div className="space-y-2 border-t border-neutral-900 pt-3">
        <span className="text-neutral-500">{"// Sensitive Data Redaction"}</span>
        <div className="p-2.5 bg-neutral-950 rounded border border-neutral-900 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Card Number:</span>
            <span className="bg-red-950/40 text-red-400 border border-red-900/30 px-1.5 py-0.5 rounded flex items-center gap-1 text-[10px]">
              <EyeOff size={10} /> REDACTED_TOKEN
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Delivery Loc:</span>
            <span className="bg-red-950/40 text-red-400 border border-red-900/30 px-1.5 py-0.5 rounded flex items-center gap-1 text-[10px]">
              <EyeOff size={10} /> REDACTED_TOKEN
            </span>
          </div>
        </div>
      </div>

      {isAuthorized !== null && (
        <div className={`p-3 rounded border text-center font-bold ${isAuthorized ? 'bg-emerald-950/30 border-emerald-900 text-emerald-400' : 'bg-rose-950/30 border-rose-900 text-rose-400'}`}>
          {isAuthorized ? '✓ EXECUTION_COMPLETED_VIA_TEE_PROOF' : '✕ ACTION_HALTED_SCOPE_EXCEEDED'}
        </div>
      )}
    </div>
  );
}