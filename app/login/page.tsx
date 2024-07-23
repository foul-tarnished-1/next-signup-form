'use client'

import { useState } from "react";
import Link from "next/link";

export default function Page() {
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [errors, setErrors] = useState<{ name?: string; password?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors: { name?: string; password?: string } = {};
        if (!formData.name) newErrors.name = "Username is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;
  
      setIsSubmitting(true);
      try {
          const response = await fetch('/api/users/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });
  
          const result = await response.json();
  
          if (!response.ok) {
              // Handle API errors
              setErrors({ name: result.message || "Login failed. Please try again." });
          } else {
              // Handle successful login
              console.log('Login successful', result);
          }
      } catch (error) {
          console.error('Error:', error);
          setErrors({ name: "An unexpected error occurred. Please try again." });
      } finally {
          setIsSubmitting(false);
      }
  };
  

    return (
        <main className="flex min-h-screen items-center justify-center">
        <div className="bg-cover flex flex-col justify-center items-center w-1/2 min-h-screen">
          <div className="rounded-3xl p-2 bg-gradient-to-br from-neutral-900 via-zinc-900 to-black/90">
            <div className="bg-transparent p-6 rounded-[calc(1.5rem-1px)]">
              <h1 className="leading-snug text-8xl font-extrabold bg-gradient-to-br from-black via-white to-black text-transparent bg-clip-text">Printify.</h1>
              <h2 className="text-3xl font-light text-white/70">Best <span className="text-transparent bg-gradient-to-r from-sky-200 via-rose-300 to-slate-600 bg-clip-text">Prints</span> Around</h2>
            </div>
          </div>
        </div>
        <div className="bg-cover flex flex-col justify-center items-center w-1/2 min-h-screen relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-0 bg-[url('https://cdn.leonardo.ai/users/13ae5bda-727f-40cc-8ecc-9ea3f021a830/generations/8be1e685-6e90-493a-bbcf-7350afd2c781/Default_A_minimalist_overhead_shot_of_two_meticulously_chosen_0.jpg')]">
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-100 bg-gradient-to-br from-sky-200 via-rose-300 to-slate-600">
            <h1 className="text-7xl font-bold leading-snug mb-2 bg-gradient-to-r from-black via-neutral-700 to-gray-900 text-transparent bg-clip-text">Log In!</h1>
            <div className="flex space-x-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2 justify-center">
                        <label htmlFor="name" className="text-xl text-black">Enter username:</label>
                        <input 
                          value={formData.name}
                          onChange={handleChange}
                          type="text" 
                          name="name"
                          id="name"
                          placeholder="Ali Jawad"
                          className="p-2 text-xl rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-50"/>
                          {errors.name && (
                            <div className="text-red-500">{errors.name}</div>
                          )}
                        <label htmlFor="password" className="text-xl text-black">Enter password:</label>
                        <input 
                          value={formData.password}
                          onChange={handleChange}
                          type="password" 
                          name="password"
                          id="password"
                          className="p-2 text-xl rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-50"/>
                          {errors.password && (
                            <div className="text-red-500">{errors.password}</div>
                          )}
                    </div>
                    <div className="flex mt-6 justify-center space-x-6">
                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="text-xl rounded-lg py-2 px-5 bg-gradient-to-r from-neutral-900 to-neutral-800 transition-opacity duration-300 ease-in-out opacity-70 hover:opacity-100">
                      {isSubmitting ? "Loading" : "Submit"}
                      </button>
                      <Link href={'/'}>
                          <button 
                          type="button"
                          className="text-xl rounded-lg py-2 px-5 bg-gradient-to-r from-neutral-900 to-neutral-800 transition-opacity duration-300 ease-in-out opacity-70 hover:opacity-100"
                          >
                          Go Back
                          </button>
                      </Link>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </main>
    );
}
