"use client";

import { Container } from "@/app/components";
import React, { useState } from "react";
import google from "@/app/assets/google.png";
import Image from "next/image";
import { signIn } from "@/auth";
import Link from "next/link";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Log form values to console
    console.log("Signin Form Data:", formData);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically call your signin API
      console.log("Form submitted successfully!");
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { redirectTo: "/dashboard" });
  };

  return (
    <Container className="py-20 flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent mb-2">Welcome Back</h1>
          <p className="text-lightText">Sign in to your account to continue</p>
        </div>

        {/* Signin Form */}
        <div className="bg-accentWhite rounded-lg shadow-custom p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-accent mb-2">
                Email Address
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightText text-xl" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkOrange transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300 focus:border-darkOrange'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-accent mb-2">
                Password
              </label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightText text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkOrange transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300 focus:border-darkOrange'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lightText hover:text-accent transition-colors"
                >
                  {showPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-sm text-darkOrange hover:text-lightOrange transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-darkOrange text-white py-3 px-4 rounded-md font-semibold hover:bg-lightOrange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-lightText">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-accent py-3 px-4 rounded-md font-semibold hover:bg-gray-50 transition-colors"
          >
            <Image src={google} alt="Google" className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-lightText">
              Don't have an account?{" "}
              <Link 
                href="/signup" 
                className="text-darkOrange hover:text-lightOrange font-semibold transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
