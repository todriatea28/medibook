import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'; // სუპაბეისის კლიენტის იმპორტი
import Navbar from '../../components/Navbar';

export default function Schedule() {
  // 1. ვქმნით state-ს ვიზიტების შესანახად და დატვირთვის სტატუსის მართვისთვის
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. useEffect იძახებს მონაცემებს კომპონენტის ჩატვირთვისთანავე
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // ვკითხულობთ მონაცემებს 'appointments' ცხრილიდან
      const { data, error } = await supabase
        .from('appointments')
        .select('*');

      if (error) {
        console.error('შეცდომა მონაცემების წამოღებისას:', error);
      } else {
        setAppointments(data || []);
      }
    } catch (err) {
      console.error('მოულოდნელი შეცდომა:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="px-4 py-8 mx-auto space-y-6 max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">ვიზიტების განრიგი</h1>
          <p className="text-sm text-slate-500">მონაცემები იტვირთება პირდაპირ Supabase ბაზიდან</p>
        </div>

        {/* თუ მონაცემები ჯერ იტვირთება */}
        {loading ? (
          <div className="py-12 font-medium text-center text-slate-500">
            იტვირთება განრიგი...
          </div>
        ) : (
          /* როდესაც მონაცემები წამოიღო, ვალაგებთ ბარათებად */
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.length === 0 ? (
              <p className="text-slate-500">ჩანაწერები ჯერ არ არის.</p>
            ) : (
              appointments.map((item) => (
                <div 
                  key={item.id} 
                  className="p-5 space-y-3 bg-white border shadow-sm border-slate-200 rounded-2xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-teal-600">
                      🕒 დრო: {item.appointment_time}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'თავისუფალი' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600">
                    <p><strong className="text-slate-700">პაციენტი:</strong> {item.patient_name || 'მითითებული არ არის'}</p>
                    <p><strong className="text-slate-700">ტელეფონი:</strong> {item.patient_phone || 'მითითებული არ არის'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}