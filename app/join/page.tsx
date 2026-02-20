"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function JoinPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "founder",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Registration failed");
        }

        const signInResult = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          throw new Error("Sign in failed after registration");
        }

        router.push("/dashboard");
      } else {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error("Invalid email or password");
        }

        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <nav className="border-gray-100 border-b py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="rounded-lg p-1 font-bold text-2xl text-gray-900 tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
            CoFound
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-balance font-bold text-4xl text-gray-900">
              {isSignUp ? "Create Your Account" : "Welcome Back"}
            </h1>
            <p className="text-pretty text-gray-600 text-lg">
              {isSignUp
                ? "Start your journey to find the perfect co-founder"
                : "Sign in to continue building"}
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 font-medium text-red-600 text-sm">
                  {error}
                </div>
              )}

              {isSignUp && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block font-semibold text-gray-900 text-sm">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block font-semibold text-gray-900 text-sm">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="mb-2 block font-semibold text-gray-900 text-sm">
                      I am a
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                      <option value="founder">Founder</option>
                      <option value="cofounder">Co-Founder</option>
                      <option value="investor">Investor</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-[#FF6154] px-4 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#ff4f40] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                {isLoading
                  ? "Please wait…"
                  : isSignUp
                    ? "Create Account"
                    : "Sign In"}
              </button>
            </form>

            {/* Toggle Sign In/Sign Up */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                className="rounded px-2 py-1 font-medium text-gray-600 transition-colors hover:text-[#FF6154] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154]">
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="rounded px-2 py-1 font-medium text-gray-500 text-sm transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
