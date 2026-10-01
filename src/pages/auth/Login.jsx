import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validation';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("შესვლის მონაცემები:", data);
    alert("ავტორიზაცია წარმატებით განხორციელდა!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-slate-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-white border shadow-lg rounded-xl border-slate-100">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-slate-900">
            MediBook - ავტორიზაცია
          </h2>
          <p className="mt-2 text-sm text-center text-slate-600">
            გთხოვთ გაიაროთ ავტორიზაცია სისტემაში შესასვლელად
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* ელ-ფოსტა */}
            <div>
              <label className="block text-sm font-medium text-slate-700">ელ-ფოსტა</label>
              <input
                {...register("email")}
                type="email"
                className="block w-full px-3 py-2 mt-1 border rounded-md border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="name@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* პაროლი */}
            <div>
              <label className="block text-sm font-medium text-slate-700">პაროლი</label>
              <input
                {...register("password")}
                type="password"
                className="block w-full px-3 py-2 mt-1 border rounded-md border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="********"
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors border border-transparent rounded-md bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              შესვლა
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}