export default async function ProductDetailPage({ params }) {
  const { id } = params;
  let product = null;

  try {
    const res = await fetch(`http://localhost:3000/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product details");
    }

    product = await res.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-2xl font-semibold">${product.price}</p>
    </div>
  );
}
