import { supabase } from '../supabaseClient';

export const appointmentService = {
  // ექიმის ვიზიტები (ექიმის პანელისთვის)
  async getAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select('id, appointment_date, appointment_time, status, profiles(full_name), doctors(name)')
      .order('appointment_date', { ascending: true });
    if (error) throw error;
    return data.map((a) => ({
      id: a.id,
      patientName: a.profiles?.full_name ?? '—',
      doctorName: a.doctors?.name ?? '—',
      date: `${a.appointment_date} ${a.appointment_time.slice(0, 5)}`,
      status: a.status,
    }));
  },

  // პაციენტის საკუთარი ვიზიტები
  async getMyAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select('id, appointment_date, appointment_time, status, doctors(name, specialty)')
      .order('appointment_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getBookedSlots(doctorId, date) {
    const { data, error } = await supabase.rpc('get_booked_slots', {
      p_doctor_id: doctorId,
      p_date: date,
    });
    if (error) throw error;
    return data.map((r) => r.appointment_time.slice(0, 5));
  },

  async book({ doctorId, date, time, patientId }) {
    const { data, error } = await supabase
      .from('appointments')
      .insert([{ doctor_id: doctorId, appointment_date: date, appointment_time: time, patient_id: patientId, status: 'confirmed' }])
      .select()
      .single();

    if (error?.code === '23505') {
      throw new Error('ეს დრო უკვე დაკავებულია, აირჩიეთ სხვა დრო.');
    }
    if (error) throw error;
    return data;
  },

  async cancel(id) {
    const { error } = await supabase.from('appointments').update({ status: 'cancelled' }).eq('id', id);
    if (error) throw error;
  },
};