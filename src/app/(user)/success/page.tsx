import { Container, SuccessPayment } from "@/app";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  console.log(searchParams?.session_id);
  if (!searchParams?.session_id) {
    redirect("/");
  }
  return (
    <Container>
      <SuccessPayment id={searchParams?.session_id} />
    </Container>
  );
}
