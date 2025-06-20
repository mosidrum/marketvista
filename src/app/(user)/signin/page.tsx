import { Container } from "@/app/components";
import React from "react";
import google from "@/app/assets/google.png";
import Image from "next/image";
import { signIn } from "@/auth";

export default function SignInPage() {
  return (
    <Container className="py-20 flex flex-col justify-center items-center">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
        className="flex items-center gap-1 border-blue-500 font-semibold bg-blue-50 px-4 py-1.5 rounded-md"
      >
        <button className="flex gap-2 items-center">
          <Image src={google} alt="image" className="w-6" />
          <span>Sigin with Google</span>
        </button>
      </form>
    </Container>
  );
}
