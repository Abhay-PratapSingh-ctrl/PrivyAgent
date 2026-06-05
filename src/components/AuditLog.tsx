'use client';

import React from 'react';
import { AuditLogEntry } from '../lib/types';

interface AuditLogProps {
  logs: AuditLogEntry[];
}

export default function AuditLog({ logs }: AuditLogProps) {
  if (logs.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-neutral-600 font-mono text-xs border border-neutral-800 border-dashed rounded-lg p-4">
        No cryptographic events captured.
      </div>
    );
  }

  return (
    <div className="h-[200px] overflow-y-auto font-mono text-[11px] space-y-2 pr-1">
      {logs.map((log, index) => (
        <div key={index} className={`p-2 rounded border bg-black/20 ${log.authorized ? 'border-emerald-950 text-neutral-300' : 'border-rose-950 text-neutral-400'}`}>
          <div className="flex justify-between font-bold">
            <span className={log.authorized ? 'text-emerald-400' : 'text-rose-400'}>
              [{log.authorized ? 'SUCCESS' : 'BLOCKED'}] {log.action}
            </span>
            <span className="text-neutral-600">{new Date(log.timestamp).toLocaleTimeString()}</span>
          </div>
          <div className="text-neutral-500 mt-1 truncate">Item: {log.item} | Cost: ₹{log.amount}</div>
          <div className="text-neutral-600 text-[10px] truncate">Proof ID: {log.txn_id}</div>
        </div>
      ))}
    </div>
  );
}