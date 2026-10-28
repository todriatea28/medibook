import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="pt-12 pb-8 border-t bg-stone-900 text-stone-300 border-stone-800">
      <div className="grid grid-cols-1 gap-8 px-4 mx-auto mb-12 max-w-7xl sm:px-6 lg:px-8 md:grid-cols-4">
        {/* ლოგო და აღწერა */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-transparent bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text">
              MediHub
            </span>
          </div>
          <p className="text-sm leading-relaxed text-stone-400">
            თანამედროვე სამედიცინო პლატფორმა ექიმების მოსაძებნად და ვიზიტების სწრაფად დასაჯავშნად.
          </p>
        </div>

        {/* სწრაფი ლინკები */}
        <div>
          <h4 className="pl-2 mb-4 text-sm font-semibold text-white border-l-2 border-rose-700">ნავიგაცია</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="transition hover:text-rose-400">მთავარი</Link></li>
            <li><Link to="/schedule" className="transition hover:text-rose-400">ვიზიტის დაჯავშნა</Link></li>
            <li><Link to="/login" className="transition hover:text-rose-400">სისტემაში შესვლა</Link></li>
            <li><Link to="/register" className="transition hover:text-rose-400">რეგისტრაცია</Link></li>
          </ul>
        </div>

        {/* სპეციალობები */}
        <div>
          <h4 className="pl-2 mb-4 text-sm font-semibold text-white border-l-2 border-rose-700">მიმართულებები</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>კარდიოლოგია</li>
            <li>ნევროლოგია</li>
            <li>რეანიმაცია</li>
            <li>ლაბორატორიული კვლევები</li>
          </ul>
        </div>

        {/* კონტაქტი */}
        <div>
          <h4 className="pl-2 mb-4 text-sm font-semibold text-white border-l-2 border-rose-700">კონტაქტი</h4>
          <div className="space-y-2 text-xs text-stone-400">
            <p>📍 თბილისი, საქართველო</p>
            <p>✉️ info@medihub.ge</p>
            <p>📞 +995 (32) 2 00 00 00</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between px-4 pt-6 mx-auto text-xs border-t max-w-7xl border-stone-800 sm:flex-row text-stone-500">
        <p>© {new Date().getFullYear()} MediHub. ყველა უფლება დაცულია.</p>
        <div className="flex mt-3 space-x-4 sm:mt-0">
          <span className="cursor-pointer hover:text-stone-400">კონფიდენციალურობა</span>
          <span>•</span>
          <span className="cursor-pointer hover:text-stone-400">წესები და პირობები</span>
        </div>
      </div>
    </footer>
  );
}