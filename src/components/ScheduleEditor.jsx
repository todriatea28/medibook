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
      setMsg({ type: 'ok', text: 'გრაფიკი შენახულია ✔' });
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
    'px-2 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-40';

  return (
    <section
      className="p-5 space-y-5 bg-white border shadow-sm rounded-2xl border-slate-200"
      aria-label="სამუშაო გრაფიკი"
    >
      <h2 className="text-lg font-bold text-slate-900">ჩემი სამუშაო გრაფიკი</h2>

      <div className="space-y-2">
        {WEEKDAYS.map(({ n, label }) => {
          const d = days[n] ?? DEFAULT;
          return (
            <div key={n} className="flex flex-wrap items-center gap-3 py-2 border-b border-slate-100">
              <label className="flex items-center gap-2 text-sm font-semibold w-36 text-slate-700">
                <input
                  type="checkbox"
                  checked={d.enabled}
                  onChange={(e) => update(n, { enabled: e.target.checked })}
                />
                {label}
              </label>
              <input
                type="time"
                aria-label={`${label} დაწყება`}
                className={field}
                disabled={!d.enabled}
                value={d.start}
                onChange={(e) => update(n, { start: e.target.value })}
              />
              <span className="text-slate-400">–</span>
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
                  <option key={m} value={m}>{m} წთ</option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-slate-900">დაკეტილი დღეები (შვებულება)</h3>
        <div className="flex flex-wrap gap-2">
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
            className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-700 rounded-lg hover:bg-slate-600"
          >
            დაკეტვა
          </button>
        </div>
        <ul className="flex flex-wrap gap-2 mt-3">
          {daysOff.map((o) => (
            <li
              key={o.id}
              className="flex items-center gap-2 px-3 py-1 text-xs border rounded-full bg-rose-50 text-rose-700 border-rose-200"
            >
              {o.off_date}
              <button onClick={() => removeOff(o.id)} aria-label="წაშლა" className="font-bold">✕</button>
            </li>
          ))}
          {daysOff.length === 0 && <li className="text-xs text-slate-400">დაკეტილი დღე არ არის.</li>}
        </ul>
      </div>

      {msg.text && (
        <p
          role="status"
          className={`p-3 text-xs border rounded-xl ${
            msg.type === 'ok'
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
              : 'text-rose-600 bg-rose-50 border-rose-200'
          }`}
        >
          {msg.text}
        </p>
      )}

      <button
        onClick={save}
        disabled={saving}
        className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 shadow-md rounded-xl hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {saving ? 'ინახება...' : 'გრაფიკის შენახვა'}
      </button>
    </section>
  );
}