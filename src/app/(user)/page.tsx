import { Banner, Container, Facilities, ProductList } from "../components";

export default function Home() {
  return (
    <Container className="py-8 md:py-12">
      <Banner />
      <Facilities />
      <h2 className="text-xl md:text-2xl font-bold mb-5">Featured Products</h2>
      <ProductList />
    </Container>
  );
}
