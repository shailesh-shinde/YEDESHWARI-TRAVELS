import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bus, Lock, User, ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('yt_admin_token', data.token);
        localStorage.setItem('yt_admin_user', JSON.stringify(data.admin));
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a192f]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0a192f] p-8 text-center text-white relative">
          <Link
            to="/"
            className="absolute top-4 left-4 p-2 text-slate-200 hover:text-white rounded-lg transition-colors flex items-center text-xs"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Home
          </Link>

          <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center mx-auto mb-3 shadow-lg">
            <img src="/yedeshwari-logo.svg" alt="Yedeshwari Travels Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-black font-heading text-white">
            Admin Portal
          </h2>
          <p className="text-xs text-amber-400 font-semibold mt-1">
            Yedeshwari Travels Pune • Fleet & Bookings
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs text-black bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#3a2d97]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs text-black bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#3a2d97]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-[#0a192f] hover:bg-white/10 rounded-xl shadow-md transition-all font-heading flex items-center justify-center cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Verifying Credentials...
                </span>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-slate-600 hover:text-amber-600 transition-colors">
              ← Return to Yedeshwari Travels Website
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

