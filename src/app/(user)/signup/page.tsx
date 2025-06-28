"use client";

import { Container } from "@/app/components";
import React, { useState } from "react";
import google from "@/app/assets/google.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/app";
import { FormField, NameField, validateSignUpForm, FormData, FormErrors } from "@/app/components/auth";

export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateSignUpForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    
    // Log form values to console
    console.log("Signup Form Data:", formData);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically call your signup API
      console.log("Form submitted successfully!");
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <Container className="py-20 flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent mb-2">Create Account</h1>
          <p className="text-lightText">Sign up to get started with your account</p>
        </div>

        <div className="bg-accentWhite rounded-lg shadow-custom p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <NameField
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              error={errors.name}
            />

            {/* Email Field */}
            <FormField
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              error={errors.email}
            />

            {/* Password Field */}
            <FormField
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              error={errors.password}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-accent mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkOrange transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-darkOrange'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lightText hover:text-accent transition-colors"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-darkOrange text-white py-3 px-4 rounded-md font-semibold hover:bg-lightOrange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-lightText">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <Button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-accent py-3 px-4 rounded-md font-semibold hover:bg-gray-50 transition-colors"
          >
            <Image src={google} alt="Google" className="w-5 h-5" />
            <span>Sign up with Google</span>
          </Button>

          <div className="text-center mt-6">
            <p className="text-lightText">
              Already have an account?{" "}
              <Link 
                href="/signin" 
                className="text-darkOrange hover:text-lightOrange font-semibold transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
} 