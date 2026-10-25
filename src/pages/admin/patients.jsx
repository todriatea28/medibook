import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase
      .from('profiles')
      .select('id, full_name, email, created_at')
      .eq('role', 'patient')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setPatients(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 text-slate-800">
      <h1 className="text-2xl font-bold text-slate-900">პაციენტები</h1>

      {error && (
        <div className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl">{error}</div>
      )}

      <div className="overflow-x-auto bg-white border shadow-sm rounded-2xl border-slate-200">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs uppercase border-b text-slate-500 bg-slate-50 border-slate-200">
            <tr>
              <th className="px-6 py-3">სახელი</th>
              <th className="px-6 py-3">ელ-ფოსტა</th>
              <th className="px-6 py-3">რეგისტრაცია</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan="3" className="px-6 py-8 text-center text-teal-600">იტვირთება...</td></tr>
            ) : patients.length === 0 ? (
              <tr><td colSpan="3" className="px-6 py-8 text-center">პაციენტები ჯერ არ არის.</td></tr>
            ) : (
              patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{p.full_name || '—'}</td>
                  <td className="px-6 py-4">{p.email}</td>
                  <td className="px-6 py-4">{new Date(p.created_at).toLocaleDateString('ka-GE')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}