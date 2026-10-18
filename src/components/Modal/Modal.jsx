import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  // ReactDOM.createPortal გამოყენება იმისათვის, რომ მოდალი რენდერდეს DOM-ის თავში (document.body)
  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
      onClick={onClose} // ფონზე (Overlay) კლიკით დახურვა
    >
      <div 
        className="bg-slate-900 border border-blue-500/30 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()} // შიდა კონტენტზე კლიკისას მოდალი არ დაიხუროს
      >
        <div className="flex justify-between items-center mb-4 border-b border-blue-500/20 pb-3">
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
    </div>,
    document.body
  );
}