import React from 'react';
import './StatCard.css';

export default function StatCard({ title, value, change }) {
  return (
    <article className="stat-card">
      <h3 className="stat-title">{title}</h3>
      <p className="stat-value">{value}</p>
      <span className="stat-change">{change}</span>
    </article>
  );
}