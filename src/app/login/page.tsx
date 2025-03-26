"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ".././globals.css";
import { useRouter } from "next/navigation";




export default function Log() {
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();

  const handleRegister = () => {
    router.push("/register"); // Redirects to the register page
  };

  return (
    <html lang="en" className={darkMode ? "dark" : "light"}>
      <head>
        <title>Login - Midone - Tailwind HTML Admin Panel</title>
      </head>
      <body className="login">
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <Link href="/" className="-intro-x flex items-center pt-5">
                <Image alt="Admin Panel" width={24} height={24} src="/dist/images/logo.svg" />
                <span className="text-white text-lg ml-3"> DLT </span>
              </Link>
              <div className="my-auto">
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
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">Sign In</h2>
                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                  A few more clicks to sign in to your account. Manage all your e-commerce accounts in one place
                </div>
                <div className="intro-x mt-8">
                  <input type="text" className="intro-x login__input form-control py-3 px-4 block" placeholder="Email" />
                  <input type="password" className="intro-x login__input form-control py-3 px-4 block mt-4" placeholder="Password" />
                </div>
                <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                  <div className="flex items-center mr-auto">
                    <input id="remember-me" type="checkbox" className="form-check-input border mr-2" />
                    <label className="cursor-pointer select-none" htmlFor="remember-me">Remember me</label>
                  </div>
                  <Link href="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                  <button className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top" >Login</button>
                  <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top" onClick={handleRegister}>Register</button>
                </div>
                <div className="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                  By signing up, you agree to our <Link className="text-primary dark:text-slate-200" href="/terms">Terms and Conditions</Link> & <Link className="text-primary dark:text-slate-200" href="/privacy">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dark Mode Switcher */}
        <div onClick={() => setDarkMode(!darkMode)} className="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10">
          <div className="mr-4 text-gray-700 dark:text-gray-300">Dark Mode</div>
          <div className="dark-mode-switcher__toggle border"></div>
        </div>
      </body>
    </html>
  );
}