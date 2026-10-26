import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../../hooks/useAppointments';
import { useAuth } from '../../context/AuthContext';
import { appointmentService } from '../../services/appointmentService';
import { supabase } from '../../supabaseClient';
import Modal from '../../components/Modal/Modal';
import ScheduleEditor from '../../components/ScheduleEditor';
import AppointmentCard from '../../components/AppointmentCard';

const FILTERS = [
  { key: 'today', label: 'დღეს' },
  { key: 'upcoming', label: 'მომავალი' },
  { key: 'all', label: 'ყველა' },
];

const todayStr = () => new Date().toISOString().slice(0, 10);

const btn =
  'px-3 py-1.5 text-xs font-semibold rounded-lg border transition disabled:opacity-60 disabled:cursor-not-allowed';

export default function DoctorDashboard() {
  const { appointments, loading, error, updateLocal } = useAppointments();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [doctorId, setDoctorId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [actionError, setActionError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('doctors')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => setDoctorId(data?.id ?? null));
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const visible = useMemo(() => {
    const t = todayStr();
    return appointments.filter((a) => {
      if (filter === 'today') return a.rawDate === t;
      if (filter === 'upcoming') return a.rawDate > t;
      return true;
    });
  }, [appointments, filter]);

  const counts = useMemo(() => {
    const t = todayStr();
    return {
      today: appointments.filter((a) => a.rawDate === t && a.status !== 'cancelled').length,
      pending: appointments.filter((a) => a.status === 'pending').length,
      completed: appointments.filter((a) => a.status === 'completed').length,
    };
  }, [appointments]);

  const changeStatus = useCallback(
    async (id, status) => {
      if (status === 'cancelled' && !window.confirm('ნამდვილად გსურთ ვიზიტის გაუქმება?')) return;
      setBusyId(id);
      setActionError('');
      try {
        await appointmentService.setStatus(id, status);
        updateLocal(id, { status });
      } catch (err) {
        setActionError(err.message);
      } finally {
        setBusyId(null);
      }
    },
    [updateLocal]
  );

  const openNotes = useCallback((appt) => {
    setEditing(appt);
    setNoteText(appt.notes);
  }, []);

  const saveNote = async () => {
    setSavingNote(true);
    setActionError('');
    try {
      await appointmentService.saveNotes(editing.id, noteText.trim());
      updateLocal(editing.id, { notes: noteText.trim() });
      setEditing(null);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSavingNote(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-4 bg-white border-b sm:px-6 border-slate-200">
        <h1 className="text-lg font-bold text-teal-600 sm:text-xl">MediBook · ექიმის სივრცე</h1>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm sm:inline text-slate-500">
            ექიმი: <strong className="text-slate-900">{profile?.full_name}</strong>
          </span>
          <button
            onClick={handleLogout}
            className={`${btn} text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100`}
          >
            გასვლა
          </button>
        </div>
      </header>

      <main className="p-4 mx-auto space-y-6 sm:p-6 max-w-7xl md:p-8">
        <section className="grid grid-cols-3 gap-3 sm:gap-4" aria-label="სტატისტიკა">
          <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
            <p className="text-xs text-slate-500">დღევანდელი</p>
            <p className="text-2xl font-bold text-slate-900">{counts.today}</p>
          </div>
          <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
            <p className="text-xs text-slate-500">დასადასტურებელი</p>
            <p className="text-2xl font-bold text-amber-600">{counts.pending}</p>
          </div>
          <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
            <p className="text-xs text-slate-500">დასრულებული</p>
            <p className="text-2xl font-bold text-teal-600">{counts.completed}</p>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">ჩემი ვიზიტები</h2>
          <div className="flex gap-2" role="tablist" aria-label="ფილტრი">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`${btn} ${
                  filter === f.key
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-teal-500'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {(error || actionError) && (
          <div role="alert" className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl">
            {actionError || error.message}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-teal-600">მონაცემები იტვირთება...</p>
        ) : visible.length === 0 ? (
          <p className="text-sm text-slate-500">ამ ფილტრით ვიზიტები არ არის.</p>
        ) : (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <AppointmentCard
                key={item.id}
                item={item}
                busy={busyId === item.id}
                onStatus={changeStatus}
                onNotes={openNotes}
              />
            ))}
          </section>
        )}

        {doctorId && <ScheduleEditor doctorId={doctorId} />}
      </main>

      <footer className="px-6 py-4 text-xs text-center border-t text-slate-500 border-slate-200">
        &copy; 2026 MediBook
      </footer>

      <Modal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `დანიშნულება: ${editing.patientName}` : ''}
      >
        <label htmlFor="notes" className="block mb-1 text-xs font-semibold text-slate-700">
          ჩანაწერი / რეკომენდაცია
        </label>
        <textarea
          id="notes"
          rows={5}
          maxLength={1000}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="w-full px-4 py-3 text-sm border bg-slate-50 border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="მაგ: გაიმეორეთ ანალიზი 2 კვირაში..."
        />
        <p className="mt-1 text-xs text-right text-slate-400">{noteText.length}/1000</p>
        <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="px-4 py-2 text-sm font-semibold transition bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
          >
            გაუქმება
          </button>
          <button
            type="button"
            onClick={saveNote}
            disabled={savingNote}
            className="px-4 py-2 text-sm font-semibold text-white transition bg-teal-600 shadow-md rounded-xl hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {savingNote ? 'ინახება...' : 'შენახვა'}
          </button>
        </div>
      </Modal>
    </div>
  );
}