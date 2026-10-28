import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../hooks/useAppointments";
import { useAuth } from "../../context/AuthContext";
import { appointmentService } from "../../services/appointmentService";
import { supabase } from "../../supabaseClient";
import Modal from "../../components/Modal/Modal";
import ScheduleEditor from "../../components/ScheduleEditor";
import AppointmentCard from "../../components/AppointmentCard";

const FILTERS = [
  { key: "today", label: "დღეს" },
  { key: "upcoming", label: "მომავალი" },
  { key: "all", label: "ყველა" },
];

const todayStr = () => new Date().toISOString().slice(0, 10);

const btn =
  "px-3 py-1.5 text-xs font-semibold rounded-lg border transition disabled:opacity-60 disabled:cursor-not-allowed";

export default function DoctorDashboard() {
  const { appointments, loading, error, updateLocal } = useAppointments();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [doctorId, setDoctorId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [diagnosisText, setDiagnosisText] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("doctors")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setDoctorId(data?.id ?? null));
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const visible = useMemo(() => {
    const t = todayStr();
    return appointments.filter((a) => {
      if (filter === "today") return a.rawDate === t;
      if (filter === "upcoming") return a.rawDate > t;
      return true;
    });
  }, [appointments, filter]);

  const counts = useMemo(() => {
    const t = todayStr();
    return {
      today: appointments.filter(
        (a) => a.rawDate === t && a.status !== "cancelled",
      ).length,
      pending: appointments.filter((a) => a.status === "pending").length,
      completed: appointments.filter((a) => a.status === "completed").length,
    };
  }, [appointments]);

  const changeStatus = useCallback(
    async (id, status) => {
      if (
        status === "cancelled" &&
        !window.confirm("ნამდვილად გსურთ ვიზიტის გაუქმება?")
      )
        return;
      setBusyId(id);
      setActionError("");
      try {
        await appointmentService.setStatus(id, status);
        updateLocal(id, { status });
      } catch (err) {
        setActionError(err.message);
      } finally {
        setBusyId(null);
      }
    },
    [updateLocal],
  );

  const openNotes = useCallback((appt) => {
    setEditing(appt);
    setNoteText(appt.notes || "");
    setDiagnosisText(appt.diagnosis || "");
  }, []);

  const saveNote = async () => {
    setSavingNote(true);
    setActionError("");
    try {
      // ვინახავთ როგორც ნოტებს/დანიშნულებას, ისე დიაგნოზს
      await appointmentService.saveNotes(editing.id, noteText.trim());
      
      const { error: diagError } = await supabase
        .from("appointments")
        .update({ diagnosis: diagnosisText.trim() })
        .eq("id", editing.id);

      if (diagError) throw diagError;

      updateLocal(editing.id, { 
        notes: noteText.trim(), 
        diagnosis: diagnosisText.trim() 
      });
      setEditing(null);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSavingNote(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-rose-50/20 to-stone-100 text-stone-800">
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-4 border-b bg-white/80 backdrop-blur-xl sm:px-6 border-stone-200">
        <h1 className="text-lg font-bold text-transparent bg-gradient-to-r from-rose-900 to-rose-700 bg-clip-text sm:text-xl">
          medihub · ექიმის სივრცე
        </h1>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm sm:inline text-stone-500">
            ექიმი:{" "}
            <strong className="text-stone-900">{profile?.full_name}</strong>
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
        <section
          className="grid grid-cols-3 gap-3 sm:gap-4"
          aria-label="სტატისტიკა"
        >
          <div className="p-4 bg-white border shadow-sm rounded-2xl border-stone-200">
            <p className="text-xs text-stone-500">დღევანდელი</p>
            <p className="text-2xl font-bold text-stone-900">{counts.today}</p>
          </div>
          <div className="p-4 bg-white border shadow-sm rounded-2xl border-stone-200">
            <p className="text-xs text-stone-500">დასადასტურებელი</p>
            <p className="text-2xl font-bold text-amber-600">
              {counts.pending}
            </p>
          </div>
          <div className="p-4 bg-white border shadow-sm rounded-2xl border-stone-200">
            <p className="text-xs text-stone-500">დასრულებული</p>
            <p className="text-2xl font-bold text-rose-900">
              {counts.completed}
            </p>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-stone-900">ჩემი ვიზიტები</h2>
          <div className="flex gap-2" role="tablist" aria-label="ფილტრი">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`${btn} ${
                  filter === f.key
                    ? "bg-rose-900 text-white border-rose-900 shadow-md shadow-rose-900/20"
                    : "bg-white text-stone-600 border-stone-300 hover:border-rose-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {(error || actionError) && (
          <div
            role="alert"
            className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl"
          >
            {actionError || error.message}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-rose-900">მონაცემები იტვირთება...</p>
        ) : visible.length === 0 ? (
          <p className="text-sm text-stone-500">ამ ფილტრით ვიზიტები არ არის.</p>
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

      <footer className="px-6 py-4 text-xs text-center border-t text-stone-500 border-stone-200">
        &copy; 2026 medihub
      </footer>

      <Modal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `ვიზიტი და დიაგნოზი: ${editing.patientName}` : ""}
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="diagnosis"
              className="block mb-1 text-xs font-semibold text-stone-700"
            >
              დიაგნოზი
            </label>
            <input
              id="diagnosis"
              type="text"
              value={diagnosisText}
              onChange={(e) => setDiagnosisText(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border bg-stone-50 border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
              placeholder="მაგ: მწვავე ბრონქიტი..."
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block mb-1 text-xs font-semibold text-stone-700"
            >
              დანიშნულება / რეკომენდაცია
            </label>
            <textarea
              id="notes"
              rows={4}
              maxLength={1000}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full px-4 py-3 text-sm border bg-stone-50 border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
              placeholder="მაგ: გაიმეორეთ ანალიზი 2 კვირაში..."
            />
            <p className="mt-1 text-xs text-right text-stone-400">
              {noteText.length}/1000
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-stone-200">
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="px-4 py-2 text-sm font-semibold transition bg-stone-100 text-stone-700 rounded-xl hover:bg-stone-200"
          >
            გაუქმება
          </button>
          <button
            type="button"
            onClick={saveNote}
            disabled={savingNote}
            className="px-4 py-2 text-sm font-semibold text-white transition shadow-md bg-rose-900 shadow-rose-900/20 rounded-xl hover:bg-rose-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {savingNote ? "ინახება..." : "შენახვა"}
          </button>
        </div>
      </Modal>
    </div>
  );
}