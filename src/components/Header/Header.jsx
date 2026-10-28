import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header({ onMenuClick = () => {}, menuOpen = false }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const name = profile?.full_name || profile?.email || '';
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-left">
        <button
          type="button"
          className="menu-btn"
          onClick={onMenuClick}
          aria-label="მენიუს გახსნა"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <h2 className="header-title">მართვის პანელი</h2>
      </div>
      <div className="profile-section">
        <span className="profile-name">{name}</span>
        <div className="avatar">{initial}</div>
        <button onClick={handleLogout} className="logout-btn">გასვლა</button>
      </div>
    </header>
  );
}