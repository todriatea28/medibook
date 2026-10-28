import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Navbar from '../../components/Navbar';

export default function Schedule() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // ვკითხულობთ მონაცემებს 'appointments' ცხრილიდან არჩეული თარიღის მიხედვით
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

  // ვფილტრავთ ვიზიტებს თარიღის მიხედვით (თუ appointment_date ან rawDate გვაქვს)
  const filteredAppointments = appointments.filter(item => {
    if (!selectedDate) return true;
    const itemDate = item.appointment_date ? item.appointment_date.slice(0, 10) : '';
    return itemDate === selectedDate || item.date === selectedDate;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-stone-50 via-rose-50/20 to-stone-100 text-stone-800">
      <Navbar />

      <main className="flex-1 w-full px-4 py-10 mx-auto space-y-8 max-w-7xl sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-stone-900">ვიზიტების განრიგი</h1>
            <p className="mt-1 text-sm text-stone-500">აირჩიეთ სასურველი თარიღი და ნახეთ დროები</p>
          </div>

          {/* თარიღის ასარჩევი კალენდარი */}
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="pl-2 text-xs font-semibold text-stone-700">თარიღი:</span>
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-12 font-medium text-center text-rose-900">
            იტვირთება განრიგი...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.length === 0 ? (
              <p className="py-8 text-center text-stone-500 col-span-full">არჩეული თარიღისთვის ჩანაწერები არ არის.</p>
            ) : (
              filteredAppointments.map((item) => (
                <div 
                  key={item.id} 
                  className="p-6 space-y-4 transition-all border shadow-sm bg-white/90 backdrop-blur-md border-stone-200/80 rounded-3xl hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-rose-900">
                      🕒 დრო: {item.appointment_time || item.time || '10:00'}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'თავისუფალი' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {item.status || 'დაჯავშნილი'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600">
                    <p><strong className="text-stone-700">პაციენტი:</strong> {item.patient_name || item.patientName || 'მითითებული არ არის'}</p>
                    <p><strong className="text-stone-700">ტელეფონი:</strong> {item.patient_phone || 'მითითებული არ არის'}</p>
                    {item.diagnosis && (
                      <p><strong className="text-stone-700">დიაგნოზი:</strong> {item.diagnosis}</p>
                    )}
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