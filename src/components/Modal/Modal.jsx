import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 border shadow-2xl bg-slate-900 border-blue-500/30 rounded-2xl">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-blue-500/20">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="text-blue-400 hover:text-white transition text-xs font-bold px-2.5 py-1 bg-slate-800 rounded-lg border border-blue-500/20"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}