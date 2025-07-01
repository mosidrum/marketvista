"use client";

import {Container} from "@/app/components";
import React, {useState} from "react";
import google from "@/app/assets/google.png";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/app";
import {FormData, FormErrors, FormField, validateSignInForm} from "@/app/components/auth";
import {showAlert, signInUser, signInWithGoogle} from "@/app/utils";
import {useRouter} from "next/navigation";
import {AlertType} from "@/app/types";

export default function SignInPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    if (authError) {
      setAuthError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateSignInForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setAuthError("");
    
    try {
      const result = await signInUser({
        email: formData.email,
        password: formData.password
      });

      if (result.success && result.user) {
        router.push("/dashboard");
        showAlert(`User signed in successfully`, AlertType.SUCCESS);
      } else {
        setAuthError(result.error || "Sign in failed");
        showAlert(result.error as string, AlertType.ERROR,);

      }
    } catch (error) {
      showAlert(error as unknown as string || "An unexpected error occurred. Please try again.", AlertType.ERROR,);
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      
      if (result.success && result.user) {
        showAlert(`User signed in successfully`, AlertType.SUCCESS,);
        router.push("/dashboard");
      } else {
        showAlert(result.error as string, AlertType.ERROR,);
        setAuthError(result.error || "Google sign-in failed");
      }
    } catch (error) {
      showAlert(error as unknown as string || "An unexpected error occurred. Please try again.", AlertType.ERROR,);
      setAuthError("An unexpected error occurred during Google sign-in. Please try again.");
    }
  };

  return (
    <Container className="py-20 flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent mb-2">Welcome Back</h1>
          <p className="text-lightText">Sign in to your account to continue</p>
        </div>

        <div className="bg-accentWhite rounded-lg shadow-custom p-8">
          {authError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-sm text-darkOrange hover:text-lightOrange transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-darkOrange text-white py-3 px-4 rounded-md font-semibold hover:bg-lightOrange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
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
            <span>Sign in with Google</span>
          </Button>

          <div className="text-center mt-6">
            <p className="text-lightText">
              Don&apos;t have an account?{" "}
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
