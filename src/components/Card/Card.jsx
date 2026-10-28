export default function Card({ children, className = '' }) {
  return (
    <article className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
      {children}
    </article>
  );
}