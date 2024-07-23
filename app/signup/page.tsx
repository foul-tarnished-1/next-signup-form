"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User registered:', result);
        // Redirect or show success message
      } else {
        console.error('Error registering user:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
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
          <h1 className="text-7xl font-bold leading-snug mb-2 bg-gradient-to-r from-black via-neutral-700 to-gray-900 text-transparent bg-clip-text">Sign Up!</h1>
          <div className="flex space-x-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-xl text-black">Enter name:</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Ali Jawad"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="p-2 text-xl rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-50"
                />
                <label htmlFor="email" className="text-xl text-black">Enter email:</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="test@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-2 text-xl rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-50"
                />
                <label htmlFor="password" className="text-xl text-black">Enter password:</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="p-2 text-xl rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-50"
                />
                <label htmlFor="age" className="text-xl text-black">Enter age:</label>
                <input 
                  type="number" 
                  name="age"
                  placeholder="25"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="p-2 text-xl rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-50"
                />
                <label htmlFor="phone" className="text-xl text-black">Enter phone number:</label>
                <input 
                  type="text" 
                  name="phone"
                  placeholder="+1-555-555-5555"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-2 text-xl rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-50"
                />
              </div>
              <div className="flex mt-6 justify-center space-x-5">
                <button 
                  type="submit"
                  className="text-xl rounded-lg py-2 px-5 bg-gradient-to-r from-neutral-900 to-neutral-800 transition-opacity duration-300 ease-in-out opacity-70 hover:opacity-100"
                >
                  Sign Up
                </button>
                <Link href="/">
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
