import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const doctorSchema = z.object({
  name: z.string().min(3, 'სახელი და გვარი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან'),
  specialty: z.string().min(2, 'სპეციალობა სავალდებულოა'),
  email: z.email('გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა'),
});

const inputClass =
  'w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500';
const labelClass = 'block mb-1 text-xs font-semibold text-slate-700';

export default function DoctorForm({ onSubmitData, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(doctorSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="doc-name" className={labelClass}>ექიმის სახელი და გვარი</label>
        <input
          id="doc-name"
          {...register('name')}
          type="text"
          className={inputClass}
          placeholder="მაგ: დრ. ნინო ბერიძე"
        />
        {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="doc-specialty" className={labelClass}>სპეციალობა</label>
        <input
          id="doc-specialty"
          {...register('specialty')}
          type="text"
          className={inputClass}
          placeholder="მაგ: კარდიოლოგი"
        />
        {errors.specialty && <p className="mt-1 text-xs text-rose-600">{errors.specialty.message}</p>}
      </div>

      <div>
        <label htmlFor="doc-email" className={labelClass}>ელ-ფოსტა</label>
        <input
          id="doc-email"
          {...register('email')}
          type="email"
          className={inputClass}
          placeholder="nino@medibook.ge"
        />
        {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-semibold transition bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
        >
          გაუქმება
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-semibold text-white transition bg-teal-600 shadow-md rounded-xl hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'ინახება...' : 'შენახვა'}
        </button>
      </div>
    </form>
  );
}