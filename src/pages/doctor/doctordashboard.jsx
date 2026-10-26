import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../hooks/useAppointments";
import { useAuth } from "../../context/AuthContext";
import { appointmentService } from "../../services/appointmentService";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";

const STATUS_LABELS = {
  pending: "მოლოდინში",
  confirmed: "დადასტურებული",
  cancelled: "გაუქმებული",
  completed: "დასრულებული",
};

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  completed: "bg-slate-100 text-slate-600 border-slate-200",
};

const FILTERS = [
  { key: "today", label: "დღეს" },
  { key: "upcoming", label: "მომავალი" },
  { key: "all", label: "ყველა" },
];

const todayStr = () => new Date().toISOString().slice(0, 10);

export default function DoctorDashboard() {
  const { appointments, loading, error, updateLocal } = useAppointments();
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);

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

  const changeStatus = async (id, status) => {
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
  };

  const openNotes = (appt) => {
    setEditing(appt);
    setNoteText(appt.notes);
  };

  const saveNote = async () => {
    setSavingNote(true);
    setActionError("");
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

  const btn =
    "px-3 py-1.5 text-xs font-semibold rounded-lg border transition disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-4 bg-white border-b sm:px-6 border-slate-200">
        <h1 className="text-lg font-bold text-teal-600 sm:text-xl">
          MediBook · ექიმის სივრცე
        </h1>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm sm:inline text-slate-500">
            ექიმი:{" "}
            <strong className="text-slate-900">{profile?.full_name}</strong>
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
          <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
            <p className="text-xs text-slate-500">დღევანდელი</p>
            <p className="text-2xl font-bold text-slate-900">{counts.today}</p>
          </div>
          <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
            <p className="text-xs text-slate-500">დასადასტურებელი</p>
            <p className="text-2xl font-bold text-amber-600">
              {counts.pending}
            </p>
          </div>
          <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
            <p className="text-xs text-slate-500">დასრულებული</p>
            <p className="text-2xl font-bold text-teal-600">
              {counts.completed}
            </p>
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
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-slate-600 border-slate-300 hover:border-teal-500"
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
          <p className="text-sm text-teal-600">მონაცემები იტვირთება...</p>
        ) : visible.length === 0 ? (
          <p className="text-sm text-slate-500">ამ ფილტრით ვიზიტები არ არის.</p>
        ) : (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <Card key={item.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-slate-500">პაციენტი</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {item.patientName}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 px-2.5 py-1 text-xs font-semibold border rounded-full ${STATUS_STYLES[item.status]}`}
                  >
                    {item.status === "confirmed" && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-indicator"></span>
                    )}
                    {STATUS_LABELS[item.status]}
                  </span>
                </div>

                <p className="mt-2 text-sm text-teal-600">🕒 {item.date}</p>

                {item.notes && (
                  <p className="p-3 mt-3 text-xs border rounded-xl bg-slate-50 border-slate-200 text-slate-600">
                    📝 {item.notes}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {item.status === "pending" && (
                    <button
                      disabled={busyId === item.id}
                      onClick={() => changeStatus(item.id, "confirmed")}
                      className={`${btn} text-white bg-teal-600 border-teal-600 hover:bg-teal-500`}
                    >
                      დადასტურება
                    </button>
                  )}
                  {item.status === "confirmed" && (
                    <button
                      disabled={busyId === item.id}
                      onClick={() => changeStatus(item.id, "completed")}
                      className={`${btn} text-white bg-emerald-600 border-emerald-600 hover:bg-emerald-500`}
                    >
                      დასრულება
                    </button>
                  )}
                  {item.status !== "cancelled" && (
                    <button
                      onClick={() => openNotes(item)}
                      className={`${btn} text-slate-700 bg-white border-slate-300 hover:border-teal-500`}
                    >
                      {item.notes ? "დანიშნულების შეცვლა" : "დანიშნულება"}
                    </button>
                  )}
                  {(item.status === "pending" ||
                    item.status === "confirmed") && (
                    <button
                      disabled={busyId === item.id}
                      onClick={() => changeStatus(item.id, "cancelled")}
                      className={`${btn} text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100`}
                    >
                      გაუქმება
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </section>
        )}
      </main>

      <footer className="px-6 py-4 text-xs text-center border-t text-slate-500 border-slate-200">
        &copy; 2026 MediBook
      </footer>

      <Modal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `დანიშნულება: ${editing.patientName}` : ""}
      >
        <label
          htmlFor="notes"
          className="block mb-1 text-xs font-semibold text-slate-700"
        >
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
        <p className="mt-1 text-xs text-right text-slate-400">
          {noteText.length}/1000
        </p>
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
            {savingNote ? "ინახება..." : "შენახვა"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
