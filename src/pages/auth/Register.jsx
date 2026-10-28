import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "../../components/Navbar";
import { supabase } from "../../supabaseClient";
import { registerSchema, translateAuthError } from "../../utils/validation";

const inputClass =
  "w-full px-4 py-3 text-sm border bg-stone-50 border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800";
const labelClass = "block text-xs font-semibold text-stone-700 mb-1.5";

export default function Register() {
  const [serverError, setServerError] = useState("");
  const [needsConfirm, setNeedsConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async ({ fullName, email, password }) => {
    setServerError("");
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;

      // სესია არ არსებობს => ჩართულია ელ-ფოსტის დადასტურება
      if (!data.session) {
        setNeedsConfirm(true);
        return;
      }
      navigate("/patient");
    } catch (err) {
      setServerError(translateAuthError(err.message));
    }
  };

  if (needsConfirm) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-stone-50 via-rose-50/20 to-stone-100 text-stone-800">
        <Navbar />
        <main className="flex items-center justify-center flex-1 p-4 my-8">
          <div
            role="status"
            className="w-full max-w-md p-8 space-y-4 text-center bg-white border shadow-xl border-stone-200 rounded-3xl"
          >
            <div className="text-4xl">📧</div>
            <h1 className="text-xl font-bold text-stone-900">
              შეამოწმეთ ელ-ფოსტა
            </h1>
            <p className="text-sm text-stone-600">
              დადასტურების წერილი გამოგიგზავნეთ. ბმულზე გადასვლის შემდეგ
              შეგეძლებათ სისტემაში შესვლა.
            </p>
            <Link
              to="/login"
              className="inline-block px-5 py-2.5 text-sm font-semibold text-white bg-rose-900 rounded-xl hover:bg-rose-800 shadow-md shadow-rose-900/20 transition"
            >
              შესვლის გვერდზე
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-stone-50 via-rose-50/20 to-stone-100 text-stone-800">
      <Navbar />

      <main className="flex items-center justify-center flex-1 p-4 my-8">
        <div className="w-full max-w-md p-6 space-y-6 bg-white border shadow-xl border-stone-200 rounded-3xl sm:p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-stone-900">
              ანგარიშის შექმნა
            </h1>
            <p className="text-xs text-stone-500">
              შეავსეთ ფორმა medihub-ზე დასარეგისტრირებლად
            </p>
          </div>

          {serverError && (
            <div
              role="alert"
              className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl"
            >
              {serverError}
            </div>
          )}

          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label htmlFor="fullName" className={labelClass}>
                სრული სახელი
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="გიორგი გიორგაძე"
                className={inputClass}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                ელ-ფოსტა
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className={inputClass}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                პაროლი
              </label>
              <input
                id="password"
                type="password"
                placeholder="მინიმუმ 6 სიმბოლო"
                className={inputClass}
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-rose-900 hover:bg-rose-800 text-white font-semibold rounded-xl text-sm shadow-md shadow-rose-900/20 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "მიმდინარეობს რეგისტრაცია..." : "რეგისტრაცია"}
            </button>
          </form>

          <p className="pt-2 text-xs text-center text-stone-500">
            უკვე გაქვთ ანგარიში?{" "}
            <Link
              to="/login"
              className="font-semibold text-rose-900 hover:underline"
            >
              შესვლა
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}