import { Banner, Container, Facilities, ProductList } from "../components";

export default function Home() {
  return (
    <Container className="py-10">
      <Banner />
      <Facilities />
      <ProductList />
    </Container>
  );
}
