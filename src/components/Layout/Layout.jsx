import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './Layout.css';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {menuOpen && <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

      <div className="main-wrapper">
        <Header onMenuClick={() => setMenuOpen((v) => !v)} menuOpen={menuOpen} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}