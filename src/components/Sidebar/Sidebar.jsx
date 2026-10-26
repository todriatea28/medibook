import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const links = [
  { to: '/admin', label: 'მიმოხილვა', end: true },
  { to: '/admin/doctors', label: 'ექიმები' },
  { to: '/admin/patients', label: 'პაციენტები' },
  { to: '/admin/settings', label: 'ვიზიტები' },
];

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <aside className={`site-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <h1>MediBook</h1>
      </div>
      <nav className="sidebar-nav" aria-label="ადმინის მენიუ">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onClose}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}