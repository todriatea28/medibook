import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../../hooks/useAppointments';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card/Card';

const STATUS_LABELS = { pending: 'მოლოდინში', confirmed: 'დადასტურებული', cancelled: 'გაუქმებული' };

export default function DoctorDashboard() {
  const { appointments, loading } = useAppointments();
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <h1 className="text-xl font-bold text-teal-600">MediBook · ექიმის სივრცე</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">
            ექიმი: <strong className="text-slate-900">{profile?.full_name}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition"
          >
            გასვლა
          </button>
        </div>
      </header>

      <main className="p-6 mx-auto space-y-6 max-w-7xl md:p-8">
        <h2 className="text-lg font-bold text-slate-900">ჩემი ვიზიტები</h2>

        {loading ? (
          <p className="text-sm text-teal-600">მონაცემები იტვირთება...</p>
        ) : appointments.length === 0 ? (
          <p className="text-sm text-slate-500">ვიზიტები ჯერ არ არის.</p>
        ) : (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {appointments.map((item) => (
              <Card key={item.id}>
                <p className="text-xs text-slate-500">პაციენტი</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{item.patientName}</p>
                <p className="mt-2 text-xs text-teal-600">დრო: {item.date}</p>
                <span className="inline-flex items-center gap-2 px-2.5 py-1 mt-3 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-full">
                  {item.status === 'confirmed' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-indicator"></span>
                  )}
                  {STATUS_LABELS[item.status] ?? item.status}
                </span>
              </Card>
            ))}
          </section>
        )}
      </main>

      <footer className="px-6 py-4 text-xs text-center border-t text-slate-500 border-slate-200">
        &copy; 2026 MediBook
      </footer>
    </div>
  );
}