'use client';

import { useState } from 'react';
import { LogIn, Shield, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  onLogin: (code: string) => void;
}

export default function LoginModal({ onLogin }: LoginModalProps) {
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      onLogin(code);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Shield size={40} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Access</h1>
        <p className="text-gray-500 text-sm mt-1">Enter your access code to continue</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Access Code
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your access code"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-12"
              autoFocus
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Contact your administrator if you don't have the code
          </p>
        </div>

        <button
          type="submit"
          disabled={!code.trim() || isLoading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Verifying...
            </>
          ) : (
            <>
              <LogIn size={18} />
              Access Dashboard
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-gray-400">
        <p>🔒 Protected access • All data is encrypted</p>
      </div>
    </div>
  );
}