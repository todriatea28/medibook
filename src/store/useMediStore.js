import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMediStore = create(
  persist(
    (set) => ({
      // მონაცემთა კოლექცია
      doctors: [],
      appointments: [],
      
      // ძებნა და ფილტრები
      searchQuery: '',
      selectedSpecialty: '',
      selectedClinic: '',

      // სეთერები
      setDoctors: (doctors) => set({ doctors }),
      setAppointments: (appointments) => set({ appointments }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedSpecialty: (specialty) => set({ selectedSpecialty: specialty }),
      setSelectedClinic: (clinicId) => set({ selectedClinic: clinicId }),

      // CRUD მოქმედებები ვიზიტებისთვის
      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [appointment, ...state.appointments],
        })),

      cancelAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status: 'cancelled' } : a
          ),
        })),

      completeAppointment: (id, diagnosis, notes) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status: 'completed', diagnosis, notes } : a
          ),
        })),
    }),
    {
      name: 'medibook-storage', // localStorage სინქრონიზაცია
    }
  )
);