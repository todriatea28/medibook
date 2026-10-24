import { supabase } from '../supabaseClient';

export const doctorService = {
  async getDoctors() {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async addDoctor({ name, specialty, email }) {
    const { data, error } = await supabase
      .from('doctors')
      .insert([{ name, specialty, email }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteDoctor(id) {
    const { error } = await supabase.from('doctors').delete().eq('id', id);
    if (error) throw error;
  },
};