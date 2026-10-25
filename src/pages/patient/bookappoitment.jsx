import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '../../components/Navbar';
import { supabase } from '../../supabaseClient';
import { appointmentService } from '../../services/appointmentService';
import { useAuth } from '../../context/AuthContext';

const SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const today = () => new Date().toISOString().slice(0, 10);

const bookingSchema = z.object({
  date: z.string().min(1, 'აირჩიეთ თარიღი').refine((d) => d >= today(), 'წარსულ თარიღზე დაჯავშნა შეუძლებელია'),
  time: z.string().min(1, 'აირჩიეთ დრო'),
});

export default function BookAppointment() {
  const { doctorId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [booked, setBooked] = useState([]);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(bookingSchema), defaultValues: { date: today(), time: '' } });

  const date = watch('date');
  const time = watch('time');

  useEffect(() => {
    supabase.from('doctors').select('*').eq('id', doctorId).maybeSingle().then(({ data }) => setDoctor(data));
  }, [doctorId]);

  useEffect(() => {
    if (!date) return;
    appointmentService
      .getBookedSlots(doctorId, date)
      .then(setBooked)
      .catch(() => setBooked([]));
    setValue('time', '');
  }, [doctorId, date, setValue]);

  const onSubmit = async (values) => {
    setServerError('');
    try {
      await appointmentService.book({
        doctorId,
        date: values.date,
        time: values.time,
        patientId: user.id,
      });
      navigate('/patient');
    } catch (err) {
      setServerError(err.message);
      // დაკავებული საათები თავიდან ჩავტვირთოთ
      appointmentService.getBookedSlots(doctorId, values.date).then(setBooked).catch(() => {});
      setValue('time', '');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="max-w-xl px-4 py-8 mx-auto">
        <Link to="/patient" className="text-sm text-teal-600 hover:underline">← უკან</Link>

        <div className="p-6 mt-4 space-y-6 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div>
            <h1 className="text-xl font-bold text-slate-900">ვიზიტის დაჯავშნა</h1>
            {doctor && (
              <p className="text-sm text-slate-600">
                {doctor.name} · <span className="text-teal-600">{doctor.specialty}</span>
              </p>
            )}
          </div>

          {serverError && (
            <div role="alert" className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="date" className="block mb-1 text-xs font-semibold text-slate-700">თარიღი</label>
              <input
                id="date"
                type="date"
                min={today()}
                {...register('date')}
                className="w-full px-4 py-3 text-sm border bg-slate-50 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.date && <p className="mt-1 text-xs text-rose-600">{errors.date.message}</p>}
            </div>

            <div>
              <span className="block mb-2 text-xs font-semibold text-slate-700">დრო</span>
              <div className="grid grid-cols-4 gap-2">
                {SLOTS.map((slot) => {
                  const taken = booked.includes(slot);
                  const selected = time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={taken}
                      onClick={() => setValue('time', slot, { shouldValidate: true })}
                      className={`py-2 text-sm font-semibold rounded-xl border transition ${
                        taken
                          ? 'bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed'
                          : selected
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-teal-500'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {errors.time && <p className="mt-2 text-xs text-rose-600">{errors.time.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 text-sm font-semibold text-white transition bg-teal-600 shadow-md rounded-xl hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'იგზავნება...' : 'დაჯავშნა'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}