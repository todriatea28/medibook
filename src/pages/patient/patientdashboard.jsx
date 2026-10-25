import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DoctorCard from '../../components/DoctorCard';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { debounce } from '../../utils/debounce';
import { useAuth } from '../../context/AuthContext';

const STATUS_LABELS = { pending: 'მოლოდინში', confirmed: 'დადასტურებული', cancelled: 'გაუქმებული' };

export default function PatientDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [specialty, setSpecialty] = useState('');
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, isFallback } = await doctorService.getDoctors();
      setDoctors(data);
      setIsFallback(isFallback);
      setLoading(false);
      try {
        setMyAppointments(await appointmentService.getMyAppointments());
      } catch (err) {
        console.warn('ჩემი ვიზიტები ვერ ჩაიტვირთა:', err.message);
      }
    })();
  }, []);

  // debounce 300ms: ფილტრი მხოლოდ აკრეფის დასრულების მერე ირთვება
  const applyQuery = useMemo(
    () =>
      debounce((value) => {
        setQuery(value);
        setSearching(false);
      }, 300),
    []
  );

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setSearching(true);
    applyQuery(e.target.value);
  };

  const specialties = useMemo(() => [...new Set(doctors.map((d) => d.specialty))], [doctors]);

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) &&
      (!specialty || d.specialty === specialty)
  );

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleCancel = async (id) => {
    if (!window.confirm('ნამდვილად გსურთ ვიზიტის გაუქმება?')) return;
    await appointmentService.cancel(id);
    setMyAppointments((list) => list.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="px-4 py-8 mx-auto space-y-10 max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">გამარჯობა, {profile?.full_name}</h1>
          <button onClick={handleLogout} className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition">
            გასვლა
          </button>
        </div>

        {isFallback && (
          <div role="status" className="p-3 text-sm font-semibold border text-amber-700 bg-amber-50 border-amber-200 rounded-xl">
            ⚠️ ნაჩვენებია ლოკალური დემო მონაცემები. კლინიკასთან დასაკავშირებლად დარეკეთ: +995 32 000 00 00
          </div>
        )}

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">იპოვე ექიმი</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="search"
                value={searchInput}
                onChange={handleSearch}
                placeholder="მოძებნე სახელით..."
                aria-label="ექიმის ძებნა"
                className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {searching && (
                <span className="absolute text-xs text-teal-600 -translate-y-1/2 right-4 top-1/2 animate-pulse">
                  იძებნება...
                </span>
              )}
            </div>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              aria-label="სპეციალობა"
              className="px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">ყველა სპეციალობა</option>
              {specialties.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="text-sm text-teal-600">იტვირთება...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-slate-500">ექიმი ვერ მოიძებნა.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">ჩემი ვიზიტები</h2>
          {myAppointments.length === 0 ? (
            <p className="text-sm text-slate-500">ვიზიტები ჯერ არ გაქვთ.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myAppointments.map((a) => (
                <div key={a.id} className="p-5 space-y-2 bg-white border shadow-sm rounded-2xl border-slate-200">
                  <p className="font-bold text-slate-900">{a.doctors?.name}</p>
                  <p className="text-sm text-teal-600">{a.doctors?.specialty}</p>
                  <p className="text-sm text-slate-600">📅 {a.appointment_date} · 🕒 {a.appointment_time.slice(0, 5)}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
                      {a.status === 'confirmed' && <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-indicator"></span>}
                      {STATUS_LABELS[a.status]}
                    </span>
                    {a.status !== 'cancelled' && (
                      <button onClick={() => handleCancel(a.id)} className="px-3 py-1 text-xs border rounded-lg text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100">
                        გაუქმება
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}