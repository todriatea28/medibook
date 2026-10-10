import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="site-header">
      <h2 className="header-title">მართვის პანელი</h2>
      <div className="profile-section">
        <span className="profile-name">თეა</span>
        <div className="avatar">თ</div>
      </div>
    </header>
  );
}