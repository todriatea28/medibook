// ვიზიტების სერვისი მონაცემთა მოსატანად
export const appointmentService = {
  getAppointments: async () => {
    // სამომავლოდ აქ იქნება Supabase მოთხოვნა, ახლა კი ვაბრუნებთ მონაცემებს
    return [
      { id: 1, patientName: "გიორგი მაისურაძე", doctorName: "დრ. ნინო ბერიძე", date: "2026-06-08 14:00", status: "confirmed" },
      { id: 2, patientName: "მარიამ ქავთარაძე", doctorName: "დრ. დავით ლომიძე", date: "2026-06-08 15:30", status: "pending" },
    ];
  },
};