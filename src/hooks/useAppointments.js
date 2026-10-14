import { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const data = await appointmentService.getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("შეცდომა ვიზიტების ჩატვირთვისას:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, []);

  return { appointments, loading };
}