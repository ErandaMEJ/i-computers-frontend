import axios from "axios";
import { useEffect, useState } from "react";
import { PiPlus } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!loaded){
      axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
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
              <th className="py-3 px-4 rounded-tl-2xl">Image</th>
              <th className="py-3 px-4">Product ID</th>
              <th className="py-3 px-4 ">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Label Price</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Model</th>
              <th className="py-3 px-3">Stock</th>
              <th className="py-3 px-3">Available</th>
              <th className="py-3 px-4 rounded-tr-2xl ">Actions</th>
            </tr>
          </thead>
          <tbody className=" bg-white divide-y divide-gray-100 ">
            {products.map((item, index) => {
            return(

              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-accent/10 transition-all "
              >
                <td className="py-3 px-4 align-middle">
                  <img
                    src={item.images[0]}
                    
                    className="w-[38px] h-[38px] rounded-lg object-cover border border-gray-200 shadow-sm "
                  />
                </td>
                <td className="py-3 px-4 font-medium">{item.productID}</td>
                <td className="py-3 px-4 uppercase text-sm tracking-wider ">{item.name}</td>
                <td className="py-3 px-4 text-accent font-semibold">
                  Rs. {item.price.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-gray-500 text-sm line-through decoration-1 ">
                  Rs. {item.labelledPrice.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm">{item.category}</td>
                <td className="py-3 px-4">{item.brand}</td>
                <td className="py-3 px-4">{item.model}</td>
                <td className="py-3 px-4 font-medium text-sm">{item.stock}</td>
                <td className="py-3 px-4 text-sm font-medium text-center ">
                  <td
                    className={`px-3 py-1 text-xs  font-semibold  rounded-full ${
                      item.isAvailable
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.isAvailable ? "Yes" : "No"}
                  </td>
                  
                </td>

                <td className="py-3 px-4 text-sm ">
                    <div className="inline-flex items-center gap-2 ">
                      {/* <Link 
                          to="/admin/update-product"
                          className="my-1   flex justify-center items-center font-bold  px-3 py-2 bg-accent/20 text-xs text-accent rounded-2xl text-shadow-accent hover:bg-accent hover:text-white transition-all duration-300"
                          state={item}>                          
                          Edit
                      </Link> */}
                      
                      <button onClick={()=>{
                          navigate("/admin/update-product", {state: item})
                        }}
                          className="my-1 flex justify-center items-center font-bold  px-6 py-2 bg-accent/20 text-xs text-accent rounded-2xl text-shadow-accent hover:bg-accent hover:text-white transition-all duration-300">
                          Edit
                      </button>
                          
                    <ProductDeleteButton productID = {item.productID} reload={()=>{setLoaded(false)}}/>
                    </div>
                </td>
                
              </tr>
            )
            })}
          </tbody>
        </table>:<Loader />}
      </div>

      <Link
        to="/admin/add-product"
        className="fixed right-[30px] bottom-[30px] w-[60px] h-[60px] flex justify-center items-center 
        text-5xl text-white bg-accent rounded-full shadow-lg hover:bg-gold transition-all duration-300 hover:scale-110"
      >
        <PiPlus />
      </Link>
    </div>
  );
}
