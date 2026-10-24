import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm border-slate-200">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6">
        {/* ლოგო */}
        <Link to="/" className="text-2xl font-black tracking-tight text-teal-600">
          MediBook
        </Link>

        {/* დესკტოპ ნავიგაცია (ჩანს მხოლოდ დიდ ეკრანებზე) */}
        <nav className="items-center hidden gap-6 text-sm font-semibold md:flex text-slate-600">
          <Link to="/" className="transition hover:text-teal-600">მთავარი</Link>
          <Link to="/schedule" className="transition hover:text-teal-600">განრიგი</Link>
          <Link to="/admin" className="transition hover:text-teal-600">პანელი</Link>
          <Link to="/register" className="transition hover:text-teal-600">რეგისტრაცია</Link>
          <Link to="/login" className="px-4 py-2 text-white transition bg-teal-600 shadow-sm rounded-xl hover:bg-teal-500">
            შესვლა
          </Link>
        </nav>

        {/* ჰამბურგერ ღილაკი (ჩანს მხოლოდ მობილურზე / პატარა ეკრანზე) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-xl transition md:hidden rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* მობილური ჩამოსაშლელი მენიუ */}
      {isOpen && (
        <div className="px-4 py-4 space-y-3 bg-white border-b shadow-lg md:hidden border-slate-200 animate-fadeIn">
          <Link to="/" onClick={() => setIsOpen(false)} className="block py-1 text-sm font-semibold text-slate-700 hover:text-teal-600">
            მთავარი
          </Link>
          <Link to="/schedule" onClick={() => setIsOpen(false)} className="block py-1 text-sm font-semibold text-slate-700 hover:text-teal-600">
            განრიგი
          </Link>
          <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-1 text-sm font-semibold text-slate-700 hover:text-teal-600">
            პანელი
          </Link>
          <Link to="/register" onClick={() => setIsOpen(false)} className="block py-1 text-sm font-semibold text-slate-700 hover:text-teal-600">
            რეგისტრაცია
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center w-full py-2.5 bg-teal-600 text-white rounded-xl text-sm font-semibold">
            შესვლა
          </Link>
        </div>
      )}
    </header>
  );
}