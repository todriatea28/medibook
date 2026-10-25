import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { appointmentService } from '../../services/appointmentService';

const STATUS_LABELS = { pending: 'მოლოდინში', confirmed: 'დადასტურებული', cancelled: 'გაუქმებული' };

export default function Settings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase
      .from('appointments')
      .select('id, appointment_date, appointment_time, status, profiles(full_name), doctors(name)')
      .order('appointment_date', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setItems(data);
        setLoading(false);
      });
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('ნამდვილად გსურთ ვიზიტის გაუქმება?')) return;
    try {
      await appointmentService.cancel(id);
      setItems((list) => list.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      <h1 className="text-2xl font-bold text-slate-900">ვიზიტების მართვა</h1>

      {error && (
        <div className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl">{error}</div>
      )}

      <div className="overflow-x-auto bg-white border shadow-sm rounded-2xl border-slate-200">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs uppercase border-b text-slate-500 bg-slate-50 border-slate-200">
            <tr>
              <th className="px-6 py-3">პაციენტი</th>
              <th className="px-6 py-3">ექიმი</th>
              <th className="px-6 py-3">თარიღი</th>
              <th className="px-6 py-3">სტატუსი</th>
              <th className="px-6 py-3 text-right">მოქმედება</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-teal-600">იტვირთება...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center">ვიზიტები ჯერ არ არის.</td></tr>
            ) : (
              items.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{a.profiles?.full_name || '—'}</td>
                  <td className="px-6 py-4 text-teal-600">{a.doctors?.name || '—'}</td>
                  <td className="px-6 py-4">{a.appointment_date} · {a.appointment_time.slice(0, 5)}</td>
                  <td className="px-6 py-4">{STATUS_LABELS[a.status]}</td>
                  <td className="px-6 py-4 text-right">
                    {a.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancel(a.id)}
                        className="px-3 py-1 text-xs border rounded-lg bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
                      >
                        გაუქმება
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}