'use client';

import { use, useState, FormEvent } from "react";

export default function Home() {

  const [countClick, setCountClick] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [action, setAction] = useState('');

  const countClickHandler = () => {
    setCountClick(countClick + 1);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    if (action === "login") {
      console.log("Logging in with: ", name, email);
    } else if (action === "signup") {
      console.log("Signing up with: ", name, email);
      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          console.log('Sign up successful!', data);
          setSubmittedName(name);
          setSubmittedEmail(email);
        } else {
          console.error('Sign up failed:', data.error);
        }
      } catch (error) {
        console.error('Error during sign up:', error);
      }
    }
  }

  // const handleLogin = (event: FormEvent) => {
  //   event.preventDefault();
  //   console.log('Logged In Successfully!');
  // }

  // const handleSignup = (event: FormEvent) => {
  //   event.preventDefault();
  //   console.log('Signing Up New Account!');
  // }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="border-r-2 border-zinc-500 flex flex-col w-1/2 h-screen justify-center items-center bg-cover bg-center" style={{backgroundImage: `url(/Form-Cover-Image.jpg)`}}>  
        <div className="border-4 border-black rounded-2xl p-8 bg-white">
          <h1 className="text-8xl font-extrabold">Printify.</h1>
          <h2 className="text-3xl text-slate-800 font-light pl-1">Premium Art Prints</h2>
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-screen items-center justify-center bg-gradient-to-r from-neutral-300 to-neutral-400">
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name
            </label>  
            <input
              className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
              id="name"
              type="text"
              name="name"
              placeholder="Ali Jawad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
              id="email"
              type="email"
              name="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              className="mr-1 bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => setAction("login")}
            >
              Log In
            </button>
            <button
              className="ml-1 bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => setAction("signup")}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mt-8">Input Recieved:</h2>
          <label htmlFor="name-output" className="text-2xl mt-4">Name: <span className="text-2xl font-bold">{submittedName}</span></label>
          <label htmlFor="email-output" className="text-2xl">Email: <span className="text-2xl font-bold">{submittedEmail}</span></label>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mt-4">Button Prop Test:</h2>
          <h3 className="text-2xl mt-4">State Value: {countClick}</h3>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" onClick={countClickHandler}>Click Me</button>
        </div>
      </div>
    </main>
  );
}
