import { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    appointmentService
      .getAppointments()
      .then(setAppointments)
      .catch((err) => {
        console.error('შეცდომა ვიზიტების ჩატვირთვისას:', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { appointments, loading, error };
}