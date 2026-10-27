import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, FileText, Search, TriangleAlert, Star, Stethoscope } from 'lucide-react';
import Navbar from '../../components/Navbar';
import DoctorCard from '../../components/DoctorCard';
import RatingModal from '../../components/RatingModal';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { useDoctorSearch } from '../../hooks/useDoctorSearch';
import { useAuth } from '../../context/AuthContext';

const STATUS_LABELS = {
  pending: 'მოლოდინში',
  confirmed: 'დადასტურებული',
  cancelled: 'გაუქმებული',
  completed: 'დასრულებული',
};

export default function PatientDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myAppointments, setMyAppointments] = useState([]);
  const [actionError, setActionError] = useState('');

  // რეფენსები შეფასების მოდალისთვის
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedDoctorForRating, setSelectedDoctorForRating] = useState(null);

  const { searchInput, onSearchChange, searching, specialty, setSpecialty, specialties, filtered } =
    useDoctorSearch(doctors);

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

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleCancel = async (id) => {
    if (!window.confirm('ნამდვილად გსურთ ვიზიტის გაუქმება?')) return;
    setActionError('');
    try {
      await appointmentService.cancel(id);
      setMyAppointments((list) => list.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)));
    } catch (err) {
      setActionError(err.message);
    }
  };

  const openRating = (doctor) => {
    if (!doctor) return;
    setSelectedDoctorForRating(doctor);
    setRatingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-rose-50/20 to-stone-100 text-stone-800">
      <Navbar />
      <main className="px-4 py-8 mx-auto space-y-10 max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-stone-900">გამარჯობა, {profile?.full_name}</h1>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition"
          >
            გასვლა
          </button>
        </div>

        {isFallback && (
          <div
            role="status"
            className="flex items-center gap-2 p-3 text-sm font-semibold border text-amber-800 bg-amber-50 border-amber-200 rounded-xl"
          >
            <TriangleAlert size={16} className="shrink-0" aria-hidden="true" />
            ნაჩვენებია ლოკალური დემო მონაცემები. კლინიკასთან დასაკავშირებლად დარეკეთ: +995 32 000 00 00
          </div>
        )}

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900">იპოვე ექიმი</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute -translate-y-1/2 left-4 top-1/2 text-stone-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchInput}
                onChange={onSearchChange}
                placeholder="მოძებნე სახელით..."
                aria-label="ექიმის ძებნა"
                className="w-full py-3 pr-4 text-sm bg-white border pl-11 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800 text-stone-900"
              />
              {searching && (
                <span className="absolute text-xs -translate-y-1/2 text-rose-800 right-4 top-1/2 animate-pulse">
                  იძებნება...
                </span>
              )}
            </div>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              aria-label="სპეციალობა"
              className="px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800 text-stone-900"
            >
              <option value="">ყველა სპეციალობა</option>
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="text-sm text-rose-900">იტვირთება...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-stone-500">ექიმი ვერ მოიძებნა.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900">ჩემი ვიზიტები</h2>

          {actionError && (
            <div role="alert" className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl">
              {actionError}
            </div>
          )}

          {myAppointments.length === 0 ? (
            <p className="text-sm text-stone-500">ვიზიტები ჯერ არ გაქვთ.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myAppointments.map((a) => (
                <article
                  key={a.id}
                  className="p-5 space-y-3 border shadow-sm bg-white/90 backdrop-blur-md rounded-2xl border-stone-200"
                >
                  <div>
                    <p className="font-bold text-stone-900">{a.doctors?.name || a.doctorName}</p>
                    <p className="text-sm font-medium text-rose-900">{a.doctors?.specialty || a.specialty}</p>
                  </div>

                  <p className="flex items-center gap-3 text-xs text-stone-600">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} aria-hidden="true" /> {a.appointment_date || a.rawDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} aria-hidden="true" /> {a.appointment_time?.slice(0, 5) || a.time}
                    </span>
                  </p>

                  {/* დიაგნოზი */}
                  {a.diagnosis && (
                    <div className="flex gap-2 p-2.5 text-xs border rounded-xl bg-rose-50/60 border-rose-200 text-stone-800">
                      <Stethoscope size={14} className="mt-0.5 shrink-0 text-rose-800" aria-hidden="true" />
                      <span>
                        <strong>დიაგნოზი:</strong> {a.diagnosis}
                      </span>
                    </div>
                  )}

                  {/* ნოტები / დანიშნულება */}
                  {a.notes && (
                    <div className="flex gap-2 p-2.5 text-xs border rounded-xl bg-stone-50 border-stone-200 text-stone-700">
                      <FileText size={14} className="mt-0.5 shrink-0 text-stone-500" aria-hidden="true" />
                      <span>
                        <strong>დანიშნულება:</strong> {a.notes}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700">
                      {a.status === 'confirmed' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      )}
                      {STATUS_LABELS[a.status] || a.status}
                    </span>

                    <div className="flex items-center gap-2">
                      {a.status === 'completed' && (
                        <button
                          onClick={() => openRating({ id: a.doctor_id, full_name: a.doctors?.name || 'ექიმი' })}
                          className="flex items-center gap-1 px-3 py-1 text-xs font-semibold transition border rounded-xl text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100"
                        >
                          <Star size={12} fill="currentColor" /> შეფასება
                        </button>
                      )}

                      {(a.status === 'pending' || a.status === 'confirmed') && (
                        <button
                          onClick={() => handleCancel(a.id)}
                          className="px-3 py-1 text-xs font-semibold transition border rounded-xl text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100"
                        >
                          გაუქმება
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* რეიტინგის მოდალი */}
      <RatingModal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        doctorId={selectedDoctorForRating?.id}
        doctorName={selectedDoctorForRating?.full_name}
        onRated={() => alert('მადლობა! შეფასება წარმატებით შენახა.')}
      />
    </div>
  );
}