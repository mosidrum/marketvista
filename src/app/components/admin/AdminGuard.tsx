"use client";

import { useAuth } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/signin?next=/studio");
    }
  }, [loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return <>{children}</>;
};
