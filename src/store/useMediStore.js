import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMediStore = create(
  persist(
    (set) => ({
      // მონაცემთა კოლექცია
      doctors: [],
      appointments: [],
      notifications: [], // 👈 ახალი: შეტყობინებების მასივი ზარისთვის
      
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
      setNotifications: (notifications) => set({ notifications }),

      // CRUD მოქმედებები ვიზიტებისთვის (ავტომატური შეტყობინებების გენერირებით)
      addAppointment: (appointment) =>
        set((state) => {
          const newNotification = {
            id: Date.now(),
            text: `ახალი ვიზიტი წარმატებით დაჯავშნა!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return {
            appointments: [appointment, ...state.appointments],
            notifications: [newNotification, ...state.notifications],
          };
        }),

      cancelAppointment: (id) =>
        set((state) => {
          const newNotification = {
            id: Date.now(),
            text: `ვიზიტის სტატუსი შეიცვალა: გაუქმებულია.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return {
            appointments: state.appointments.map((a) =>
              a.id === id ? { ...a, status: 'cancelled' } : a
            ),
            notifications: [newNotification, ...state.notifications],
          };
        }),

      completeAppointment: (id, diagnosis, notes) =>
        set((state) => {
          const newNotification = {
            id: Date.now(),
            text: `ექიმმა დაასრულა ვიზიტი და დაამატა დანიშნულება.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return {
            appointments: state.appointments.map((a) =>
              a.id === id ? { ...a, status: 'completed', diagnosis, notes } : a
            ),
            notifications: [newNotification, ...state.notifications],
          };
        }),
    }),
    {
      name: 'medibook-storage', // localStorage სინქრონიზაცია
    }
  )
);