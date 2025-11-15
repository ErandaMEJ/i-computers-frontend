import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDeleteButton(props) {

    const productID = props.productID;
    const reload = props.reload
    const [isMessageOpen, setIsMessageOpen]= useState(false);
    const [isDeleting, setIsDeleting]= useState(false);

    async function handleDelete(){
        setIsDeleting(true)
         const token = localStorage.getItem("token")
                      axios.delete(import.meta.env.VITE_BACKEND_URL + "/products/" + productID, {
                            headers: {
                          Authorization: `Bearer ${token}`
                        }
                      }).then(
                        ()=>{
                          toast.success("Product deleted successfully");
                          setIsDeleting(false);
                          setIsMessageOpen(false);
                          reload();
                        }
                      ).catch(()=>{
                        toast.error("Error deleting product. Please try again.");
                        setIsDeleting(false);
                      })

    }   
    
    return (
        <>
            <button 
                onClick={()=>{setIsMessageOpen(true)}} 
                className="w-[70px]  flex justify-center items-center font-bold px-3 py-2  bg-red-500 text-xs text-white rounded-2xl text-shadow cursor-pointer hover:bg-red-800 hover:text-white transition-all duration-300">
                Delete
            </button>

                {isMessageOpen&&<div className="w-[100vw] h-screen fixed z-9999 top-0 left-0  bg-black/45 flex justify-center items-center">

                    Are you sure you want to delete?

                <div className="w-[600px] h-[300px] bg-primary rounded-2xl relative flex flex-col justify-center items-center gap-[20px] p-[20px] shadow-2xl">
                    
                    <button 
                        onClick={()=>{setIsMessageOpen(false)}} 
                        className="w-[40px] h-[40px] bg-red-600 rounded-full text-primary text-xl font-bold cursor-pointer hover:bg-red-900 absolute right-[-32px] top-[-32px] ">
                            X
                    </button>

                    <h1 className="text-2xl font-semibold text-secondary">Are you sure you want to delete this product {productID}?</h1>
                    <div className="w-full flex justify-center items-center gap-[20px]">

                        <button
                            disabled={isDeleting} 
                            onClick={handleDelete} 
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                            Delete
                        </button>
                        <button 
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition" 
                            onClick={()=>{setIsMessageOpen(false)}}>
                            Cancel
                        </button>

                    </div>
                </div>
            </div>}
        </>
    )
}


// {<button onClick={
//                     ()=>{
//                       const token = localStorage.getItem("token")
//                       axios.delete(import.meta.env.VITE_BACKEND_URL + "/products/" + item.productID, {
//                         headers: {
//                           Authorization: `Bearer ${token}`
//                         }
//                       }).then(
//                         ()=>{
//                           toast.success("Product deleted successfully");
//                           setLoaded(false)
//                         }
//                       )
//                     }
//                   } className="w-[100px] bg-red-700 flex justify-center items-center text-primary py-2 rounded-full hover:bg-red-900 transition-colors font-medium cursor-pointer">
//                     Delete
//                   </button> */}