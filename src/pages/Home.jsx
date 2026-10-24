import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // 👈 დააიმპორტე Navbar

export default function Home() {
  const specialties = [
    { 
      title: "კარდიოლოგია", 
      desc: "გულ-სისხლძარღვთა სისტემის სრული დიაგნოსტიკა და მკურნალობა.",
      img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80"
    },
    { 
      title: "ნევროლოგია", 
      desc: "ნერვული სისტემის და თავის ტკივილების თანამედროვე თერაპია.",
      img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80"
    },
    { 
      title: "პედიატრია", 
      desc: "პატარების ჯანმრთელობაზე ზრუნვა დაბადებიდანვე.",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
    },
    { 
      title: "თერაპია", 
      desc: "ზოგადი ჯანმრთელობის მონიტორინგი და პრევენცია.",
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="min-h-screen pb-16 bg-slate-50 text-slate-800">
      {/* საერთო ნავიგაცია ჰამბურგერ მენიუთი */}
      <Navbar />

      <main className="px-4 pt-8 mx-auto space-y-10 max-w-7xl sm:px-6">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-between gap-8 p-8 overflow-hidden bg-white border shadow-xl rounded-3xl border-slate-200 md:flex-row md:p-12">
          <div className="z-10 max-w-xl space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200/60 shadow-sm">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              ინოვაციური სამედიცინო პლატფორმა
            </span>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-slate-900">
              იპოვე შენი ექიმი და <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">დაჯავშნე ვიზიტი</span>
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              თანამედროვე სამედიცინო პლატფორმა, რომელიც ამარტივებს კლინიკასთან კომუნიკაციას, ექიმის არჩევასა და ვიზიტების სწრაფ მართვას.
            </p>
            
            {/* ღილაკები */}
            <div className="flex flex-col items-center gap-4 pt-3 sm:flex-row">
              <Link 
                to="/schedule" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl text-sm shadow-md shadow-teal-500/25 transition-all duration-200"
              >
                <span>ვიზიტის დაჯავშნა</span>
              </Link>
              
              <Link 
                to="/login" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm border border-slate-300 transition-all duration-200"
              >
                <span>პანელში შესვლა</span>
              </Link>
            </div>
          </div>

          {/* Banner Image */}
          <div className="w-full h-64 overflow-hidden border shadow-lg md:w-1/2 md:h-80 rounded-2xl border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80" 
              alt="Medical Team" 
              className="object-cover object-center w-full h-full"
            />
          </div>
        </section>

        {/* Specialties Grid */}
        <section className="pt-4 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">პოპულარული სპეციალობები</h2>
            <p className="text-sm text-slate-500">აირჩიეთ სასურველი მიმართულება</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col overflow-hidden transition-all duration-300 bg-white border shadow-sm rounded-2xl border-slate-200 hover:shadow-xl group hover:-translate-y-1"
              >
                <div className="relative overflow-hidden h-44">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 p-5">
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}