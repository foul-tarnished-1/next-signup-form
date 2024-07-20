'use client'

import Image from "next/image";
import { useState, FormEvent } from "react";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(''); // 'signup' or 'login'

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmittedName(name);
    setSubmittedEmail(email);
  };

  const handleButtonClick = (type: string) => {
    setShowForm(true);
    setFormType(type);
  };

  const handleBackClick = () => {
    setShowForm(false);
    setName('');
    setEmail('');
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="bg-cover flex flex-col justify-center items-center w-1/2 min-h-screen">
        <div className="rounded-3xl p-2 bg-gradient-to-br from-neutral-900 via-zinc-900 to-black/90">
          <div className="bg-transparent p-6 rounded-[calc(1.5rem-1px)]">
            <h1 className="leading-snug text-8xl font-extrabold bg-gradient-to-r from-rose-200 via-pink-400 to-sky-300 text-transparent bg-clip-text">Printify.</h1>
            <h2 className="text-3xl font-light text-transparent bg-gradient-to-br from-neutral-50 to-neutral-500 bg-clip-text">Best <span className="bg-gradient-to-l from-rose-200 via-pink-400 to-sky-300 bg-clip-text">Prints</span> Around</h2>
          </div>
        </div>
      </div>
      <div className="bg-cover flex flex-col justify-center items-center w-1/2 min-h-screen relative">
        <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-in-out hover:opacity-0 bg-[url('https://cdn.leonardo.ai/users/13ae5bda-727f-40cc-8ecc-9ea3f021a830/generations/8be1e685-6e90-493a-bbcf-7350afd2c781/Default_A_minimalist_overhead_shot_of_two_meticulously_chosen_0.jpg')]">
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100 bg-gradient-to-br from-sky-200 via-rose-300 to-slate-600">
          {!showForm ? (
            <>
              <h1 className="text-7xl font-bold leading-snug mb-2 bg-gradient-to-r from-black via-neutral-700 to-gray-900 text-transparent bg-clip-text">Welcome!</h1>
              <div className="flex space-x-4">
                <button 
                  className="text-xl rounded-lg py-2 px-5 bg-gradient-to-r from-neutral-900 to-neutral-800 transition-opacity duration-300 ease-in-out opacity-70 hover:opacity-100"
                  onClick={() => handleButtonClick('signup')}
                >
                  Sign Up
                </button>
                <button 
                  className="text-xl rounded-lg py-2 px-5 bg-gradient-to-r from-neutral-900 to-neutral-800 transition-opacity duration-300 ease-in-out opacity-70 hover:opacity-100"
                  onClick={() => handleButtonClick('login')}
                >
                  Log In
                </button>
              </div>
            </>
          ) : (
            <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
              <h1 className="text-7xl font-bold leading-snug mb-2 bg-gradient-to-r from-black via-neutral-700 to-gray-900 text-transparent bg-clip-text">
                {formType === 'signup' ? 'Sign Up' : 'Log In'}
              </h1>
              <label htmlFor="name" className="self-start mt-2 font-normal text-lg bg-gradient-to-r from-black via-neutral-700 to-gray-900 text-transparent bg-clip-text">
                {formType === 'signup' ? 'Enter name:' : 'Enter email:'}
              </label>
              <input
                type="text" 
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formType === 'signup' ? name : email}
                onChange={(e) => formType === 'signup' ? setName(e.target.value) : setEmail(e.target.value)}
              />
              <div className="flex space-x-4">
                <button type="submit" className="mt-4 text-xl rounded-lg py-2 px-5 bg-gradient-to-r from-neutral-900 to-neutral-800 transition-opacity duration-300 ease-in-out opacity-70 hover:opacity-100">Submit</button>
                <button className="mt-4 text-xl rounded-lg py-2 px-5 bg-gradient-to-r from-neutral-900 to-neutral-800 transition-opacity duration-300 ease-in-out opacity-70 hover:opacity-100" onClick={handleBackClick}>Go Back</button>  
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
