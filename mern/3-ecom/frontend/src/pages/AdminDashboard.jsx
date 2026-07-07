import { useEffect, useState } from "react"
import api from "../services/api"



const AdminDashboard = () => {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name:"",
    price:"",
    description:"",
    image:"",
    category:"",
    stock:"",
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [])


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  // const obj = {
  //   x:"a"
  // }

  // obj["x"] = "c";

  // console.log(obj);


  const handleSubmit = async(e) => {
     e.preventDefault();

     try{

      if(editingProduct){
        await api.put(`products/${editingProduct._id}`, formData);
        alert("Product updated successfully");
      }else{
        await api.post("/products", formData);
        alert("Product created sucessfully");
   
      }

      fetchProducts();
      resetForm();

     }catch(error){
      console.log("Error");
     }
  }



  const fetchProducts = async() => {
    try{

      const {data} = await api.get("/products");
      console.log(data);
      setProducts(data);

    }catch(error){
      console.error("Error fetching products", error);
    }
  }

  const fetchOrders = async() => {
    try{

      const {data} = await api.get("/orders");
      setOrders(data);
      console.log(data);

    }catch(error){
      console.error("Error fetching products", error);
    }
  }


  const handelEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name:product.name,
      price:product.price,
      description:product.description,
      image:product.image,
      category:product.category,
      stock:product.stock,
    })
  }


  const handleDelete = async(productId) => {

    if(window.confirm("Are you sure")){

      try{

        await api.delete(`/products/${productId}`);
        alert("Product delete successfully");
        fetchProducts();
      }catch(error){
        console.log("Error");
      }

    }

    
  }


  const resetForm = () => {

    setEditingProduct(null);
    setFormData({
      name:"",
      price:"",
      description:"",
      image:"",
      category:"",
      stock:"",
    })

  }

  const updateOrderStatus = async (orderId, status) => {
    try{

      await api.put(`/orders/${orderId}/status`, {status});
      alert("Order status updated");
      fetchOrders();

    }catch(error){
      console.log("Error");
    }
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'products'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          Manage Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'orders'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          Manage Orders
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          {/* Product Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded md:col-span-2"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded md:col-span-2"
                  rows="3"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'} 
                </button>
                {editingProduct && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handelEdit(product)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4">{order._id.slice(-6)}</td>
                  <td className="px-6 py-4">{order.user?.name || 'Unknown'}</td>
                  <td className="px-6 py-4">${order.totalPrice}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                      ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}
                      ${order.status === 'Pending' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                     onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                     className="px-2 py-1 border rounded text-sm"
                     value={order.status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard