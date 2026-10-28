import { useMemo, useState } from 'react';
import { debounce } from '../utils/debounce';

export function useDoctorSearch(doctors) {
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [specialty, setSpecialty] = useState('');

  const applyQuery = useMemo(
    () =>
      debounce((value) => {
        setQuery(value);
        setSearching(false);
      }, 300),
    []
  );

  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearching(true);
    applyQuery(e.target.value);
  };

  const specialties = useMemo(
    () => [...new Set(doctors.map((d) => d.specialty))],
    [doctors]
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return doctors.filter(
      (d) => d.name.toLowerCase().includes(q) && (!specialty || d.specialty === specialty)
    );
  }, [doctors, query, specialty]);

  return {
    searchInput,
    onSearchChange,
    searching,
    specialty,
    setSpecialty,
    specialties,
    filtered,
  };
}