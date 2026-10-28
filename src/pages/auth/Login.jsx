import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "../../components/Navbar";
import { supabase } from "../../supabaseClient";
import { loginSchema, translateAuthError } from "../../utils/validation";

const inputClass =
  "w-full px-4 py-3 text-sm border bg-stone-50 border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800";
const labelClass = "block text-xs font-semibold text-stone-700 mb-1.5";

export default function Login() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async ({ email, password }) => {
    setServerError("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();
      if (profileError) throw profileError;
      if (!profile) {
        setServerError("თქვენი პროფილი ვერ მოიძებნა. მიმართეთ ადმინისტრატორს.");
        await supabase.auth.signOut();
        return;
      }

      if (profile.role === "admin") navigate("/admin");
      else if (profile.role === "doctor") navigate("/doctor");
      else navigate("/patient");
    } catch (err) {
      setServerError(translateAuthError(err.message));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-stone-50 via-rose-50/20 to-stone-100 text-stone-800">
      <Navbar />

      <main className="flex items-center justify-center flex-1 p-4 my-8">
        <div className="w-full max-w-md p-6 space-y-6 bg-white border shadow-xl border-stone-200 rounded-3xl sm:p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-stone-900">
              სისტემაში შესვლა
            </h1>
            <p className="text-xs text-stone-500">
              შეიყვანეთ თქვენი მონაცემები ანგარიშზე წვდომისთვის
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
                placeholder="••••••••"
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
              {isSubmitting ? "მიმდინარეობს შესვლა..." : "შესვლა"}
            </button>
          </form>

          <p className="pt-2 text-xs text-center text-stone-500">
            არ გაქვთ ანგარიში?{" "}
            <Link
              to="/register"
              className="font-semibold text-rose-900 hover:underline"
            >
              რეგისტრაცია
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}