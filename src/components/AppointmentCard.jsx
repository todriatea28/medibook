import { memo } from 'react';
import Card from './Card/Card';

const STATUS_LABELS = {
  pending: 'მოლოდინში',
  confirmed: 'დადასტურებული',
  cancelled: 'გაუქმებული',
  completed: 'დასრულებული',
};

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  completed: 'bg-slate-100 text-slate-600 border-slate-200',
};

const btn =
  'px-3 py-1.5 text-xs font-semibold rounded-lg border transition disabled:opacity-60 disabled:cursor-not-allowed';

function AppointmentCard({ item, busy, onStatus, onNotes }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-slate-500">პაციენტი</p>
          <p className="mt-1 text-lg font-bold text-slate-900">{item.patientName}</p>
        </div>
        <span className={`inline-flex items-center gap-2 px-2.5 py-1 text-xs font-semibold border rounded-full ${STATUS_STYLES[item.status]}`}>
          {item.status === 'confirmed' && <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-indicator"></span>}
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
        {item.status === 'pending' && (
          <button disabled={busy} onClick={() => onStatus(item.id, 'confirmed')} className={`${btn} text-white bg-teal-600 border-teal-600 hover:bg-teal-500`}>
            დადასტურება
          </button>
        )}
        {item.status === 'confirmed' && (
          <button disabled={busy} onClick={() => onStatus(item.id, 'completed')} className={`${btn} text-white bg-emerald-600 border-emerald-600 hover:bg-emerald-500`}>
            დასრულება
          </button>
        )}
        {item.status !== 'cancelled' && (
          <button onClick={() => onNotes(item)} className={`${btn} text-slate-700 bg-white border-slate-300 hover:border-teal-500`}>
            {item.notes ? 'დანიშნულების შეცვლა' : 'დანიშნულება'}
          </button>
        )}
        {(item.status === 'pending' || item.status === 'confirmed') && (
          <button disabled={busy} onClick={() => onStatus(item.id, 'cancelled')} className={`${btn} text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100`}>
            გაუქმება
          </button>
        )}
      </div>
    </Card>
  );
}

export default memo(AppointmentCard);