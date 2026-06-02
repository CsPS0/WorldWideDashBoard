"use client";
import { useState } from 'react';
import Link from 'next/link';
export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = '/';
      } else {
        setError(data.error || 'Sign up failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="glass-card p-8 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-white mb-1">Create account</h2>
        <p className="text-sm text-alabaster/50 mb-6">Start customizing your dashboard.</p>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-alabaster/50 uppercase tracking-wider" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-alabaster/30 outline-none focus:border-orange/50 transition-colors"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-alabaster/50 uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-alabaster/30 outline-none focus:border-orange/50 transition-colors"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-alabaster/50 uppercase tracking-wider" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-alabaster/30 outline-none focus:border-orange/50 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange hover:bg-orange/90 text-black font-semibold py-2.5 rounded-lg transition-colors mt-2 flex justify-center items-center text-sm"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        <p className="mt-5 text-center text-alabaster/40 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-orange hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
