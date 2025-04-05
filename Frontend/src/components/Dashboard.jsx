import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products from the public API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products');
        setProducts(res.data.products);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-md hover:shadow-lg transition-shadow duration-300">
            <img
              src={product.image || "https://via.placeholder.com/150"} 
              alt={product.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition-colors duration-300"
              onClick={() => alert(`Viewing details for ${product.title}`)} // Placeholder for actual functionality
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}