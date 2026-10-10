import React from 'react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="site-sidebar">
      <div className="sidebar-brand">
        <h1>MediBook</h1>
      </div>
      <nav className="sidebar-nav">
        <a href="#overview" className="nav-link active">მიმოხილვა</a>
        <a href="#doctors" className="nav-link">ექიმები</a>
        <a href="#patients" className="nav-link">პაციენტები</a>
        <a href="#settings" className="nav-link">პარამეტრები</a>
      </nav>
    </aside>
  );
}