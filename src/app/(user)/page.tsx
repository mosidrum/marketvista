import { Banner, Container, Facilities } from "../components";

export default function Home() {
  return (
    <Container className="py-10">
      <Banner />
      <Facilities />
    </Container>
  );
}
