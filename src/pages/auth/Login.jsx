import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { supabase } from '../../supabaseClient'; //[cite: 6]

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. ავტორიზაცია Supabase Auth-ით
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. მომხმარებლის როლის წამოღება profiles ცხრილიდან
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (profileError) throw profileError;

        const userRole = profileData?.role;

        // 3. გადამისამართება როლის მიხედვით
        if (userRole === 'admin') {
         navigate('/admin');
        } else if (userRole === 'doctor') {
          navigate('/doctor'); // ექიმის პანელი
        } else {
          navigate('/schedule'); // პაციენტისთვის ჯავშნის განრიგი
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'შესვლისას მოხდა შეცდომა. შეამოწმეთ მონაცემები.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* ზედა ნავიგაცია */}
      <Navbar />

      <main className="flex items-center justify-center flex-1 p-4 my-8">
        <div className="w-full max-w-md p-6 space-y-6 bg-white border shadow-xl border-slate-200 rounded-3xl sm:p-8">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-slate-900">სისტემაში შესვლა</h2>
            <p className="text-xs text-slate-500">შეიყვანეთ თქვენი მონაცემები ანგარიშზე წვდომისთვის</p>
          </div>

          {errorMsg && (
            <div className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl">
              {errorMsg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">ელ-ფოსტა</label>
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
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">პაროლი</label>
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
              {loading ? 'მიმდინარეობს შესვლა...' : 'შესვლა'}
            </button>
          </form>

          <p className="pt-2 text-xs text-center text-slate-500">
            არ გაქვთ ანგარიში?{' '}
            <Link to="/register" className="font-semibold text-teal-600 hover:underline">
              რეგისტრაცია
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}