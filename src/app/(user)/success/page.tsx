"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SuccessContainer } from "@/app";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
    }
  }, [sessionId]);

  if (!sessionId) return null;

  return <SuccessContainer id={sessionId} />;
}
