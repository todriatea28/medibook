import { useEffect, useState } from 'react';
import { scheduleService, WEEKDAYS } from '../services/scheduleService';

const DEFAULT = { enabled: false, start: '09:00', end: '17:00', minutes: 30 };
const today = () => new Date().toISOString().slice(0, 10);

export default function ScheduleEditor({ doctorId }) {
  const [days, setDays] = useState({});
  const [daysOff, setDaysOff] = useState([]);
  const [newOff, setNewOff] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!doctorId) return;
    (async () => {
      try {
        const [sched, off] = await Promise.all([
          scheduleService.getSchedule(doctorId),
          scheduleService.getDaysOff(doctorId),
        ]);
        const map = {};
        WEEKDAYS.forEach((d) => (map[d.n] = { ...DEFAULT }));
        sched.forEach((s) => {
          map[s.weekday] = {
            enabled: true,
            start: s.start_time.slice(0, 5),
            end: s.end_time.slice(0, 5),
            minutes: s.slot_minutes,
          };
        });
        setDays(map);
        setDaysOff(off);
      } catch (err) {
        setMsg({ type: 'error', text: err.message });
      }
    })();
  }, [doctorId]);

  const update = (n, patch) => setDays((d) => ({ ...d, [n]: { ...d[n], ...patch } }));

  const save = async () => {
    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      for (const { n } of WEEKDAYS) {
        const d = days[n];
        if (d.enabled) {
          if (d.end <= d.start) throw new Error('დასრულების დრო დაწყებაზე გვიან უნდა იყოს.');
          await scheduleService.saveDay({
            doctorId,
            weekday: n,
            start: d.start,
            end: d.end,
            minutes: Number(d.minutes),
          });
        } else {
          await scheduleService.removeDay(doctorId, n);
        }
      }
      setMsg({ type: 'ok', text: 'გრაფიკი წარმატებით შეინახა ✔' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const addOff = async () => {
    if (!newOff) return;
    try {
      await scheduleService.addDayOff(doctorId, newOff);
      setDaysOff(await scheduleService.getDaysOff(doctorId));
      setNewOff('');
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    }
  };

  const removeOff = async (id) => {
    try {
      await scheduleService.removeDayOff(id);
      setDaysOff((l) => l.filter((x) => x.id !== id));
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    }
  };

  const field =
    'px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800 text-stone-900 disabled:opacity-40 transition';

  return (
    <section
      className="p-6 space-y-6 border shadow-xl bg-white/90 backdrop-blur-xl rounded-3xl border-stone-200"
      aria-label="სამუშაო გრაფიკი"
    >
      <div className="pb-4 border-b border-stone-200">
        <h2 className="text-xl font-bold text-stone-900">ჩემი სამუშაო გრაფიკი</h2>
        <p className="text-xs text-stone-500 mt-0.5">მოარგეთ თქვენი ყოველკვირეული სამუშაო საათები და შესვენებები</p>
      </div>

      <div className="space-y-3">
        {WEEKDAYS.map(({ n, label }) => {
          const d = days[n] ?? DEFAULT;
          return (
            <div key={n} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition border bg-stone-50/50 rounded-2xl border-stone-200/60 hover:border-stone-300">
              <label className="flex items-center gap-3 text-xs font-bold cursor-pointer w-36 text-stone-700">
                <input
                  type="checkbox"
                  checked={d.enabled}
                  onChange={(e) => update(n, { enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-900 border-stone-300 focus:ring-rose-800"
                />
                <span className={d.enabled ? 'text-stone-900' : 'text-stone-400'}>{label}</span>
              </label>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="time"
                  aria-label={`${label} დაწყება`}
                  className={field}
                  disabled={!d.enabled}
                  value={d.start}
                  onChange={(e) => update(n, { start: e.target.value })}
                />
                <span className="font-medium text-stone-400">–</span>
                <input
                  type="time"
                  aria-label={`${label} დასრულება`}
                  className={field}
                  disabled={!d.enabled}
                  value={d.end}
                  onChange={(e) => update(n, { end: e.target.value })}
                />
                <select
                  aria-label={`${label} ხანგრძლივობა`}
                  className={field}
                  disabled={!d.enabled}
                  value={d.minutes}
                  onChange={(e) => update(n, { minutes: e.target.value })}
                >
                  {[15, 20, 30, 45, 60].map((m) => (
                    <option key={m} value={m}>{m} წთ სლოტი</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 space-y-3 border-t border-stone-200">
        <h3 className="text-sm font-bold text-stone-900">დაკეტილი დღეები (შვებულება / უქმეები)</h3>
        <div className="flex flex-wrap gap-3">
          <input
            type="date"
            min={today()}
            value={newOff}
            onChange={(e) => setNewOff(e.target.value)}
            className={field}
            aria-label="დაკეტვის თარიღი"
          />
          <button
            type="button"
            onClick={addOff}
            className="px-4 py-2 text-xs font-semibold text-white transition shadow-sm bg-stone-800 rounded-xl hover:bg-stone-900"
          >
            დღის დაკეტვა
          </button>
        </div>
        <ul className="flex flex-wrap gap-2 pt-1">
          {daysOff.map((o) => (
            <li
              key={o.id}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded-xl bg-rose-50 text-rose-800 border-rose-200 shadow-sm"
            >
              <span>{o.off_date}</span>
              <button 
                onClick={() => removeOff(o.id)} 
                aria-label="წაშლა" 
                className="ml-1 font-bold transition hover:text-rose-950"
              >
                ✕
              </button>
            </li>
          ))}
          {daysOff.length === 0 && <li className="py-1 text-xs text-stone-400">დაკეტილი დღეები არ არის მითითებული.</li>}
        </ul>
      </div>

      {msg.text && (
        <p
          role="status"
          className={`p-3 text-xs border rounded-xl font-medium ${
            msg.type === 'ok'
              ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
              : 'text-rose-800 bg-rose-50 border-rose-200'
          }`}
        >
          {msg.text}
        </p>
      )}

      <div className="pt-2">
        <button
          onClick={save}
          disabled={saving}
          className="w-full px-6 py-3 text-sm font-semibold text-white transition shadow-md bg-rose-900 shadow-rose-900/20 rounded-2xl hover:bg-rose-800 disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
        >
          {saving ? 'ინახება...' : 'გრაფიკის შენახვა'}
        </button>
      </div>
    </section>
  );
}