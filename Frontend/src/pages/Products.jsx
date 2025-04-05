import { useEffect, useState } from 'react';
import { productAPI } from '../api/productApi';

export default function Products({ onAddToCart }) { // Add onAddToCart prop to handle cart update
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the API
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await productAPI();
        setProducts(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Add to Cart</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <img src={prod.thumbnail} alt={prod.title} className="w-12 h-12 object-cover" />
                </td>
                <td className="p-2">{prod.title}</td>
                <td className="p-2">${prod.price}</td>
                <td className="p-2">{prod.category}</td>
                <td className="p-2">
                  {/* Add Plus Button to Add Product to Cart */}
                  <button
                    onClick={() => onAddToCart(prod)} // Trigger the function passed via props to add product to cart
                    className="text-green-600 p-2 rounded-md hover:bg-gray-200"
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
