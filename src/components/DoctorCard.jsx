import { memo } from 'react';
import { Link } from 'react-router-dom';

function DoctorCard({ doctor }) {
  return (
    <article
      data-id={doctor.id}
      className="flex flex-col gap-3 p-5 bg-white border shadow-sm doctor-card rounded-2xl border-slate-200"
    >
      <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-teal-600 rounded-full">
        {doctor.name.replace('დრ. ', '').charAt(0)}
      </div>
      <div>
        <h3 className="font-bold text-slate-900">{doctor.name}</h3>
        <p className="text-sm text-teal-600">{doctor.specialty}</p>
      </div>
      <Link
        to={`/patient/book/${doctor.id}`}
        className="px-4 py-2 mt-auto text-sm font-semibold text-center text-white transition bg-teal-600 rounded-xl hover:bg-teal-500"
      >
        დაჯავშნა
      </Link>
    </article>
  );
}

export default memo(DoctorCard);