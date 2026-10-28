import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <p className="text-6xl font-black text-teal-600">404</p>
        <h1 className="text-xl font-bold text-slate-900">გვერდი ვერ მოიძებნა</h1>
        <Link to="/" className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-500">
          მთავარ გვერდზე დაბრუნება
        </Link>
      </main>
    </div>
  );
}