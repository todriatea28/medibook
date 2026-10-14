import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <article className={`bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-blue-500/20 shadow-xl ${className}`}>
      {children}
    </article>
  );
}