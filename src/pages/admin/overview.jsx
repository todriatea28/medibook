import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import StatCard from '../../components/StatCard/StatCard';

const today = () => new Date().toISOString().slice(0, 10);

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const count = (q) => q.then(({ count, error }) => {
          if (error) throw error;
          return count ?? 0;
        });

        const [doctors, patients, todayAppts, total] = await Promise.all([
          count(supabase.from('doctors').select('*', { count: 'exact', head: true })),
          count(supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'patient')),
          count(
            supabase
              .from('appointments')
              .select('*', { count: 'exact', head: true })
              .eq('appointment_date', today())
              .neq('status', 'cancelled')
          ),
          count(
            supabase
              .from('appointments')
              .select('*', { count: 'exact', head: true })
              .neq('status', 'cancelled')
          ),
        ]);
        setStats({ doctors, patients, todayAppts, total });
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  if (error) {
    return <p className="p-3 text-sm border text-rose-600 bg-rose-50 border-rose-200 rounded-xl">{error}</p>;
  }

  const v = (n) => (stats ? String(n) : '...');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">მიმოხილვა</h1>
      <section className="stats-grid">
        <StatCard title="ექიმები" value={v(stats?.doctors)} change="სულ სისტემაში" />
        <StatCard title="პაციენტები" value={v(stats?.patients)} change="რეგისტრირებული" />
        <StatCard title="დღევანდელი ვიზიტები" value={v(stats?.todayAppts)} change="გაუქმებულის გარეშე" />
        <StatCard title="აქტიური ვიზიტები" value={v(stats?.total)} change="სულ" />
      </section>
    </div>
  );
}