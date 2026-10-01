import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../utils/validation';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log("რეგისტრაციის მონაცემები:", data);
    // აქ მოხდება Supabase-თან დაკავშირება და მომხმარებლის რეგისტრაცია
    alert("რეგისტრაცია წარმატებით განხორციელდა!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-slate-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-white border shadow-lg rounded-xl border-slate-100">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-slate-900">
            MediBook - რეგისტრაცია
          </h2>
          <p className="mt-2 text-sm text-center text-slate-600">
            შექმენი ანგარიში სისტემაში წვდომისთვის
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* სახელი და გვარი */}
            <div>
              <label className="block text-sm font-medium text-slate-700">სახელი და გვარი</label>
              <input
                {...register("fullName")}
                type="text"
                className="relative block w-full px-3 py-2 mt-1 border rounded-md appearance-none border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                placeholder="მაგ: ნინო ბერიძე"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            {/* ელ-ფოსტა */}
            <div>
              <label className="block text-sm font-medium text-slate-700">ელ-ფოსტა</label>
              <input
                {...register("email")}
                type="email"
                className="relative block w-full px-3 py-2 mt-1 border rounded-md appearance-none border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                placeholder="name@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* ტელეფონის ნომერი */}
            <div>
              <label className="block text-sm font-medium text-slate-700">ტელეფონის ნომერი (არასავალდებულო)</label>
              <input
                {...register("phone")}
                type="text"
                className="relative block w-full px-3 py-2 mt-1 border rounded-md appearance-none border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                placeholder="+995 599 00 00 00"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            {/* პაროლი */}
            <div>
              <label className="block text-sm font-medium text-slate-700">პაროლი</label>
              <input
                {...register("password")}
                type="password"
                className="relative block w-full px-3 py-2 mt-1 border rounded-md appearance-none border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                placeholder="********"
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {/* როლის არჩევანი */}
            <div>
              <label className="block text-sm font-medium text-slate-700">მომხმარებლის ტიპი (როლი)</label>
              <select
                {...register("role")}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm text-slate-900"
              >
                <option value="patient">პაციენტი</option>
                <option value="doctor">ექიმი</option>
                <option value="admin">ადმინისტრატორი</option>
              </select>
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors border border-transparent rounded-md group bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              რეგისტრაცია
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}