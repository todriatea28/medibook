import React from 'react';

export default function Schedule() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-slate-950">
      
      {/* ნავიგაცია (<header> და <nav>) */}
      <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
          <h1 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text">
            MediBook
          </h1>
          <nav aria-label="მთავარი ნავიგაცია">
            <ul className="flex space-x-6 text-sm font-medium text-blue-200">
              <li><a href="/" className="transition hover:text-sky-400">მთავარი</a></li>
              <li><a href="/schedule" className="font-semibold text-white transition text-sky-400">განრიგი</a></li>
              <li><a href="/login" className="transition hover:text-sky-400">შესვლა</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ძირითადი შიგთავსი (<main>) */}
      <main className="flex-1 w-full px-4 py-8 mx-auto space-y-8 max-w-7xl">
        
        <section className="py-6 text-center border bg-gradient-to-b from-blue-950/40 to-transparent rounded-2xl border-blue-500/10">
          <h2 className="text-2xl font-bold text-white">ვიზიტების განრიგი და თავისუფალი სლოტები</h2>
          <p className="max-w-xl mx-auto mt-2 text-sm text-blue-300">
            აირჩიეთ სასურველი თარიღი და დრო ექიმთან კონსულტაციის დასაჯავშნად.
          </p>
        </section>

        {/* თარიღის ფილტრი და კალენდრის მიმოხილვა */}
        <section className="p-6 border shadow-xl bg-slate-900/60 rounded-2xl border-blue-500/20">
          <div className="flex flex-col items-center justify-between gap-4 mb-6 sm:flex-row">
            <h3 className="text-lg font-bold text-blue-100">მიმდინარე კვირა: 8 ივნისი - 14 ივნისი, 2026</h3>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm text-blue-200 transition border bg-slate-800 border-blue-500/30 rounded-xl hover:bg-slate-700">წინა კვირა</button>
              <button className="px-4 py-2 text-sm font-semibold text-white transition shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500">შემდეგი კვირა</button>
            </div>
          </div>

          {/* სლოტების ბადე */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            
            <article className="p-4 border bg-slate-900 rounded-xl border-blue-500/20">
              <h4 className="mb-3 text-sm font-bold text-sky-400"><time dateTime="2026-06-08">ორშაბათი, 8 ივნისი</time></h4>
              <div className="space-y-2">
                <button className="w-full text-left p-2.5 bg-slate-800/60 hover:bg-sky-500/20 border border-blue-500/20 rounded-lg text-xs text-blue-200 transition flex justify-between items-center">
                  <span>10:00 - დრ. ნინო ბერიძე</span>
                  <span className="text-emerald-400">თავისუფალი</span>
                </button>
                <button className="w-full text-left p-2.5 bg-slate-800/30 opacity-50 border border-blue-500/10 rounded-lg text-xs text-blue-400 cursor-not-allowed flex justify-between items-center">
                  <span>12:30 - დრ. დავით ლომიძე</span>
                  <span className="text-rose-400">დაკავებული</span>
                </button>
              </div>
            </article>

            <article className="p-4 border bg-slate-900 rounded-xl border-blue-500/20">
              <h4 className="mb-3 text-sm font-bold text-sky-400"><time dateTime="2026-06-09">სამშაბათი, 9 ივნისი</time></h4>
              <div className="space-y-2">
                <button className="w-full text-left p-2.5 bg-slate-800/60 hover:bg-sky-500/20 border border-blue-500/20 rounded-lg text-xs text-blue-200 transition flex justify-between items-center">
                  <span>14:00 - დრ. ნინო ბერიძე</span>
                  <span className="text-emerald-400">თავისუფალი</span>
                </button>
              </div>
            </article>

            <article className="p-4 border bg-slate-900 rounded-xl border-blue-500/20">
              <h4 className="mb-3 text-sm font-bold text-sky-400"><time dateTime="2026-06-10">ოთხშაბათი, 10 ივნისი</time></h4>
              <div className="space-y-2">
                <button className="w-full text-left p-2.5 bg-slate-800/60 hover:bg-sky-500/20 border border-blue-500/20 rounded-lg text-xs text-blue-200 transition flex justify-between items-center">
                  <span>11:00 - დრ. მაია ქავთარაძე</span>
                  <span className="text-emerald-400">თავისუფალი</span>
                </button>
              </div>
            </article>

            <article className="p-4 border bg-slate-900 rounded-xl border-blue-500/20">
              <h4 className="mb-3 text-sm font-bold text-sky-400"><time dateTime="2026-06-11">ხუთშაბათი, 11 ივნისი</time></h4>
              <div className="space-y-2">
                <button className="w-full text-left p-2.5 bg-slate-800/30 opacity-50 border border-blue-500/10 rounded-lg text-xs text-blue-400 cursor-not-allowed flex justify-between items-center">
                  <span>09:30 - დრ. ნინო ბერიძე</span>
                  <span className="text-rose-400">დაკავებული</span>
                </button>
              </div>
            </article>

            <article className="p-4 border bg-slate-900 rounded-xl border-blue-500/20">
              <h4 className="mb-3 text-sm font-bold text-sky-400"><time dateTime="2026-06-12">პარასკევი, 12 ივნისი</time></h4>
              <div className="space-y-2">
                <button className="w-full text-left p-2.5 bg-slate-800/60 hover:bg-sky-500/20 border border-blue-500/20 rounded-lg text-xs text-blue-200 transition flex justify-between items-center">
                  <span>16:00 - დრ. დავით ლომიძე</span>
                  <span className="text-emerald-400">თავისუფალი</span>
                </button>
              </div>
            </article>

          </div>
        </section>

      </main>

      {/* ფუტერი (<footer>) */}
      <footer className="py-6 mt-auto text-xs text-center text-blue-400 border-t border-blue-500/20 bg-slate-900/40">
        <p>&copy; 2026 MediBook. ყველა უფლება დაცულია.</p>
      </footer>

    </div>
  );
}