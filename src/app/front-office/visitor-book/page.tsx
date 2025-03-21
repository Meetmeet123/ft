'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the component to ensure it only renders on the client
const VisitorBookForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    url: '',
    comment: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    url: '',
    comment: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      age: '',
      url: '',
      comment: '',
    };

    // Name validation: at least 2 characters
    if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    }

    // Email validation: must be a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation: at least 6 characters
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    // Age validation: must be a number and max 3 digits
    const ageNum = parseInt(formData.age);
    if (!formData.age || isNaN(ageNum) || formData.age.length > 3) {
      newErrors.age = 'Age must be a number with a maximum of 3 digits';
      isValid = false;
    }

    // URL validation: optional, but must be a valid URL if provided
    if (formData.url) {
      const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?\S*)?(#.*)?$/;
      if (!urlRegex.test(formData.url)) {
        newErrors.url = 'Please enter a valid URL';
        isValid = false;
      }
    }

    // Comment validation: at least 10 characters
    if (formData.comment.length < 10) {
      newErrors.comment = 'Comment must be at least 10 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
      setShowError(false);
      console.log('Form Data:', formData);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        age: '',
        url: '',
        comment: '',
      });
    } else {
      setShowSuccess(false);
      setShowError(true);
    }
  };

  // Handle notification visibility
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, showError]);

  return (
    <div className="mt-16 intro-y col-span-12 lg:col-span-6">
      <div className="intro-y box p-5">
        <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 className="font-medium text-base mr-auto">Form Validation</h2>
        </div>
        <div className="p-5">
          <form className="validate-form" onSubmit={handleSubmit}>
            <div className="input-form">
              <label
                htmlFor="validation-form-1"
                className="form-label w-full flex flex-col sm:flex-row"
              >
                Name{' '}
                <span className="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                  Required, at least 2 characters
                </span>
              </label>
              <input
                id="validation-form-1"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control border p-2 rounded ${errors.name ? 'border-red-500' : ''}`}
                placeholder="John Legend"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="input-form mt-3">
              <label
                htmlFor="validation-form-2"
                className="form-label w-full flex flex-col sm:flex-row"
              >
                Email{' '}
                <span className="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                  Required, email address format
                </span>
              </label>
              <input
                id="validation-form-2"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control border p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
                placeholder="example@gmail.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="input-form mt-3">
              <label
                htmlFor="validation-form-3"
                className="form-label w-full flex flex-col sm:flex-row"
              >
                Password{' '}
                <span className="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                  Required, at least 6 characters
                </span>
              </label>
              <input
                id="validation-form-3"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control border p-2 rounded ${errors.password ? 'border-red-500' : ''}`}
                placeholder="secret"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="input-form mt-3">
              <label
                htmlFor="validation-form-4"
                className="form-label w-full flex flex-col sm:flex-row"
              >
                Age{' '}
                <span className="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                  Required, integer only & maximum 3 characters
                </span>
              </label>
              <input
                id="validation-form-4"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`form-control border p-2 rounded ${errors.age ? 'border-red-500' : ''}`}
                placeholder="21"
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            </div>

            <div className="input-form mt-3">
              <label
                htmlFor="validation-form-5"
                className="form-label w-full flex flex-col sm:flex-row"
              >
                Profile URL{' '}
                <span className="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                  Optional, URL format
                </span>
              </label>
              <input
                id="validation-form-5"
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className={`form-control border p-2 rounded ${errors.url ? 'border-red-500' : ''}`}
                placeholder="https://google.com"
              />
              {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url}</p>}
            </div>

            <div className="input-form mt-3">
              <label
                htmlFor="validation-form-6"
                className="form-label w-full flex flex-col sm:flex-row"
              >
                Comment{' '}
                <span className="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                  Required, at least 10 characters
                </span>
              </label>
              <textarea
                id="validation-form-6"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className={`form-control border p-2 rounded ${errors.comment ? 'border-red-500' : ''}`}
                placeholder="Type your comments"
              />
              {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
            </div>

            <button type="submit" className="btn btn-primary mt-5 bg-blue-500 text-white p-2 rounded">
              Register
            </button>
          </form>

          {/* Success Notification */}
          {showSuccess && (
            <div className="toastify-content flex mt-5 bg-green-100 border-l-4 border-green-500 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div className="ml-4 mr-4">
                <div className="font-medium">Registration success!</div>
                <div className="text-slate-500 mt-1">Please check your e-mail for further info!</div>
              </div>
            </div>
          )}

          {/* Error Notification */}
          {showError && (
            <div className="toastify-content flex mt-5 bg-red-100 border-l-4 border-red-500 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <div className="ml-4 mr-4">
                <div className="font-medium">Registration failed!</div>
                <div className="text-slate-500 mt-1">Please check the field form.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export with dynamic import to prevent SSR
export default dynamic(() => Promise.resolve(VisitorBookForm), {
  ssr: false,
  loading: () => (
    <div className="mt-16 intro-y col-span-12 lg:col-span-6">
      <div className="intro-y box p-5">
        <p>Loading form...</p>
      </div>
    </div>
  ),
});