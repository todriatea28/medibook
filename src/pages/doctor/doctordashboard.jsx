import React from 'react';

export default function DoctorDashboard() {
  return (
    <div className="flex min-h-screen text-white bg-slate-950">
      
      {/* გვერდითი მენიუ (Sidebar) */}
      <aside className="hidden w-64 p-6 border-r bg-slate-900/80 border-blue-500/25 md:block backdrop-blur-md">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text">
            MediBook Doctor
          </h2>
          <p className="mt-1 text-xs text-blue-300">ექიმის პანელი</p>
        </div>

        <nav aria-label="ექიმის მენიუ">
          <ul className="space-y-3 text-sm font-medium text-blue-200">
            <li>
              <a href="#appointments" className="block px-4 py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-white transition">
                ჩემი ვიზიტები
              </a>
            </li>
            <li>
              <a href="#schedule" className="block px-4 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-sky-400 transition">
                განრიგი / საათები
              </a>
            </li>
            <li>
              <a href="#patients" className="block px-4 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-sky-400 transition">
                პაციენტების ბაზა
              </a>
            </li>
            <li>
              <a href="#settings" className="block px-4 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-sky-400 transition">
                პარამეტრები
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ძირითადი კონტენტი */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* ზედა ნავიგაცია (<header>) */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b border-blue-500/20 bg-slate-900/50 backdrop-blur-md">
          <h1 className="text-xl font-semibold text-white">ექიმის სამუშაო სივრცე</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-300">ექიმი: <strong className="text-white">დრ. ნინო ბერიძე</strong></span>
            <a href="/login" className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg hover:bg-rose-500/20 transition">
              გასვლა
            </a>
          </div>
        </header>

        {/* მთავარი შიგთავსი (<main>) */}
        <main className="p-6 space-y-8 overflow-y-auto md:p-8">
          
          {/* სტატისტიკის ბლოკები (<section>) */}
          <section id="appointments">
            <h2 className="mb-4 text-lg font-bold text-blue-100">დღევანდელი მიმოხილვა</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              
              <article className="p-6 border shadow-lg bg-slate-900 rounded-2xl border-blue-500/20">
                <h3 className="text-sm font-medium text-blue-300">დღიური ვიზიტები</h3>
                <p className="mt-2 text-3xl font-extrabold text-white">8</p>
                <p className="mt-1 text-xs text-sky-400">უახლოესი: 14:00</p>
              </article>

              <article className="p-6 border shadow-lg bg-slate-900 rounded-2xl border-blue-500/20">
                <h3 className="text-sm font-medium text-blue-300">მოლოდინში მყოფი</h3>
                <p className="mt-2 text-3xl font-extrabold text-white">3</p>
                <p className="mt-1 text-xs text-sky-400">დასადასტურებელი</p>
              </article>

              <article className="p-6 border shadow-lg bg-slate-900 rounded-2xl border-blue-500/20">
                <h3 className="text-sm font-medium text-blue-300">დასრულებული</h3>
                <p className="mt-2 text-3xl font-extrabold text-white">24</p>
                <p className="mt-1 text-xs text-sky-400">ამ კვირაში</p>
              </article>

            </div>
          </section>

          {/* პაციენტების ვიზიტების ცხრილი */}
          <section id="schedule" className="p-6 border bg-slate-900/60 rounded-2xl border-blue-500/20">
            <h2 className="mb-4 text-lg font-bold text-blue-100">პაციენტების ვიზიტების განრიგი</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-blue-200">
                <thead className="text-xs text-blue-400 uppercase border-b border-blue-500/25 bg-slate-950/40">
                  <tr>
                    <th scope="col" className="px-4 py-3">პაციენტი</th>
                    <th scope="col" className="px-4 py-3">მიზანი / დიაგნოზი</th>
                    <th scope="col" className="px-4 py-3">დრო</th>
                    <th scope="col" className="px-4 py-3">სტატუსი</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/10">
                  <tr className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium text-white">გიორგი მაისურაძე</td>
                    <td className="px-4 py-3">კონსულტაცია / ეგკ</td>
                    <td className="px-4 py-3"><time dateTime="2026-06-08T14:00">დღეს, 14:00</time></td>
                    <td className="px-4 py-3"><span className="text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full text-xs">მზადყოფნაში</span></td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium text-white">მარიამ ქავთარაძე</td>
                    <td className="px-4 py-3">განმეორებითი ვიზიტი</td>
                    <td className="px-4 py-3"><time dateTime="2026-06-08T15:30">დღეს, 15:30</time></td>
                    <td className="px-4 py-3"><span className="text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full text-xs">მოლოდინში</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </main>

        {/* ფუტერი (<footer>) */}
        <footer className="px-6 py-4 text-xs text-center text-blue-400 border-t border-blue-500/20 bg-slate-900/40">
          <p>&copy; 2026 MediBook Doctor Portal. ყველა უფლება დაცულია.</p>
        </footer>

      </div>

    </div>
  );
}