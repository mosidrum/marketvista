import { Container } from "@/app";

interface SuccessPageProps {
    searchParams: {
        session_id?: string;
    }
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
    console.log(searchParams)
    return <Container>Success page</Container>
}