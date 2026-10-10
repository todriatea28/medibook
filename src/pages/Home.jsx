import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-slate-950">
      
      {/* ზედა ნავიგაცია (<header>) */}
      <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <h1 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text">
            MediBook
          </h1>
          <nav aria-label="მთავარი ნავიგაცია">
            <ul className="flex items-center space-x-6 text-sm font-medium text-blue-200">
              <li><Link to="/" className="font-semibold text-sky-400">მთავარი</Link></li>
              <li><Link to="/schedule" className="transition hover:text-sky-400">განრიგი</Link></li>
              <li><Link to="/login" className="px-4 py-2 text-white transition border bg-blue-600/20 border-blue-500/30 rounded-xl hover:bg-blue-600/30">შესვლა</Link></li>
              <li><Link to="/register" className="px-4 py-2 font-semibold text-white transition shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl hover:from-sky-400 hover:to-blue-500 shadow-sky-500/20">რეგისტრაცია</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ძირითადი კონტენტი (<main>) */}
      <main className="flex-1 w-full px-6 py-12 mx-auto space-y-12 max-w-7xl">
        
        {/* ჰიერო სექცია */}
        <section className="p-8 py-12 text-center border shadow-2xl bg-gradient-to-b from-blue-950/40 to-transparent rounded-3xl border-blue-500/10">
          <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            იპოვე შენი ექიმი და <span className="text-transparent bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text">დაჯავშნე ვიზიტი</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-base text-blue-300 md:text-lg">
            თანამედროვე სამედიცინო პლატფორმა, რომელიც ამარტივებს კლინიკასთან კომუნიკაციას და ვიზიტების მართვას.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/schedule" className="px-6 py-3 font-semibold text-white transition shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500">
              ვიზიტის დაჯავშნა
            </Link>
            <Link to="/login" className="px-6 py-3 font-semibold text-blue-200 transition border bg-slate-900 border-blue-500/30 rounded-xl hover:bg-slate-800">
              პანელში შესვლა
            </Link>
          </div>
        </section>

        {/* პოპულარული სპეციალისტები */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-blue-100">პოპულარული სპეციალისტები</h3>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            
            <article className="p-6 space-y-4 border shadow-xl bg-slate-900 rounded-2xl border-blue-500/20">
              <div className="h-48 overflow-hidden border bg-slate-800 rounded-xl border-blue-500/10">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" 
                  alt="დრ. ნინო ბერიძე" 
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="text-lg font-bold text-white">დრ. ნინო ბერიძე</h4>
              <p className="text-sm text-sky-400">კარდიოლოგი</p>
              <p className="text-xs leading-relaxed text-blue-300">
                15 წლიანი გამოცდილება გულ-სისხლძარღვთა დაავადებების მკურნალობაში.
              </p>
            </article>

            <article className="p-6 space-y-4 border shadow-xl bg-slate-900 rounded-2xl border-blue-500/20">
              <div className="h-48 overflow-hidden border bg-slate-800 rounded-xl border-blue-500/10">
                <img 
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400" 
                  alt="დრ. დავით ლომიძე" 
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="text-lg font-bold text-white">დრ. დავით ლომიძე</h4>
              <p className="text-sm text-sky-400">ნევროლოგი</p>
              <p className="text-xs leading-relaxed text-blue-300">
                თანამედროვე მიდგომები ნევროლოგიური პათოლოგიების დიაგნოსტიკასა და რეაბილიტაციაში.
              </p>
            </article>

            <article className="p-6 space-y-4 border shadow-xl bg-slate-900 rounded-2xl border-blue-500/20">
              <div className="h-48 overflow-hidden border bg-slate-800 rounded-xl border-blue-500/10">
                <img 
                  src="https://images.unsplash.com/photo-1594824813568-a461327173e9?auto=format&fit=crop&q=80&w=400" 
                  alt="დრ. მაია ქავთარაძე" 
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="text-lg font-bold text-white">დრ. მაია ქავთარაძე</h4>
              <p className="text-sm text-sky-400">პედიატრი</p>
              <p className="text-xs leading-relaxed text-blue-300">
                ზოგადი პედიატრია და ბავშვთა ინფექციური დაავადებების მართვა.
              </p>
            </article>

          </div>
        </section>

      </main>

      {/* ფუტერი (<footer>) */}
      <footer className="px-6 py-8 mt-auto space-y-2 text-xs text-center text-blue-400 border-t border-blue-500/20 bg-slate-900/40">
        <p>&copy; 2026 MediBook. ყველა უფლება დაცულია.</p>
        <p>კონტაქტი: support@medibook.ge | ტლფ: +995 (32) 200 00 00</p>
      </footer>

    </div>
  );
}  