"use client";

import React from 'react';
import { useAuth } from '@/app/hooks';
import Link from 'next/link';
import { MdSwitchAccount, MdLogout } from 'react-icons/md';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const AuthStatus = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="navBarItem">
        <div className="animate-pulse bg-gray-300 h-6 w-20 rounded"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="navBarItem flex items-center gap-2"
        >
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || user.email || 'User'}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="w-6 h-6 bg-darkOrange rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
            </div>
          )}
          <span className="hidden sm:inline">
            {user.displayName || user.email?.split('@')[0] || 'User'}
          </span>
        </Link>
        
        <button
          onClick={handleLogout}
          className="navBarItem flex items-center gap-2 text-red-600 hover:text-red-700"
          title="Logout"
        >
          <MdLogout className="text-xl" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/signin"
      className="navBarItem flex items-center gap-2"
    >
      <MdSwitchAccount className="text-xl" />
      <span>Sign In</span>
    </Link>
  );
}; 