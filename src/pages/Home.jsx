import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const specialties = [
  {
    title: "კარდიოლოგია",
    desc: "გულ-სისხლძარღვთა სისტემის სრული დიაგნოსტიკა და მკურნალობა.",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "ნევროლოგია",
    desc: "ნერვული სისტემის და თავის ტკივილების თანამედროვე თერაპია.",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "რეანიმაცია",
    desc: "კრიტიკული სიტუაციების მართვა და ინტენსიური თერაპია",
    img: "https://assets.clevelandclinic.org/transform/c3acfb7d-5498-465b-b8a6-728403a9390d/CCC_4891058_05-29-24_025_SCG",
  },
  {
    title: "ბავშვთა ქირურგია",
    desc: "პატარებზე და მათ ჯანმრთელობაზე ზრუნვა უმაღლესი სტანდარტით",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJzkMQ94kEmr6yUTJnMQlhnj1gH5DMrA2ynjig8V1flXrHiMfjLJQg-dQ9&s=10",
  },
  {
    title: "ლაბორატორიული კვლევები",
    desc: "ზუსტი სამედიცინო ანალიზები და სწრაფი პასუხები ადგილზე",
    img: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-stone-50 via-rose-50/30 to-stone-100 text-stone-800 selection:bg-rose-800 selection:text-white">
      <Navbar />

      <main className="flex-1 px-4 py-10 mx-auto space-y-16 max-w-7xl sm:px-6">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-between gap-10 p-8 overflow-hidden border shadow-2xl rounded-3xl bg-white/90 border-stone-200/80 backdrop-blur-xl sm:p-12 md:p-16 md:flex-row">
          {/* ფონის დეკორატიული ბორდოსფერი განათებები */}
          <div className="absolute rounded-full pointer-events-none -top-24 -right-24 w-80 h-80 bg-rose-900/10 blur-3xl"></div>
          <div className="absolute rounded-full pointer-events-none -bottom-24 -left-24 w-80 h-80 bg-pink-800/10 blur-3xl"></div>

          <div className="z-10 max-w-xl space-y-6">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-rose-900/10 text-rose-900 border border-rose-200 shadow-sm backdrop-blur-md">
              <span className="w-2.5 h-2.5 bg-rose-800 rounded-full animate-pulse"></span>
              პრემიუმ კლასის სამედიცინო პლატფორმა
            </span>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-[1.15]">
              იპოვე შენი ექიმი და <br />
              <span className="text-transparent bg-gradient-to-r from-rose-900 via-pink-800 to-rose-700 bg-clip-text">
                დაჯავშნე ვიზიტი მარტივად
              </span>
            </h1>

            <p className="text-base font-normal leading-relaxed text-stone-600">
              თანამედროვე ციფრული სივრცე, რომელიც სრულად აკავშირებს პაციენტებს წამყვან კლინიკებთან და პროფესიონალ სპეციალისტებთან.
            </p>

            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
              <Link
                to="/patient"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-900 to-rose-800 hover:from-rose-800 hover:to-rose-700 text-white font-bold rounded-2xl text-sm shadow-xl shadow-rose-900/25 transition-all transform hover:-translate-y-0.5"
              >
                ვიზიტის დაჯავშნა
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full px-8 py-4 text-sm font-semibold transition-all border shadow-sm sm:w-auto bg-white/90 hover:bg-stone-100 text-stone-700 rounded-2xl border-stone-200 backdrop-blur-md"
              >
                პანელში შესვლა
              </Link>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 group">
            <div className="absolute inset-0 transition duration-500 bg-gradient-to-tr from-rose-900/20 to-pink-800/20 rounded-3xl blur-xl group-hover:blur-2xl opacity-70"></div>
            <div className="relative overflow-hidden bg-white border shadow-2xl h-72 sm:h-80 md:h-96 rounded-3xl border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
                alt="სამედიცინო გუნდი"
                className="object-cover object-center w-full h-full transition duration-700 transform group-hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="space-y-8">
          <div className="flex flex-col justify-between gap-4 pb-4 border-b sm:flex-row sm:items-end border-stone-200/80">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">
                პოპულარული მიმართულებები და სერვისები
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                აირჩიეთ სასურველი სფერო და მიიღეთ უმაღლესი დონის სამედიცინო მომსახურება
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {specialties.map((item) => (
              <Link
                key={item.title}
                to="/patient"
                className="group flex flex-col overflow-hidden bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative overflow-hidden h-44 bg-stone-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent group-hover:opacity-100"></div>
                </div>
                <div className="flex flex-col justify-between flex-1 p-5 space-y-2">
                  <h3 className="text-base font-bold transition-colors text-stone-900 group-hover:text-rose-900">
                    {item.title}
                  </h3>
                  <p className="text-xs font-normal leading-relaxed text-stone-600">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-1 pt-2 text-xs font-semibold transition-transform text-rose-900 group-hover:translate-x-1">
                    <span>დეტალურად</span> &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}