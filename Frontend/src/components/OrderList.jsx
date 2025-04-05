import { useEffect, useState } from 'react';
import { productAPI } from '../api/productApi'; 
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import Cart from '../components/cartComponent'; // Import the Cart component

export default function OrderList() {
  const [orders, setOrders] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch orders based on filters
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await productAPI.getOrders({
          startDate,
          endDate,
          status: statusFilter,
          minPrice,
          maxPrice,
        });

        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          setError('Unexpected response format: orders should be an array.');
        }
      } catch (err) {
        setError('No orders at the moment.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [statusFilter, startDate, endDate, minPrice, maxPrice]);

  // Filter orders based on status
  const filteredOrders = (Array.isArray(orders) ? orders : []).filter((order) => {
    return (
      (statusFilter === 'All' || order.orderStatus === statusFilter) &&
      (!startDate || new Date(order.createdAt) >= new Date(startDate)) &&
      (!endDate || new Date(order.createdAt) <= new Date(endDate)) &&
      (minPrice === '' || order.totalPrice >= minPrice) &&
      (maxPrice === '' || order.totalPrice <= maxPrice)
    );
  });

  // Handle pagination
  const pageCount = Math.ceil(filteredOrders.length / pageSize);
  const currentOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Add item to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Add product to the cart
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId)); // Remove product from cart
  };

  // Generate CSV Report
  const downloadCSV = () => {
    const headers = ['OrderID,Products,TotalPrice,Status,Date'];
    const rows = filteredOrders.map((o) => {
      const products = o.orderItems
        .map((i) => i.product?.title || i.product)
        .join(' | ');
      return `${o._id},"${products}",${o.totalPrice},${o.orderStatus},${format(new Date(o.createdAt), 'MM/dd/yyyy')}`;
    });
    const csv = [...headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `orders_report_${new Date().toLocaleDateString()}.csv`);
  };

  // Generate PDF Report
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Order Report', 20, 20);
    let y = 30;

    filteredOrders.forEach((order) => {
      const products = order.orderItems
        .map((i) => i.product?.title || i.product)
        .join(' | ');
      doc.text(
        `Order ID: ${order._id} | Products: ${products} | Total: ${order.totalPrice} | Status: ${order.orderStatus} | Date: ${format(new Date(order.createdAt), 'MM/dd/yyyy')}`,
        20,
        y
      );
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`orders_report_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">🧾 Order List</h2>

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Loading state */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Date Range Filters */}
          <div className="mb-4 flex space-x-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Price Range Filters */}
          <div className="mb-4 flex space-x-4">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          {/* Download Options */}
          <div className="mb-4">
            <button
              onClick={downloadCSV}
              className="bg-blue-600 text-white px-3 py-1 rounded-md mr-4"
            >
              📥 Download CSV Report
            </button>
            <button
              onClick={downloadPDF}
              className="bg-green-600 text-white px-3 py-1 rounded-md"
            >
              📥 Download PDF Report
            </button>
          </div>

          {/* Orders Table */}
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Order ID</th>
                <th className="p-2">Products</th>
                <th className="p-2">Total Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{order._id.slice(-6)}</td>
                  <td className="p-2">
                    {order.orderItems.map((item, i) => (
                      <span key={i}>
                        {item.product?.title || item.product} x{item.quantity}
                        {i < order.orderItems.length - 1 && ', '}
                      </span>
                    ))}
                  </td>
                  <td className="p-2">${order.totalPrice.toFixed(2)}</td>
                  <td className="p-2">{order.orderStatus}</td>
                  <td className="p-2">{format(new Date(order.createdAt), 'MM/dd/yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Cart Section */}
          <div className="mt-4">
            <Cart 
              cart={cart}
              onRemoveFromCart={handleRemoveFromCart} // Pass the handler to remove items from cart
            />
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 mx-1 rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
