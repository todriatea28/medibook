import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod სქემა სავალდებულო ველებისა და ვალიდაციისთვის
const doctorSchema = z.object({
  name: z.string().min(3, "სახელი და გვარი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან"),
  specialty: z.string().min(2, "სპეციალობა სავალდებულოა"),
  email: z.string().email("გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა"),
});

export default function DoctorForm({ onSubmitData, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-blue-200">ექიმის სახელი და გვარი</label>
        <input
          {...register("name")}
          type="text"
          className="w-full px-4 py-2.5 bg-slate-950/60 border border-blue-500/30 rounded-xl text-white placeholder-blue-400/40 focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="მაგ: დრ. ნინო ბერიძე"
        />
        {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-blue-200">სპეციალობა</label>
        <input
          {...register("specialty")}
          type="text"
          className="w-full px-4 py-2.5 bg-slate-950/60 border border-blue-500/30 rounded-xl text-white placeholder-blue-400/40 focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="მაგ: კარდიოლოგი"
        />
        {errors.specialty && <p className="mt-1 text-xs text-rose-400">{errors.specialty.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-blue-200">ელ-ფოსტა</label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-4 py-2.5 bg-slate-950/60 border border-blue-500/30 rounded-xl text-white placeholder-blue-400/40 focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="nino@medibook.ge"
        />
        {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email.message}</p>}
      </div>

      <div className="flex justify-end pt-4 space-x-3 border-t border-blue-500/20">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-blue-200 transition bg-slate-800 rounded-xl hover:bg-slate-700"
        >
          გაუქმება
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold text-white transition shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500"
        >
          შენახვა
        </button>
      </div>
    </form>
  );
}