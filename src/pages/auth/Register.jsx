import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { supabase } from "../../supabaseClient";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });

      if (authError) throw authError;

      navigate("/login");
    } catch (err) {
      setErrorMsg(err.message || "რეგისტრაციისას მოხდა შეცდომა");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex items-center justify-center flex-1 p-4 my-8">
        <div className="w-full max-w-md p-6 space-y-6 bg-white border shadow-xl border-slate-200 rounded-3xl sm:p-8">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              ანგარიშის შექმნა
            </h2>
            <p className="text-xs text-slate-500">
              შეავსეთ ფორმა MediBook-ზე დასარეგისტრირებლად
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl">
              {errorMsg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                სრული სახელი
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="გიორგი გიორგაძე"
                className="w-full px-4 py-3 text-sm border bg-slate-50 border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ელ-ფოსტა
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 text-sm border bg-slate-50 border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                პაროლი
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-sm border bg-slate-50 border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm shadow-md transition"
            >
              {loading ? "მიმდინარეობს რეგისტრაცია..." : "რეგისტრაცია"}
            </button>
          </form>

          <p className="pt-2 text-xs text-center text-slate-500">
            უკვე გაქვთ ანგარიში?{" "}
            <Link
              to="/login"
              className="font-semibold text-teal-600 hover:underline"
            >
              შესვლა
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
