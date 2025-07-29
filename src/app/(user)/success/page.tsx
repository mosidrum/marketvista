import { Container, SuccessContainer } from "@/app";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const id = searchParams?.session_id;

  if (!id) {
    redirect("/");
  }

  return <SuccessContainer id={id} />;
}
