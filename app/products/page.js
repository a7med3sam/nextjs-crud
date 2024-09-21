import ProductList from "../../components/ProductList";

export default async function ProductsPage() {
  let products = [];

  try {
    const res = await fetch("http://localhost:3000/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      <ProductList products={products} />
    </div>
  );
}
