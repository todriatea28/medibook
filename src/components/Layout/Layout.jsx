import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import StatCard from '../StatCard/StatCard';
import './Layout.css';

export default function Layout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          <section className="stats-grid">
            <StatCard title="მთლიანი შემოსავალი" value="₾12,450" change="↑ 12% ამ თვეში" />
            <StatCard title="აქტიური პაციენტები" value="1,240" change="↑ 8% ახალი" />
            <StatCard title="დღიური ჯავშნები" value="36" change="განახლებულია დღეს" />
          </section>
        </main>
      </div>
    </div>
  );
}