import { supabase } from "../supabaseClient";

export const WEEKDAYS = [
  { n: 1, label: "ორშაბათი" },
  { n: 2, label: "სამშაბათი" },
  { n: 3, label: "ოთხშაბათი" },
  { n: 4, label: "ხუთშაბათი" },
  { n: 5, label: "პარასკევი" },
  { n: 6, label: "შაბათი" },
  { n: 0, label: "კვირა" },
];

// ('09:00', '12:00', 30) -> ['09:00', '09:30', ..., '11:30']
export function generateSlots(start, end, minutes) {
  const toMin = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
  const fmt = (m) =>
    `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  const slots = [];
  for (let m = toMin(start); m + minutes <= toMin(end); m += minutes) {
    slots.push(fmt(m));
  }
  return slots;
}

export const scheduleService = {
  async getSchedule(doctorId) {
    const { data, error } = await supabase
      .from("doctor_schedules")
      .select("*")
      .eq("doctor_id", doctorId);
    if (error) throw error;
    return data;
  },

  async saveDay({ doctorId, weekday, start, end, minutes }) {
    const { error } = await supabase.from("doctor_schedules").upsert(
      {
        doctor_id: doctorId,
        weekday,
        start_time: start,
        end_time: end,
        slot_minutes: minutes,
      },
      { onConflict: "doctor_id,weekday" },
    );
    if (error) throw error;
  },

  async removeDay(doctorId, weekday) {
    const { error } = await supabase
      .from("doctor_schedules")
      .delete()
      .eq("doctor_id", doctorId)
      .eq("weekday", weekday);
    if (error) throw error;
  },

  async getDaysOff(doctorId) {
    const { data, error } = await supabase
      .from("doctor_days_off")
      .select("*")
      .eq("doctor_id", doctorId)
      .gte("off_date", new Date().toISOString().slice(0, 10))
      .order("off_date");
    if (error) throw error;
    return data;
  },

  async addDayOff(doctorId, date) {
    const { error } = await supabase
      .from("doctor_days_off")
      .insert([{ doctor_id: doctorId, off_date: date }]);
    if (error && error.code !== "23505") throw error; // 23505 = უკვე დაკეტილია
  },

  async removeDayOff(id) {
    const { error } = await supabase
      .from("doctor_days_off")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  // პაციენტისთვის: კონკრეტული თარიღის სამუშაო საათები
  async getSlotsForDate(doctorId, date) {
    const weekday = new Date(date + "T00:00:00").getDay();
    const [sched, off] = await Promise.all([
      supabase
        .from("doctor_schedules")
        .select("*")
        .eq("doctor_id", doctorId)
        .eq("weekday", weekday)
        .maybeSingle(),
      supabase
        .from("doctor_days_off")
        .select("id")
        .eq("doctor_id", doctorId)
        .eq("off_date", date)
        .maybeSingle(),
    ]);
    if (sched.error) throw sched.error;
    if (off.error) throw off.error;
    if (!sched.data || off.data) return [];
    return generateSlots(
      sched.data.start_time,
      sched.data.end_time,
      sched.data.slot_minutes,
    );
  },
};
