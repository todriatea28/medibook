import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen text-white bg-slate-950">
      
      {/* 1. <header> და <nav> - მთავარი ნავიგაციისთვის */}
      <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
          {/* ერთადერთი h1 გვერდზე */}
          <h1 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text">
            MediBook
          </h1>
          
          <nav aria-label="მთავარი ნავიგაცია">
            <ul className="flex space-x-6 text-sm font-medium text-blue-200">
              <li><a href="/" className="transition hover:text-sky-400">მთავარი</a></li>
              <li><a href="/doctors" className="transition hover:text-sky-400">ექიმები</a></li>
              <li><a href="/contact" className="transition hover:text-sky-400">კონტაქტი</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 2. <main> - გვერდის უნიკალური შინაარსის შესაფუთად */}
      <main className="px-4 py-8 mx-auto space-y-12 max-w-7xl">
        
        {/* თემატური ბლოკი - <section> */}
        <section className="py-12 text-center border bg-gradient-to-b from-blue-950/40 to-transparent rounded-2xl border-blue-500/10">
          <h2>იპოვე შენი ექიმი და დაჯავშნე ვიზიტი</h2>
          <p className="max-w-xl mx-auto mt-2 text-blue-300">
            თანამედროვე სამედიცინო პლატფორმა, რომელიც ამარტივებს კლინიკასთან კომუნიკაციას.
          </p>
        </section>

        {/* თემატური სექცია ექიმების სიისთვის */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-blue-100">პოპულარული სპეციალისტები</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            
            {/* ცალკეული ერთეული - <article> */}
            <article className="p-6 border shadow-lg bg-slate-900 rounded-2xl border-blue-500/20">
              {/* სურათი და აღწერა - <figure> და <figcaption> */}
              <figure className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" 
                  alt="ექიმი ნინო ბერიძე" 
                  className="object-cover w-full h-48 border rounded-xl border-blue-500/20"
                />
                <figcaption className="mt-3 text-sm font-semibold text-white">
                  დრ. ნინო ბერიძე — კარდიოლოგი
                </figcaption>
              </figure>
              {/* თარიღი - <time> */}
              <p className="text-xs text-blue-400">
                განახლებულია: <time dateTime="2026-06-06">6 ივნისი, 2026</time>
              </p>
            </article>

          </div>
        </section>

        {/* გვერდითი პანელი - <aside> */}
        <aside className="p-6 border bg-slate-900/60 rounded-2xl border-blue-500/20">
          <h3 className="mb-2 text-lg font-semibold text-blue-200">სასარგებლო რჩევა</h3>
          <p className="text-sm text-blue-300">
            ვიზიტამდე გთხოვთ იქონიოთ პირადობის მოწმობა და წინა ჩატარებული ანალიზების პასუხები.
          </p>
        </aside>

      </main>

      {/* 3. <footer> - კონტაქტებისა და საავტორო უფლებებისთვის */}
      <footer className="py-8 mt-16 text-sm text-center text-blue-400 border-t border-blue-500/20 bg-slate-900/40">
        <p>&copy; 2026 MediBook. ყველა უფლება დაცულია.</p>
        <p className="mt-1">კონტაქტი: support@medibook.ge | ტელ: +995 (32) 200 00 00</p>
      </footer>

    </div>
  );
}