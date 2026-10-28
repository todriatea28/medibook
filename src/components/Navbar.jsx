import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell"; // 1. იმპორტი

const PANEL_BY_ROLE = {
  admin: { to: "/admin", label: "ადმინ პანელი" },
  doctor: { to: "/doctor", label: "ჩემი პანელი" },
  patient: { to: "/patient", label: "ექიმები" },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const links = [{ to: "/", label: "მთავარი" }];
  if (user && PANEL_BY_ROLE[role]) links.push(PANEL_BY_ROLE[role]);
  if (!user) links.push({ to: "/register", label: "რეგისტრაცია" });

  const handleLogout = async () => {
    setIsOpen(false);
    await signOut();
    navigate("/login");
  };

  const linkClass = "transition hover:text-rose-900 font-medium";
  const ctaClass =
    "px-5 py-2.5 text-white transition bg-rose-900 shadow-md shadow-rose-900/20 rounded-xl hover:bg-rose-800 font-semibold";

  return (
    <header className="sticky top-0 z-50 border-b shadow-sm backdrop-blur-xl bg-white/80 border-stone-200/80">
      <div className="flex items-center justify-between h-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-transparent bg-gradient-to-r from-rose-900 to-rose-700 bg-clip-text"
        >
          medihub
        </Link>

        <nav
          aria-label="მთავარი ნავიგაცია"
          className="items-center hidden gap-6 text-sm font-semibold md:flex text-stone-700"
        >
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </Link>
          ))}

          {/* 2. თუ მომხმარებელი შესულია, ვუჩვენებთ შეტყობინებების ზარს */}
          {user && <NotificationBell />}

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

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="მენიუს გახსნა"
          aria-expanded={isOpen}
          className="p-2.5 text-lg transition md:hidden rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <nav
          aria-label="მობილური ნავიგაცია"
          className="px-4 py-6 space-y-4 border-b shadow-xl bg-white/95 backdrop-blur-xl md:hidden border-stone-200"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-semibold transition text-stone-700 hover:text-rose-900"
            >
              {l.label}
            </Link>
          ))}

          {/* მობილური ვერსიისთვისაც რომ გამოჩნდეს ზარი */}
          {user && (
            <div className="flex items-center justify-between py-2 pt-3 border-t border-stone-100">
              <span className="text-xs font-semibold text-stone-600">შეტყობინებები:</span>
              <NotificationBell />
            </div>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full py-3 text-sm font-semibold text-white shadow-md bg-rose-900 rounded-xl shadow-rose-900/20"
            >
              გასვლა
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3 text-sm font-semibold text-center text-white shadow-md bg-rose-900 rounded-xl shadow-rose-900/20"
            >
              შესვლა
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}