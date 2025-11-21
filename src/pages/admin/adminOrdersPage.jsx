import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ViewOrderInfor from "../../components/viewOrderInfoy";


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
 

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded){
      axios
      .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
        setLoaded(true);
      });
    }
    
  }, [loaded]);

  return (
    <div className="w-full min-h-screen  bg-primary flex flex-col items-center p-10 relative text-secondary">
      <h1 className="text-3xl font-semibold mb-6 text-secondary border-b-2 border-accent pb-2 ">
        Product Management
      </h1>

      <div 
        className="w-full max-w-7xl p-2 mb-8 overflow-x-auto  bg-white shadow-xl rounded-2xl ">
        {loaded ? 
        <table 
            className="w-full max-w-7xl justify-center border-separate border-spacing-0 overflow-hidden text-sm  table-auto  ">
          <thead 
              className="sticky top-0 z-10 bg-accent text-white uppercase text-xs ">
            <tr>

              <th className="py-3 px-4 rounded-tl-2xl">Order ID</th>
              <th className="py-3 px-4">Customer Email</th>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Order Date</th>
              <th className="py-3 px-4">Order Status</th>
              <th className="py-3 px-4 ">Total Amount</th>
              <th className="py-3 px-4 rounded-tr-2xl">Actions</th>
              
            </tr>
          </thead>

          <tbody className=" bg-white divide-y divide-gray-100 ">
            {orders.map((order, index) => {
            return(

              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-accent/10 transition-all "
              >
                
                <td className="py-3 px-4 font-medium">{order.orderId}</td>
                <td className="py-3 px-4">{order.email}</td>
                <td className="py-3 px-4">{order.name}</td>
                <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">{order.status}</td>
                <td className="py-3 px-4">LKR. {order.total.toFixed(2)}</td>
                <td className="py-3 px-4"><ViewOrderInfor/></td>                
                
                
              </tr>
            )
            })}
          </tbody>
        </table>:<Loader />}
      </div>

    
    </div>
  );
}
