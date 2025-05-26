"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginNow } from './LoginFunctions'
import "../globals.css";

export default function Log() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      const data = await loginNow(email, password);
      if (data && data.token) {
        // Store auth token
        localStorage.setItem('authToken', data.token);
        
        // Store user info if available
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        // Force a reload of the app to ensure all auth-dependent components update
        window.location.href = '/admin/dashboard';
        // Store user info if available
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        // Force route change to dashboard
        router.push('/admin/dashboard');
        return;
      }
      
      setError('Invalid credentials or missing token');
    } catch (err: any) {
      let errorMsg = 'An error occurred during login';
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (typeof err === 'string') {
        errorMsg = err;
      } else if (err && typeof err === 'object' && 'message' in err) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login py-10 h-screen">
      <div className="container sm:px-6">
        <div className="block xl:grid grid-cols-2 gap-4 items-center">
          {/* Login Info */}
          <div className="hidden xl:flex flex-col justify-center">
            <Link href="/" className="-intro-x flex items-center pt-5">
              <Image alt="Admin Panel" width={24} height={24} src="/dist/images/logo.svg" />
              <span className="text-white text-lg ml-3"> DLT </span>
            </Link>
            <div className="my-10">
              <Image alt="Admin Panel" width={200} height={200} src="/dist/images/illustration.svg" />
              <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                A few more clicks to <br /> sign in to your account.
              </div>
              <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                Manage all your e-commerce accounts in one place
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="flex items-center justify-center">
            <div className="bg-white dark:bg-darkmode-600 px-5 sm:px-8 py-8 rounded-md shadow-md w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center">Sign In</h2>
              <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                A few more clicks to sign in to your account. Manage all your e-commerce accounts in one place
              </div>
              <form onSubmit={handleSubmit} className="intro-x mt-8">
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                <input
                  type="text"
                  className="intro-x login__input form-control py-3 px-4 block"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <input
                  type="password"
                  className="intro-x login__input form-control py-3 px-4 block mt-4"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                  <div className="flex items-center mr-auto">
                    <input id="remember-me" type="checkbox" className="form-check-input border mr-2" />
                    <label className="cursor-pointer select-none" htmlFor="remember-me">Remember me</label>
                  </div>
                  <Link href="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="intro-x mt-5 text-center">
                  <button 
                    type="submit"
                    className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top relative"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="opacity-0">Login</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </>
                    ) : 'Login'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0"
                    onClick={handleRegister}
                    disabled={loading}
                  >
                    Register
                  </button>
                </div>
              </form>
              <div className="intro-x mt-10 text-slate-600 dark:text-slate-500 text-center">
                By signing up, you agree to our{" "}
                <Link className="text-primary dark:text-slate-200" href="/terms">Terms and Conditions</Link> &{" "}
                <Link className="text-primary dark:text-slate-200" href="/privacy">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Mode Switcher */}
      <div
        onClick={() => setDarkMode(!darkMode)}
        className="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10"
      >
        <div className="mr-4 text-gray-700 dark:text-gray-300">Dark Mode</div>
        <div className="dark-mode-switcher__toggle border"></div>
      </div>
    </div>
  );
}
