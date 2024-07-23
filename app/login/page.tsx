'use client'

import { error } from "console";
import Link from "next/link";
import { resolve } from "path";
import { useState } from "react";
import { FormEvent } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  name: string;
  password: string;
}

export default function Page() {
    const { register,
            handleSubmit, 
            setError,
            formState: { errors, isSubmitting },
          } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
      } catch (error) {
        setError("name", {
          message: "The username is incorrect!",
        })
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col space-y-2 justify-center">
                        <label htmlFor="name" className="text-xl text-black">Enter username:</label>
                        <input 
                          {...register("name", {
                            required: "Email is required.", 
                          })}
                          type="text" 
                          name="name"
                          placeholder="Ali Jawad"
                          className="p-2 text-xl rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-50"/>
                          {errors.name && (
                            <div className="text-red-500">{errors.name.message}</div>
                          )}
                        <label htmlFor="email" className="text-xl text-black">Enter password:</label>
                        <input 
                          {...register("password", {
                            required: "Password is required.",
                          })}
                          type="password" 
                          name="password"
                          className="p-2 text-xl rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-50"/>
                          {errors.password && (
                            <div className="text-red-500">{errors.password.message}</div>
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