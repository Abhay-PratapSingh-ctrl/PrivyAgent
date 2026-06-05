'use client';

import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

interface VaultViewProps {
  activeStep: number;
  isAuthorized: boolean | null;
  txnId: string;
  cryptoStatus: string; // <-- New prop for our cinematic text
}

export default function VaultView({ activeStep, isAuthorized, txnId, cryptoStatus }: VaultViewProps) {
  if (activeStep < 2) {
    return <div className="text-xs text-neutral-600 font-mono italic">Awaiting secure hardware handshake sequence...</div>;
  }

  // --- NEW: Cinematic Loading State ---
  if (cryptoStatus) {
    return (
      <div className="h-full py-8 flex flex-col items-center justify-center space-y-4 font-mono text-xs border border-emerald-900/30 bg-emerald-950/10 rounded-lg">
        <Cpu size={24} className="text-emerald-500 animate-pulse" />
        <div className="text-emerald-400 tracking-widest">{cryptoStatus}</div>
        <div className="w-48 h-1 bg-neutral-900 rounded overflow-hidden">
          {/* A cool indeterminate progress bar */}
          <div className="h-full bg-emerald-500/50 w-full origin-left animate-[pulse_1s_ease-in-out_infinite]"></div>
        </div>
      </div>
    );
  }

  // --- ORIGINAL: Final State ---
  return (
    <div className="space-y-4 font-mono text-xs animate-in fade-in zoom-in-95 duration-300">
      <div className="p-2.5 bg-neutral-950 rounded border border-neutral-900 space-y-2">
        <div className="text-emerald-500 font-bold flex items-center gap-1.5">
          <ShieldCheck size={14} /> Isolated Enclave Memory State
        </div>
        <div className="space-y-1 text-neutral-400 border-t border-neutral-900 pt-2 text-[11px]">
          <div><span className="text-neutral-500">Real Card:</span> 4242 1234 5678 9010</div>
          <div><span className="text-neutral-500">Real Address:</span> B-204, NIT Trichy Campus</div>
          <div><span className="text-neutral-500">Real Phone:</span> +91 98765 43210</div>
        </div>
      </div>

      {isAuthorized !== null && (
        <div className="space-y-2">
          <span className="text-neutral-500">{"// Hardware Cryptographic Log"}</span>
          <div className="p-2.5 bg-black/40 rounded border border-neutral-900 text-[11px] space-y-1 text-neutral-300">
            <div>
              <span className="text-neutral-500">Auth Status:</span>{' '}
              <span className={isAuthorized ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                {isAuthorized ? 'ALLOWED' : 'FORBIDDEN'}
              </span>
            </div>
            <div>
              <span className="text-neutral-500">Anchor Proof:</span>{' '}
              <span className={isAuthorized ? 'text-indigo-400' : 'text-rose-400'}>{txnId || 'N/A'}</span>
            </div>
            <div>
              <span className="text-neutral-500">Data Leakage:</span>{' '}
              <span className="text-emerald-400 font-bold">0% ZERO_EXPOSURE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}