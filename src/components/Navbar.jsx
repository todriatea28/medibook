import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

const PANEL_BY_ROLE = {
  admin: { to: '/admin', label: 'ადმინ პანელი' },
  doctor: { to: '/doctor', label: 'ჩემი პანელი' },
  patient: { to: '/patient', label: 'ექიმები' },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const links = [{ to: '/', label: 'მთავარი' }];
  if (user && PANEL_BY_ROLE[role]) links.push(PANEL_BY_ROLE[role]);
  if (!user) links.push({ to: '/register', label: 'რეგისტრაცია' });

  const handleLogout = async () => {
    setIsOpen(false);
    await signOut();
    navigate('/login');
  };

  const linkClass = 'transition hover:text-teal-600';
  const ctaClass =
    'px-4 py-2 text-white transition bg-teal-600 shadow-sm rounded-xl hover:bg-teal-500';

  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm border-slate-200">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6">
        <Link to="/" className="text-2xl font-black tracking-tight text-teal-600">
          MediBook
        </Link>

        <nav
          aria-label="მთავარი ნავიგაცია"
          className="items-center hidden gap-6 text-sm font-semibold md:flex text-slate-600"
        >
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className={ctaClass}>
              გასვლა
            </button>
          ) : (
            <Link to="/login" className={ctaClass}>
              შესვლა
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user && <NotificationBell />}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="მენიუს გახსნა"
            aria-expanded={isOpen}
            className="p-2 transition md:hidden rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          aria-label="მობილური ნავიგაცია"
          className="px-4 py-4 space-y-3 bg-white border-b shadow-lg md:hidden border-slate-200"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setIsOpen(false)}
              className="block py-1 text-sm font-semibold text-slate-700 hover:text-teal-600"
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-xl"
            >
              გასვლა
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full py-2.5 text-sm font-semibold text-center text-white bg-teal-600 rounded-xl"
            >
              შესვლა
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}