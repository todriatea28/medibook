import { supabase } from "../supabaseClient";

const CACHE_KEY = "medihub:doctors";

const MOCK_DOCTORS = [
  {
    id: "mock-1",
    name: "დრ. ნინო ბერიძე",
    specialty: "კარდიოლოგი",
    email: "nino@medihub.ge",
  },
  {
    id: "mock-2",
    name: "დრ. დავით ლომიძე",
    specialty: "ნევროლოგი",
    email: "davit@medihub.ge",
  },
];

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const doctorService = {
  // აბრუნებს { data, isFallback }
  async getDoctors() {
    console.time("getDoctors");
    try {
      if (!navigator.onLine) throw new Error("offline");

      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;

      console.table(data);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } catch {
        /* ქეშის შეცდომა არ არის კრიტიკული */
      }
      return { data, isFallback: false };
    } catch (err) {
      console.warn("ბაზა მიუწვდომელია, ვრთავთ fallback რეჟიმს:", err.message);
      const cached = readCache() ?? MOCK_DOCTORS;
      console.table(cached);
      return { data: cached, isFallback: true };
    } finally {
      console.timeEnd("getDoctors");
    }
  },

  async addDoctor({ name, specialty, email }) {
    const { data, error } = await supabase
      .from("doctors")
      .insert([{ name, specialty, email }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteDoctor(id) {
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) throw error;
  },
};
